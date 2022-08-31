# Multichain Certificate Manager

![MultiChain](https://chainstack.com/wp-content/uploads/2021/12/MultiChain.png)

#### App to Generate and verify certificates. Made on top of [MultiChain](https://www.multichain.com/) (a **permissioned** fork of Bitcoin). Metadata about the certificate owner is saved on multichain in form of streams. Used TypeScript for developing the app with Ejs as the view engine.


---
## Installation
You need to have 1 or more running multichain nodes to test the application. To set up a node follow [this](https://www.multichain.com/getting-started/). Also, initialize a stream and keep the creation txn id.
#### 1) Clone the repository:
    git clone https://github.com/SD170/multichain-certificate-manager
#### 2) Install all the dependencies:
On the project root folder, run:
    
    npm install
#### 3) Add a config.env file:
We have used MongoDB as our database. So, in order to connect to the local database, we'll need 3 values, and we've kept them in **config.env** in the path-  **/config**:

- run `cat .multichain/"chain name"/multichain.conf` to find out RPC_USER & RPC_PASSWORD. 
- run `cat .multichain/"chain name"/params.dat` to find out the RPC_PORT.
- RPC_PORT(default: `4256`) port is different than the created chain's network port(default: `4257`).
- Create a file named **config.env** inside the folder, **/config**.
- Add 3 env variables eg:
    ```
    RPC_HOST=127.0.0.1(localhost)
    RPC_PORT=<your RPC_PORT>
    RPC_USER=<your RPC_USER>
    RPC_PASSWORD=<your RPC_PASSWORD>
    MULTICHAIN_CERT_STREAM_TXN=<tream creation transaction's txn id>
    ```
#### 4) Start the project:
From the root folder, start the project by running:
   
    npm start
    

---

## Tech-stack

- [TypeScript](https://www.typescriptlang.org/) - Dev scripting language
- [node.js](https://nodejs.org/) - Runtive env
- [multichain-node](https://github.com/scoin/multichain-node) - A wrapper for Multichain's JSON RPC api
- [multer](https://www.npmjs.com/package/multer) and [pdfkit](https://www.npmjs.com/package/pdfkit) - For uploading and generating required files
- [EJS](https://ejs.co/) - For templating html

---

#### Thanks for checking it out. Have a great day.