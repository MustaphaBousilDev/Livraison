const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API",
      description: "API Application alloMedia",

      contact: {
        name: "MMustapha Bousil",
      },
      servers: [
        {
          url: "http://localhost:5000/",
        },
      ],

      version: "1.0.0",
    },
  },
  apis: ["src/auth/auth.route.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;