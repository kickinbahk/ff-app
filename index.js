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
const scopes = 'read_products, read_themes, write_themes';
const forwardingAddress = "https://fundflakes-app.herokuapp.com"; // Replace this with your HTTPS Forwarding address
const permissionUrl = `/oauth/authorize?client_id=${apiKey}&scope=read_products,read_content&redirect_uri=${forwardingAddress}`;

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(helmet.frameguard({
  action: 'allow-from',
  domain: '*'
}))

app.get('/', (req, res) => {
  res.render('pages/index')
})

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`Express listening on port ${PORT}...`)
  })
});

// db.sequelize.sync({force: true}).then(function () {
//   app.listen(PORT, function () {
//     console.log(`DB reset...Express listening on port ${PORT}...`)
//   })
// });


app.get('/shopify', (req, res) => {
  const shop = req.query.shop;
  console.log(shop);


  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + '/shopify/callback';
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

    res.cookie('state', state);
    console.log('before redirect')
    res.redirect(installUrl);
    console.log('after redirect')

  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
});


app.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  console.log(req.headers)
  var groupsObj;

  db.group.findAll().then(function (groups) {
    console.log(groups)
    groupsObj = groups;
  }, function (e) {
    res.status(500).send()
  }).then(function() {


    res.render('pages/index', { 
      API_KEY: apiKey,
      shop: shop,
      title: 'All Groups', 
      message: 'Hello there from pug!',
      groups: groupsObj 
    })
  })
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

app.post('/groups', async (req, res) => {
  var body = _.pick(req.body, 'groupID', 'groupName', 'zip', 'totalRaised', 'approved');
  console.log(body)
  var groupID = body.groupID;

  db.group.findOne({
    where: {
      groupID: groupID
    }
  }).then(function (group) {
    console.log(group);

    if (!group) {
      db.group.create(body).then(function (group) {
        return group.reload().then(function (group) {
          res.json(group.toJSON())
        })
      }, function (e) {
        res.status(400).json(e)
      })
    } else {
      res.status(506).send({ error: 'Group ID already exists' });
    }

  })
});

app.get('/groups', async (req, res) => {

  db.group.findAll().then(function (groups) {
    res.json(groups)
  }, function (e) {
    res.status(500).send()
  })

});

app.get('/groups/:groupID', async (req, res) => {
  var groupID = req.params.groupID

  db.group.findOne({
    where: {
      groupID: groupID
    }
  }).then(function (group) {
    if (group) {
      res.json(group.toJSON())
    } else {
      res.status(404).send()
    }
  }, function (e) {
    res.status(500).send()
  })
})

app.post('/groups/:groupID', async (req, res) => {
  var body = _.pick(req.body, 'groupID', 'totalRaised');
  var groupID = req.params.groupID

  console.log(body.totalRaised);
  
  db.group.update({ totalRaised: body.totalRaised }, {
    where: {
      groupID: groupID
    }
  }).then(function() {
    db.group.findOne({
      where: {
        groupID: groupID
      }
    }).then(function(group) {
      console.log(group)
      if (group) {
        res.json(group.toJSON())
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
  }, function (e) {
    res.status(500).send()
  })
})


