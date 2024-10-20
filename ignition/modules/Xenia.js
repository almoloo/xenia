const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LockModule", (m) => {
  const xenia = m.contract("Xenia", [], {});

  return { xenia };
});
