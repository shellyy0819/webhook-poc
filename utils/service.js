/**
 * Checks if a webhook event matches any of the configured service triggers.
 * 
 * Compares the service and status from the payload against the configured
 * service_trigger patterns. Each pattern is in the format "sms_success".
 * 
 * @param {Object} configs - Configuration object containing service triggers
 * @param {string[]} configs.service_trigger - Array of trigger patterns in format "sms_success"
 * @param {Object} payload - Webhook payload to validate
 * @param {string} payload.service - Service name from the webhook payload
 * @param {string} payload.status - Status from the webhook payload
 * @returns {boolean} True if the payload matches any configured trigger, false otherwise
 * 
 * @example
 * const configs = { service_trigger: ['sms_failed', 'sms_success'] };
 * const payload = { service: 'sms', status: 'failed' };
 * extractServiceFromEvent(configs, payload); // returns true
 */

const extractServiceFromEvent = (configs, payload) => {
  return configs?.service_trigger?.some(
    (service) =>
      service?.toLocaleLowerCase()?.split("_")?.[0] ===
        payload?.service?.toLocaleLowerCase() &&
      service?.toLocaleLowerCase()?.split("_")?.[1] ===
        payload?.status?.toLocaleLowerCase(),
  );
};

module.exports = {
  extractServiceFromEvent,
};
