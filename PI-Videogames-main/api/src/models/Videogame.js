const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'videogame',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY,
        get() {
          return this.getDataValue('released').replace(/-/g, '/');
        },
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      platforms: {
        type: DataTypes.STRING,
        allowNull: false,
        // turn platforms array to string:
        get() {
          return this.getDataValue('platforms').join(', ');
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      // OPTIONAL: Add whether users created the game or not (DB or API):
      //TODO: VER DE AGREGAR
      createdByUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
