module.exports = function (sequelize, DataTypes) {
  return sequelize.define('store', {
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
        isString: function (value) {
          if (typeof value !== 'string') {
            throw new Error('Store Name must be a string')
          }
        }
      }
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
        isString: function (value) {
          if (typeof value !== 'string') {
            throw new Error('Access Token must be a string')
          }
        }
      }
    },
    storeToken: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
        isString: function (value) {
          if (typeof value !== 'string') {
            throw new Error('Store Token must be a string')
          }
        }
      }
    }        
  })
}