"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "images",
      [
        {
          title: "Turtle",
          url:
            "https://www.shutterstock.com/image-photo/photo-sea-turtle-galapagos-island-1453313555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Dog",
          url:
            "https://www.shutterstock.com/image-photo/dog-celebrating-new-year-licking-lips-1564756072",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Cat",
          url:
            "https://www.shutterstock.com/image-photo/cat-on-bed-being-lazy-1676534392",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Grape",
          url:
            "https://www.shutterstock.com/image-photo/red-grapes-green-leaves-white-background-1723332358",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Park",
          url:
            "https://www.shutterstock.com/image-photo/beautiful-panorama-green-city-park-dawn-529541479",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("images", null, {});
  },
};
