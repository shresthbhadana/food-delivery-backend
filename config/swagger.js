const swaggerJsdoc = require("swagger-jsdoc");

const options = {

  definition: {
    openapi: "3.0.0",

    info: {
      title: "PreOrder API",

      version: "1.0.0",

      description:
        "Node.js + Express + Sequelize API Documentation",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: [
    "./routes/*.js",
  ],
};

const swaggerSpec =
  swaggerJsdoc(options);

module.exports = swaggerSpec;