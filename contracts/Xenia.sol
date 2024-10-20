// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

event GiftCardCreated(address indexed sender, uint256 amount, string indexed hashCode, string message, string url);
event GiftCardRedeemed(address indexed recipient, uint256 amount, string indexed hashCode);

contract Xenia {
    struct GiftCard {
        uint256 amount;
        address sender;
        string message;
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

    // CREATE A GIFT CARD
    function createGiftCard(
        string memory _code,
        string memory _message,
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
            message: _message,
            ipfs: _ipfs,
            redeemed: false
        });

        // EMIT EVENT
        emit GiftCardCreated(msg.sender, msg.value, _code, _message, _ipfs);
    }
}
