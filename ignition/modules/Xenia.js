const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("XeniaModule", (m) => {
  const xenia = m.contract("Xenia", [], {});

  return { xenia };
});
