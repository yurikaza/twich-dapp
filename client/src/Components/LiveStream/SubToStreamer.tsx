import { ethers } from "ethers";
import subContract from "../../artifacts/contracts/Sub.sol/Sub.json";
//import LiveStreamContract from "../../artifacts/contracts/LiveStream.sol/LiveStream.json";

declare let window: any;

interface IProps {
  streamerName: string;
}

export function SubToStreamer(props: IProps) {
  const createSub = async () => {
    if (typeof window.ethereum !== "undefined") {
      const last3 = window.location.href.slice(-42); // 👉️ Public Key

      let streamKey: any[] = [];

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        "0x21fd8bE1EeaC386550b412AFC6bD4d4337E6b170",
        subContract.abi,
        signer
      );

      const options = { value: ethers.utils.parseEther("0.003") };

      var today: any = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      let oneMonthLater: any = "";
      if (mm === "12") {
        oneMonthLater = 1 + "/" + dd + "/" + yyyy + 1;
      } else {
        oneMonthLater = mm + 1 + "/" + dd + "/" + yyyy;
      }

      const contractData = await contract.createSub(
        last3,
        today,
        oneMonthLater,
        options
      );

      const SendMonyData = await contract.SendMatic(
        last3,
        ethers.utils.parseEther("0.003")
      );

      console.log(SendMonyData);
      console.log(contractData);
    }
  };

  return (
    <div>
      Sub to {props.streamerName}
      <div>
        <button onClick={createSub}>Sub</button>
      </div>
    </div>
  );
}
