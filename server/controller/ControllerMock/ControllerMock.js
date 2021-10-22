export const ControllerMock = (status, payload, message) => {
  return {
    status,

    payload,
    message,
    timestamp: new Date(),
  };
};
//module.exports =ControllerMock;
