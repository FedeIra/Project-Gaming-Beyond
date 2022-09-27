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
        // unique: true,
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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue:
          'https://c4.wallpaperflare.com/wallpaper/699/369/173/video-games-the-elder-scrolls-v-skyrim-grand-theft-auto-v-mass-effect-3-wallpaper-preview.jpg',
      },
      // OPTIONAL: for filter by created.
      createdByUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
