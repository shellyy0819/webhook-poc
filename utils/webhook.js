require("dotenv").config();

const axios = require("axios");
const WebhookConfig = require("../models/webhook");
const {
  extractServiceFromEvent,
  formatServicesForNotification,
} = require("./service");

// TODO: use this consume function with rabbitmq
const consumeNotification = async (payload) => {
  // expects payload from notification service
  // trigger webhook api with payload
  const configs = await WebhookConfig.findOne({
    client_id: payload.client_id,
  });

  if (!configs) {
    throw new Error(
      `Webhook config not found for client_id: ${payload.client_id}`,
    );
  }

  const serviceMatched = extractServiceFromEvent(configs, payload);

  if (!serviceMatched) {
    throw new Error(
      `Service ${payload.service}_${payload.status} not enabled for client_id: ${payload.client_id}`,
    );
  }

  const salt = process.env.MASTER_ENCRYPTION_KEY + configs.client_id;
  const decryptedApiKey = decrypt(configs.encrypted_key, salt);

  try {
    const response = await axios.post(configs.webhook_url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${decryptedApiKey}`,
      },
      timeout: 5000, // always set timeout
    });
    console.log("response.data", response.data);

    return response.data;
  } catch (err) {
    console.error("Webhook call failed:", err.message);

    throw new Error(
      `Webhook delivery failed for client_id: ${payload.client_id}`,
    );
  }
};

module.exports = { consumeNotification, formatServicesForNotification };
