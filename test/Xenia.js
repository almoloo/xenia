const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Xenia", function () {
  let Xenia, xenia;
  let owner, sender, recipient;

  beforeEach(async function () {
    [owner, sender, recipient] = await ethers.getSigners();

    // Deploy the XeniaGiftCard contract
    Xenia = await ethers.getContractFactory("Xenia");
    xenia = await Xenia.deploy();
    await xenia.waitForDeployment();
  });

  it("should create and validate a gift card", async function () {
    const amount = ethers.parseEther("1");
    const code = "GIFT123ABC";
    const ipfs = "abcdefg";

    // Create the gift card
    await xenia.connect(sender).createGiftCard(code, ipfs, { value: amount });

    // Validate the gift card
    const card = await xenia.validateGiftCard(code);

    // Hash the code to verify the stored gift card
    const giftCard = await xenia.giftCards(code);

    expect(giftCard.amount).to.equal(amount);
    expect(giftCard.sender).to.equal(sender.address);
    expect(giftCard.ipfs).to.equal(ipfs);
    expect(giftCard.redeemed).to.equal(false);
  });

  it("should revert if the gift card doesn't exist", async function () {
    const invalidCode = "INVALID_CODE";

    await expect(xenia.validateGiftCard(invalidCode)).to.be.revertedWith(
      "A gift card with this code does not exist!"
    );
  });
});
