import { FastifyInstance } from "fastify";
import { authenticateController } from "./controllers/authenticate";
import { registerController } from "./controllers/register.controller";
import { profile } from "./controllers/profile";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);

  /** Authenticated */
  app.get('/me',profile);
}
