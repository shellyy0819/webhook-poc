require("dotenv").config();

const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");

const webhookRoutes = require("./routes/webhookRoutes");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

/**
 * ✅ Enable CORS
 */
fastify.register(require("@fastify/cors"), {
  origin: true, // allow all origins (POC)
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

fastify.register(webhookRoutes, { prefix: "/api/webhook" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server running on port 3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
