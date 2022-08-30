import React from "react";
import { ethers } from "ethers";
import LiveStreamContract from "../../artifacts/contracts/LiveStream.sol/LiveStream.json";
import { v4 as uuid } from "uuid";

declare let window: any;

interface State {
  userName: string;
  category: string;
  id: string;
  subOnly: string;
  obsKey: string;
}

interface Props {
  userName: string;
  userPublicKey: string;
}

export class CreateLiveStream extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserCategory = this.onChangeUserCategory.bind(this);
    this.createLiveStreamKey = this.createLiveStreamKey.bind(this);
    this.onChangeSubOnlyCategory = this.onChangeSubOnlyCategory.bind(this);

    this.state = {
      userName: "",
      category: "",
      id: "",
      obsKey: "",
      subOnly: "",
    };
  }

  public onChangeUserName(e: any) {
    this.setState({ userName: e.target.value });
  }

  public onChangeUserCategory(e: any) {
    this.setState({ category: e.target.value });
  }

  public onChangeSubOnlyCategory(e: any) {
    this.setState({ subOnly: e.target.value });
  }

  async createLiveStreamKey(e: any) {
    e.preventDefault();

    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0xED2861d32A317FBC8A3d205d951F6Ba8E4AeB374",
          LiveStreamContract.abi,
          signer
        );

        const unique_id = uuid();
        const name_id = uuid();
        console.log(unique_id);
        this.setState({ id: unique_id });

        let activateSubMode: boolean = false;

        if (this.state.subOnly === "yes") {
          activateSubMode = true;
        }

        const contractData = await contract.createLiveStream(
          name_id,
          unique_id,
          this.state.category,
          "rtmp://localhost:1935/live/",
          activateSubMode
        );

        this.setState({ obsKey: `${name_id}?key=${unique_id}` });
        console.log(contractData);

        await contractData.wait();
        console.log("data: ", contractData);
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ userName: "", category: "", subOnly: "" });
  }

  render(): React.ReactNode {
    return (
      <div>
        <header>
          <h1>Welcome to Chain Storage</h1>
          <p> {this.state.userName} </p>
          <form onSubmit={this.createLiveStreamKey}>
            <br />
            <label>category</label>
            <input
              type="text"
              value={this.state.category}
              onChange={this.onChangeUserCategory}
              className="form-control"
            />
            <label>Type "yes" for activate sub mode</label>
            <input
              type="text"
              value={this.state.subOnly}
              onChange={this.onChangeSubOnlyCategory}
              className="form-control"
            />
            <input type="submit" />
          </form>
          <p> {this.state.id} </p>
        </header>

        <div>Your Obs Password: {this.state.obsKey}</div>
      </div>
    );
  }
}
