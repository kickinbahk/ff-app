module.exports = function (sequelize, DataTypes) {
  return sequelize.define('group', {
    groupID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
        isString: function (value) {
          if (typeof value !== 'string') {
            throw new Error('Group ID must be a string')
          }
        }
      }
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
        isString: function (value) {
          if (typeof value !== 'string') {
            throw new Error('Group Name must be a string')
          }
        }
      }
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15],
        isString: function (value) {
          if (typeof value !== 'string') {
            throw new Error('ZIP must be a string')
          }
        } 
      }     
    },    
    totalRaised: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      isNumber: function(value) {
        if (typeof value !== 'number') {
          throw new Error('Total Raised must be a number')
        }
      }
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValues: false,
      validate: {
        isBoolean: function (value) {
          if (typeof value !== 'boolean') {
            throw new Error('Approved must be a boolean')
          }
        }
      }
    },
    store: {
      type.DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
        isString: function (value) {
          if (typeof value !== 'string') {
            throw new Error('Store must be a string')
          }
        }        
      }
    }
  })
}