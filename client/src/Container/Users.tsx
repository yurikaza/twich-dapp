import React, { useEffect, useState, Component, useRef } from "react";
import User from "../artifacts/contracts/User.sol/User.json";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

declare let window: any;

interface State {
  user: any[];
}

interface Props {}

export class Users extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.streamLink = this.streamLink.bind(this);

    this.state = {
      user: [],
    };
  }
  // request access to the user's MetaMask account
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

    this.setState({ user: contractData });
  }

  streamLink(data: string) {
    return `/stream/${data}`;
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.user.map((data) => (
          <Stack>
            <Link
              className="bg-light border pb-3 pmt-3 w-100"
              to={this.streamLink(data.publicKey)}
            >
              {" "}
              {data.userName}{" "}
            </Link>
          </Stack>
        ))}
      </>
    );
  }
}
