// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

event GiftCardCreated(address indexed sender, uint256 amount, bytes32 indexed hashCode, string url);
event GiftCardRedeemed(address indexed recipient, uint256 amount, bytes32 indexed hashCode);

contract Xenia {
    struct GiftCard {
        uint256 amount;
        address sender;
        string ipfs;
        bool redeemed;
    }

    mapping(bytes32 => GiftCard) public giftCards;
    bytes32[] public giftCardCodes;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // ----- CREATE A GIFT CARD
    function createGiftCard(
        bytes32 _code,
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
        giftCardCodes.push(_code);

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
        bytes32 hashedInputCode = sha256(abi.encodePacked(_code));
        // CHECK IF GIFT CARD EXISTS
        require(
            giftCards[hashedInputCode].amount > 0,
            "A gift card with this code does not exist!"
        );

        // RETURN GIFT CARD DETAILS
        GiftCard memory card = giftCards[hashedInputCode];
        return (card.amount, card.sender, card.ipfs, card.redeemed);
    }

    // ----- REDEEM GIFT CARD
    function redeemGiftCard(string memory _code) external {
        bytes32 hashedInputCode = sha256(abi.encodePacked(_code));
        // CHECK IF GIFT CARD EXISTS
        require(
            giftCards[hashedInputCode].amount > 0,
            "A gift card with this code does not exist!"
        );

        // CHECK IF GIFT CARD HAS BEEN REDEEMED
        GiftCard storage card = giftCards[hashedInputCode];
        require(!card.redeemed, "Gift card has already been redeemed!");

        card.redeemed = true;
        uint256 amountToTransfer = card.amount;
        (bool success, ) = msg.sender.call{value: amountToTransfer}("");
        require(success, "Transfer failed");

        // EMIT EVENT
        emit GiftCardRedeemed(msg.sender, amountToTransfer, hashedInputCode);
    }

    // ----- GET ALL GIFT CARDS BY SENDER
    function getGiftCardsBySender(address _sender) external view returns (GiftCard[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < giftCardCodes.length; i++) {
            if (giftCards[giftCardCodes[i]].sender == _sender) {
                count++;
            }
        }

        GiftCard[] memory result = new GiftCard[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < giftCardCodes.length; i++) {
            if (giftCards[giftCardCodes[i]].sender == _sender) {
                result[index] = giftCards[giftCardCodes[i]];
                index++;
            }
        }

        return result;
    }
}
