import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import User from "../../artifacts/contracts/User.sol/User.json";
//import { Link } from "react-router-dom";

declare let window: any;

interface State {
  userName: string;
  about: string;
  ig: string;
  youtube: string;
  byNoGame: string;
}

export class CreateUser extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.createUserName = this.createUserName.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.setAbout = this.setAbout.bind(this);
    this.setIg = this.setIg.bind(this);
    this.setYoutube = this.setYoutube.bind(this);
    this.setByNoGame = this.setByNoGame.bind(this);

    this.state = {
      userName: "",
      about: "",
      ig: "",
      youtube: "",
      byNoGame: "",
    };
  }

  public onChangeUserName(e: any) {
    this.setState({ userName: e.target.value });
  }

  public setAbout(e: any) {
    this.setState({ about: e.target.value });
  }

  public setYoutube(e: any) {
    this.setState({ youtube: e.target.value });
  }

  public setIg(e: any) {
    this.setState({ ig: e.target.value });
  }

  public setByNoGame(e: any) {
    this.setState({ byNoGame: e.target.value });
  }

  async createUserName(e: any) {
    e.preventDefault();

    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0xe1db1081fC15B72336DCFD2d2F90e1a5F00792b8",
          User.abi,
          signer
        );
        const socialMediaArray = [this.state.ig, this.state.youtube];
        const contractData = await contract.createUser(
          this.state.userName,
          this.state.about,
          socialMediaArray,
          this.state.byNoGame
        );

        console.log(contractData);
        await contractData.wait();
        console.log("data: ", contractData);
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ userName: "" });
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

    /*
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
        window.location.href = "/";
      }
    }
    */
  }

  render(): React.ReactNode {
    return (
      <div>
        <header>
          <h1>Welcome to Chain Storage</h1>
          <form onSubmit={this.createUserName}>
            <label>User Name</label>
            <input
              type="text"
              value={this.state.userName}
              onChange={this.onChangeUserName}
              className="form-control"
            />

            <label>about</label>
            <input
              type="text"
              value={this.state.about}
              onChange={this.setAbout}
              className="form-control"
            />

            <label>ig link</label>
            <input
              type="text"
              value={this.state.ig}
              onChange={this.setIg}
              className="form-control"
            />

            <label>youtube link</label>
            <input
              type="text"
              value={this.state.youtube}
              onChange={this.setYoutube}
              className="form-control"
            />

            <label>byNoGame</label>
            <input
              type="text"
              value={this.state.byNoGame}
              onChange={this.setByNoGame}
              className="form-control"
            />
            <input type="submit" />
          </form>
        </header>
      </div>
    );
  }
}
