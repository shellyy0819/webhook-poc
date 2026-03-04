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
