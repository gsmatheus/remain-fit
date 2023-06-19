import { FastifyInstance } from "fastify";
import { authenticateController } from "./controllers/authenticate";
import { registerController } from "./controllers/register.controller";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./controllers/middleware/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);

  /** Authenticated */
  app.get('/me',{ onRequest: [verifyJWT] },profile);
}
