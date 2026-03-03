const mongoose = require("mongoose");

const webhookConfigSchema = new mongoose.Schema(
  {
    client_id: { type: String, required: true, unique: true },
    webhook_url: { type: String, required: true },
    encrypted_key: { type: String, required: true },
    service_trigger: { type: Array, default: [] }
  },
  { timestamps: true },
);

webhookConfigSchema.index({ client_id: 1 }, { unique: true });
module.exports = mongoose.model("WebhookConfig", webhookConfigSchema);
