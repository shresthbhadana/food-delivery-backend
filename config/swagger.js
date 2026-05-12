const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

// Windows par path.join backslashes deta hai jo glob tod deta hai
// isliye __dirname ko forward slashes mein convert karo
const routesDir = path.join(__dirname, "../routes").replace(/\\/g, "/");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Food Delivery API",
      version: "1.0.0",
      description: "Node.js + Express + Sequelize API Documentation",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: [
    `${routesDir}/*.js`,
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;