// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

event GiftCardCreated(address indexed sender, uint256 amount, string indexed hashCode, string url);
event GiftCardRedeemed(address indexed recipient, uint256 amount, string indexed hashCode);

contract Xenia {
    struct GiftCard {
        uint256 amount;
        address sender;
        string ipfs;
        bool redeemed;
    }

    mapping(string => GiftCard) public giftCards;
    address public owner;
    uint256 public nextGiftCardId;

    constructor() {
        owner = msg.sender;
        nextGiftCardId = 1;
    }

    // ----- CREATE A GIFT CARD
    function createGiftCard(
        string memory _code,
        string memory _ipfs
    ) external payable {
        require(msg.value > 0, "Gift card amount must be greater than zero");
        // CHECK IF GIFT CARD ALREADY EXISTS
        require(
            giftCards[_code].amount == 0,
            "Gift card with this code already exists"
        );

        // CREATE GIFT CARD
        giftCards[_code] = GiftCard({
            amount: msg.value,
            sender: msg.sender,
            ipfs: _ipfs,
            redeemed: false
        });

        // EMIT EVENT
        emit GiftCardCreated(msg.sender, msg.value, _code, _ipfs);
    }

    // ----- VALIDATE GIFT CARD
    function validateGiftCard(string memory _code) external view returns (
        uint256 amount,
        address sender,
        string memory ipfs,
        bool redeemed
    ) {
        // CHECK IF GIFT CARD EXISTS
        require(
            giftCards[_code].amount > 0,
            "A gift card with this code does not exist!"
        );

        // RETURN GIFT CARD DETAILS
        GiftCard memory card = giftCards[_code];
        return (card.amount, card.sender, card.ipfs, card.redeemed);
    }

    // ----- REDEEM GIFT CARD
    function redeemGiftCard(string memory _code) external {
        // CHECK IF GIFT CARD EXISTS
        require(
            giftCards[_code].amount > 0,
            "A gift card with this code does not exist!"
        );

        // CHECK IF GIFT CARD HAS BEEN REDEEMED
        GiftCard storage card = giftCards[_code];
        require(!card.redeemed, "Gift card has already been redeemed!");

        card.redeemed = true;
        uint256 amountToTransfer = card.amount;
        (bool success, ) = msg.sender.call{value: amountToTransfer}("");
        require(success, "Transfer failed");

        // EMIT EVENT
        emit GiftCardRedeemed(msg.sender, amountToTransfer, _code);
    }
}
