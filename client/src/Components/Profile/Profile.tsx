import React from "react";
import { ethers } from "ethers";
import User from "../../artifacts/contracts/User.sol/User.json";

declare let window: any;

interface State {
  userName: string;
}

export class Profile extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      userName: "",
    };
  }

  async componentDidMount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      "0xe1db1081fC15B72336DCFD2d2F90e1a5F00792b8",
      User.abi,
      provider
    );
    console.log(contract);

    const contractData = await contract.getUser();
    console.log(contractData);
    let userArray: any[] = [];

    for (let index = 0; index < contractData.length; index++) {
      const element = contractData[index];

      console.log(
        element.publicKey?.toLowerCase(),
        window.ethereum.selectedAddress?.toLowerCase()
      );

      if (
        element.publicKey?.toLowerCase() ===
        window.ethereum.selectedAddress?.toLowerCase()
      ) {
        userArray.push(element);
      }
    }

    this.setState({ userName: userArray.slice(-1).pop().userName });
    console.log(this.state.userName);
  }

  render(): React.ReactNode {
    return (
      <div>
        <header>
          <h1>Welcome to Chain Storage</h1>
          <p> {this.state.userName} </p>
        </header>
      </div>
    );
  }
}
