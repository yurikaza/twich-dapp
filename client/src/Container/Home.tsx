import React, { useEffect, useState, Component } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

declare let window: any;

export class Home extends Component {
  // request access to the user's MetaMask account
  async requestAccount() {
    console.log(window.ethereum.selectedAddress);
    const connect: any = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    window.location.href = "/createUserName";
  }

  render(): React.ReactNode {
    return (
      <div>
        <header>
          <h1>Welcome to Chain Storage</h1>
          <button onClick={this.requestAccount}>Login</button>
        </header>
        <Link to="/profile">Go Profile</Link>
      </div>
    );
  }
}
