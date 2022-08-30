const { ethers } = require("ethers");
const express = require("express");

const streamAbiObject = {
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "_userName",
          type: "string",
        },
        {
          internalType: "string",
          name: "_id",
          type: "string",
        },
        {
          internalType: "string",
          name: "_category",
          type: "string",
        },
        {
          internalType: "string",
          name: "_link",
          type: "string",
        },
        {
          internalType: "bool",
          name: "_subOnly",
          type: "bool",
        },
      ],
      name: "createLiveStream",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getLiveStream",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "id",
              type: "string",
            },
            {
              internalType: "address",
              name: "publicKey",
              type: "address",
            },
            {
              internalType: "string",
              name: "userName",
              type: "string",
            },
            {
              internalType: "string",
              name: "category",
              type: "string",
            },
            {
              internalType: "string",
              name: "link",
              type: "string",
            },
            {
              internalType: "bool",
              name: "subOnly",
              type: "bool",
            },
          ],
          internalType: "struct LiveStream.UserLiveStream[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "streams",
      outputs: [
        {
          internalType: "string",
          name: "id",
          type: "string",
        },
        {
          internalType: "address",
          name: "publicKey",
          type: "address",
        },
        {
          internalType: "string",
          name: "userName",
          type: "string",
        },
        {
          internalType: "string",
          name: "category",
          type: "string",
        },
        {
          internalType: "string",
          name: "link",
          type: "string",
        },
        {
          internalType: "bool",
          name: "subOnly",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};

const app = express();

app.use(express.urlencoded());

app.post("/auth", async function (req, res) {
  /* This server is only available to nginx */
  const streamkey = req.body.key;

  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com"
  );

  const contract = new ethers.Contract(
    "0xED2861d32A317FBC8A3d205d951F6Ba8E4AeB374",
    streamAbiObject.abi,
    provider
  );

  let streamKeyArray = [];

  const contractData = await contract.getLiveStream();
  console.log(contractData);

  for (let index = 0; index < contractData.length; index++) {
    const element = contractData[index];

    if (element.id === streamkey && element.userName === req.body.name) {
      streamKeyArray.push(element);
      break;
    }
  }

  if (streamKeyArray.length === 0) {
    /* Reject the stream */
    res.status(403).send();
  } else {
    console.log(streamKeyArray);
    const url = `http://127.0.0.1:8000/live/${streamKeyArray[0].id}.flv`;
    console.log("url is: " + url);
    console.log("Stream Key is: " + streamkey);
    console.log(req.body.name);

    /* You can make a database of users instead :) */
    if (streamkey === streamKeyArray[0].id) {
      res.status(200).send();
      return;
    }
  }
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
