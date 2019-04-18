const path = require('path');
const express = require('express');
const createApp = require('@shopify/app-bridge');
const {Redirect} = require('@shopify/app-bridge/actions');
const {Toast} = require('@shopify/app-bridge/actions');
const Shopify = require('shopify-api-node');
const {Pool} = require('pg')
const helmet = require('helmet')
const app = express(), DIST_DIR = __dirname, HTML_FILE = path.join(DIST_DIR, 'index.html');
const dotenv = require('dotenv').config();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const db = require('./db.js');
const bodyParser = require('body-parser')
const _ = require('underscore')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = "https://fundflakes-app.herokuapp.com"; // Replace this with your HTTPS Forwarding address
const permissionUrl = `/oauth/authorize?client_id=${apiKey}&scope=read_products,read_content&redirect_uri=${forwardingAddress}`;

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
})

app.get('/shopify', (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + '/shopify/callback';
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
});

app.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;
  app.use(helmet.frameguard({ 
    action: 'allow-from',
    domain: shop
  }))

  if (state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified');
  }

  if (shop && hmac && code) {
    const map = Object.assign({}, req.query);
    delete map['signature'];
    delete map['hmac'];
    const message = querystring.stringify(map);
    const providedHmac = Buffer.from(hmac, 'utf-8');
    const generatedHash = Buffer.from(
      crypto
        .createHmac('sha256', apiSecret)
        .update(message)
        .digest('hex'),
        'utf-8'
      );
    let hashEquals = false;
    // timingSafeEqual will prevent any timing attacks. Arguments must be buffers
    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
    // timingSafeEqual will return an error if the input buffers are not the same length.
    } catch (e) {
      hashEquals = false;
    };
    
    if (!hashEquals) {
      return res.status(400).send('HMAC validation failed');
    }
    
    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };
    
    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
    .then((accessTokenResponse) => {
      const accessToken = accessTokenResponse.access_token;
    
      const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
      const shopRequestHeaders = {
        'X-Shopify-Access-Token': accessToken,
      };      

      
      request.get(shopRequestUrl, { headers: shopRequestHeaders })
      .then(() => {

        console.log("before if")
        if (window.top == window.self) {
          window.location.assign(`https://${shop}/admin${permissionUrl}`);
  
          console.log('in if')
  
        // If the current window is the 'child', change the parent's URL with Shopify App Bridge's Redirect action
        } else {
          const app = createApp({
            apiKey: apiKey,
            shopOrigin: shop,
          });
          console.log(' before redirect')
  
  
          Redirect.create(app).dispatch(Redirect.Action.ADMIN_PATH, permissionUrl);
        }          
      })  
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });
    })
    .catch((error) => {
      res.status(error.statusCode).send(error.error.error_description);
    }); 
  } else {
    res.status(400).send('Required parameters missing');
  }
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null };
    res.render('pages/db', results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});   

app.post('/group', async (req, res) => {
  var body = _.pick(req.body, 'groupID', 'groupName', 'zip', 'totalRaised', 'approved');
  console.log(body)
  db.group.create(body).then(function (group) {
    return group.reload().then(function (group) {
      res.json(group.toJSON())
    })
  }, function (e) {
    res.status(400).json(e)
  })
});


// db.sequelize.sync({force: true}).then(function () {
//   app.listen(PORT, function () {
//     console.log(`DB reset...Express listening on port ${PORT}...`)
//   })
// });
