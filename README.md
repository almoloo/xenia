# 🌟 Xenia

![cover-image](/images/hero.png)

Xenia is an EVM-based platform on AIA network enabling users to create, validate, and redeem gift cards securely and transparently. Using cryptographic hashing, the contract ensures that gift cards are unique, tamper-proof, and securely redeemable by recipients.

---

## 🌐 Features

- **Secure Gift Card Creation**: Issue gift cards with unique, hashed codes to protect against unauthorized use.
- **Redeemable by Recipients**: Only valid, unredeemed gift cards can be redeemed.
- **Full Validation**: Validate gift cards and verify if they exist or have already been redeemed.
- **Retrieve Created Cards**: Easily fetch all gift cards issued by a specific address.
- **Transparent Blockchain Transactions**: All interactions are transparent, recorded on-chain, and easily verifiable.

---

## 📸 Screenshots

### Creating a Gift Card

![create-card-screenshot](/images/screenshot-1.png)
![create-card-screenshot](/images/screenshot-2.png)

### Validating a Gift Card

![validate-card-screenshot](/images/screenshot-3.png)

### Redeeming a Gift Card

![redeem-card-screenshot](/images/screenshot-4.png)

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Hardhat](https://hardhat.org/)

### Clone the Repository

```bash
git clone https://github.com/almoloo/xenia.git
cd xenia
```

### Install Dependencies

```bash
npm install
```

### Run the Service

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### Compile the Contract

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

## 📜 Smart Contract

The Xenia.sol contract contains the following key functions:

### createGiftCard

> Hash-based creation of new gift cards with unique codes.

### validateGiftCard

> Verifies if a gift card exists and returns its details.

### redeemGiftCard

> Securely redeems a gift card, transferring funds to the recipient.

### getGiftCardsBySender

> Fetches all gift cards created by a specific address.

## 🛠️ Contributing

Feel free to fork this project, submit issues, and create pull requests. All contributions are welcome and appreciated!

## ⚖️ License

Distributed under the MIT License. See [LICENSE](/LICENSE) for more information.

---

Ali Mousavi - [@almoloo](https://twitter.com/almoloo) - [amousavig@icloud.com](mailto:amousavig@icloud.com)
