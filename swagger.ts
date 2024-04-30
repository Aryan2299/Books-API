import { Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books API",
      description:
        "API endpoints for a books entry service, documented on swagger.",
      version: "1.0.0",
    },
    securityDefinitions: {
      Authorization: {
        type: "apiKey",
        name: "authorization",
        in: "header",
        description: "Authentication token",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export function swaggerDocs(app: any) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
