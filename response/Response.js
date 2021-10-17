export const newResponse = (status, payload, message) => {
  return {
    status,
    payload,
    message,
    timestamp: new Date(),
  };
};
