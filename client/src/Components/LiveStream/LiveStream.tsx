import { useEffect, useState } from "react";
import { ethers } from "ethers";
import LiveStreamContract from "../../artifacts/contracts/LiveStream.sol/LiveStream.json";
import ReactHlsPlayer from "react-hls-player";
import axios from "axios";
import "../../style/LiveStream.css";
import { Comments } from "./Comment";
import { SubToStreamer } from "./SubToStreamer";
import subContract from "../../artifacts/contracts/Sub.sol/Sub.json";

declare let window: any;

const streamerPublicKey = window.location.href.slice(-42); // 👉️ Public Key

async function getKey(): Promise<string | boolean[] | any[] | any> {
  let streamKey: any[] = [];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    "0xED2861d32A317FBC8A3d205d951F6Ba8E4AeB374",
    LiveStreamContract.abi,
    provider
  );

  const contractData = await contract.getLiveStream();

  for (let index = 0; index < contractData.length; index++) {
    const element = contractData[index];

    if (element.publicKey.toLowerCase() === streamerPublicKey.toLowerCase()) {
      streamKey.push(element);
    }
  }

  const streamKeyArray = streamKey.slice(-1).pop();
  const url: string = `http://localhost:8080/hls/${streamKeyArray.userName}.m3u8`;

  const subContractData = new ethers.Contract(
    "0x21fd8bE1EeaC386550b412AFC6bD4d4337E6b170",
    subContract.abi,
    provider
  );

  const subData = await subContractData.getSubs();
  console.log(subData, subData.lenght);

  let subArray: any[] = [];

  for (let index = 0; index < subData.length; index++) {
    const element = subData[index];
    const streamerPublicKey = window.location.href.slice(-42); // 👉️ Public Key

    if (
      element.subPublicKey.toLowerCase() ===
        window.ethereum.selectedAddress.toLowerCase() &&
      element.streamerPublicKey.toLowerCase() ===
        streamerPublicKey.toLowerCase()
    ) {
      console.log("jfadfsdfosdj");
      const isBefore = async (date1: Date, date2: Date) => {
        return date1 < date2;
      };

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      const d1 = new Date(`${yyyy}-${mm}-${dd}`);
      const d2 = new Date(
        `${element.date.slice(6, 10)}-${
          +element.date.slice(0, 2) + 1
        }-${element.date.slice(3, 5)}`
      );

      console.log(subArray);

      if ((await isBefore(d1, d2)) === true) {
        subArray.push(element);
      }
    }
  }

  return [url, streamKeyArray.userName, streamKeyArray.subOnly, subArray];
}

export function LiveStream() {
  const [key, setKey] = useState("");
  const [streamerName, setStreamerName] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [isSubOnly, setIsSubOnly] = useState(false);
  const [subArray, setSubArray] = useState([]);

  useEffect(() => {
    getKey()
      .then((value: any[]) => {
        console.log(value); // 👉️ "Stream Link"
        setKey(value[0]);
        setStreamerName(value[1]);
        setIsSubOnly(value[2]);
        setSubArray(value[3]);
        console.log(key);
      })
      .catch((err: Error) => {
        console.log(err);
      });

    console.log(key);

    axios.get(key).then((response) => {
      console.log(response.status);
      if (response.status === 200 && isSubOnly === false) {
        setIsLive(true);
      } else if (subArray.length > 0 && isSubOnly === true) {
        setIsLive(true);
      } else if (subArray.length < 0 && isSubOnly === true) {
        setIsLive(false);
      } else {
        setIsLive(false);
      }
    });
  });

  console.log(key);

  return (
    <div>
      {isLive === false && (
        <div>
          <p> offline </p>
          <SubToStreamer streamerName={streamerName} />
          <Comments />
        </div>
      )}
      {isLive === true && (
        <div>
          <p> strem key: {key} </p>
          <ReactHlsPlayer
            src={key}
            autoPlay={true}
            controls={true}
            width="60%"
            height="auto"
          />

          <Comments />
          <SubToStreamer streamerName={streamerName} />
        </div>
      )}
    </div>
  );
}
