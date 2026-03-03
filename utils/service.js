const extractServiceFromEvent = (configs, payload) => {
  return configs?.service_trigger?.some(
    (service) =>
      service?.toLocaleLowerCase()?.split("_")?.[0] ===
        payload?.service?.toLocaleLowerCase() &&
      service?.toLocaleLowerCase()?.split("_")?.[1] ===
        payload?.status?.toLocaleLowerCase(),
  );
};

const formatServicesForNotification = (enabledServices) => {
  const result = enabledServices.map((service) => {
    return { [service?.split("_")?.[0]?.toLocaleLowerCase()]: true };
  });
  return result;
};

module.exports = {
  extractServiceFromEvent,
  formatServicesForNotification,
};
