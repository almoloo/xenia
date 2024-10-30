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

## 🚀 Roadmap

Our journey to revolutionize blockchain-based gifting is just beginning! Here’s a look at what’s ahead:

- [ ] **Bulk Gift Card Creation**  
       Effortlessly create multiple gift cards at once, perfect for promotional campaigns or corporate gifting.

- [ ] **One-Click Sharing**  
       A seamless option to share gift cards with a single click, simplifying the gifting process across messaging platforms and email.

- [ ] **Gift Card Dashboard**  
       Easily access all your sent and received gift cards in a personalized dashboard, with filters to track redeemed and active cards.

Stay tuned as I continue to enhance the Xenia experience! Your feedback and support helps me shape a more secure and user-friendly blockchain gifting solution.

## 🛠️ Contributing

Feel free to fork this project, submit issues, and create pull requests. All contributions are welcome and appreciated!

## ⚖️ License

Distributed under the MIT License. See [LICENSE](/LICENSE) for more information.

---

Ali Mousavi - [@almoloo](https://twitter.com/almoloo) - [amousavig@icloud.com](mailto:amousavig@icloud.com)
