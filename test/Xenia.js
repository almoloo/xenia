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
    const hashedCode = ethers.sha256(ethers.toUtf8Bytes(code));

    // Create the gift card
    await xenia
      .connect(sender)
      .createGiftCard(hashedCode, ipfs, { value: amount });

    // Validate the gift card
    const card = await xenia.validateGiftCard(code);

    // Hash the code to verify the stored gift card
    const giftCard = await xenia.giftCards(hashedCode);

    expect(giftCard.amount).to.equal(amount);
    expect(giftCard.sender).to.equal(sender.address);
    expect(giftCard.ipfs).to.equal(ipfs);
    expect(giftCard.redeemed).to.equal(false);
  });

  it("should redeem a gift card", async function () {
    const amount = ethers.parseEther("1");
    const code = "GIFT123ABC";
    const ipfs = "abcdefg";
    const hashedCode = ethers.sha256(ethers.toUtf8Bytes(code));

    // Sender creates the gift card
    await xenia
      .connect(sender)
      .createGiftCard(hashedCode, ipfs, { value: amount });

    // Redeem the gift card as the recipient
    const balanceBefore = await ethers.provider.getBalance(recipient.address);
    await xenia.connect(recipient).redeemGiftCard(code);
    const balanceAfter = await ethers.provider.getBalance(recipient.address);

    // Check that the balance has increased by the gift card amount
    const gasUsed = balanceBefore - balanceAfter + amount;
    expect(gasUsed < ethers.parseEther("0.01")).to.be.true;

    // Verify the gift card is marked as redeemed
    const giftCard = await xenia.giftCards(hashedCode);
    expect(giftCard.redeemed).to.equal(true);
  });

  it("should not allow a gift card to be redeemed twice", async function () {
    const amount = ethers.parseEther("1");
    const code = "GIFT123ABC";
    const ipfs = "abcdefg";
    const hashedCode = ethers.sha256(ethers.toUtf8Bytes(code));

    // Sender creates the gift card
    await xenia
      .connect(sender)
      .createGiftCard(hashedCode, ipfs, { value: amount });

    // Redeem the gift card as the recipient
    await xenia.connect(recipient).redeemGiftCard(code);

    // Try to redeem again and expect it to revert
    await expect(
      xenia.connect(recipient).redeemGiftCard(code)
    ).to.be.revertedWith("Gift card has already been redeemed!");
  });

  it("should revert if the gift card doesn't exist", async function () {
    const invalidCode = "INVALID_CODE";
    const hashedCode = ethers.sha256(ethers.toUtf8Bytes(invalidCode));

    await expect(xenia.validateGiftCard(hashedCode)).to.be.revertedWith(
      "A gift card with this code does not exist!"
    );
  });

  it("should retrieve all gift cards created by a specific sender", async function () {
    const amount1 = ethers.parseEther("1");
    const amount2 = ethers.parseEther("2");
    const code1 = "GIFT123ABC";
    const code2 = "GIFT456DEF";
    const ipfs1 = "abcdefg";
    const ipfs2 = "hijklmn";

    const hashedCode1 = ethers.sha256(ethers.toUtf8Bytes(code1));
    const hashedCode2 = ethers.sha256(ethers.toUtf8Bytes(code2));

    // Sender creates two gift cards
    await xenia
      .connect(sender)
      .createGiftCard(hashedCode1, ipfs1, { value: amount1 });
    await xenia
      .connect(sender)
      .createGiftCard(hashedCode2, ipfs2, { value: amount2 });

    // Retrieve all gift cards by the sender
    const senderCards = await xenia.getGiftCardsBySender(sender.address);

    expect(senderCards.length).to.equal(2);
    expect(senderCards[0].amount).to.equal(amount1);
    expect(senderCards[0].sender).to.equal(sender.address);
    expect(senderCards[0].ipfs).to.equal(ipfs1);
    expect(senderCards[0].redeemed).to.equal(false);

    expect(senderCards[1].amount).to.equal(amount2);
    expect(senderCards[1].sender).to.equal(sender.address);
    expect(senderCards[1].ipfs).to.equal(ipfs2);
    expect(senderCards[1].redeemed).to.equal(false);
  });
});
