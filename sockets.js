const contractInstance = require("./contractInstance/contractInstance.js");
const setStartPrice = require("./funcs/setStartPrice");
const setClosePrice = require("./funcs/setClosePrice");

module.exports = (wss) => {
  wss.on("connection", (ws) => {
    console.log("Client connected");

    const handleEpoch = async () => {
      try {
        const response = await contractInstance.timeUntilNextEpoch();
        const timeRemaining = parseInt(response);
        ws.send(JSON.stringify({ message: timeRemaining }));
        setTimeout(async () => {
          await setStartPrice();

          const epoch = await contractInstance.getCurrentEpoch();
          const lastEpoch = parseInt(epoch) - 2;
          await setClosePrice(lastEpoch);

          ws.send(JSON.stringify({ message: "Epoch functions executed" }));
          handleEpoch();
        }, timeRemaining * 1000);
      } catch (error) {
        console.error("Error handling epoch:", error);
      }
    };
    handleEpoch();
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
