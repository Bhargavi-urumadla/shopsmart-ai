const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShopSmart AI API",
      version: "1.0.0",
      description:
        "AI-powered E-Commerce Backend built with Node.js, Express, MongoDB and Groq AI.",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./routes/*.js",
    "./controllers/*.js",
  ],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;