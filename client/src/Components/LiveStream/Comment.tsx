import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography } from "antd";
import { ethers } from "ethers";
import User from "../../artifacts/contracts/User.sol/User.json";

declare let window: any;

const streamerPublicKey = window.location.href.slice(-42); // 👉️ Public Key

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

interface IState {
  searchVal: any;
  userName: any;
  isLoggedIn: boolean;
  messages: any[];
}

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export class Comments extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchVal: "",
      userName: "",
      isLoggedIn: false,
      messages: [],
    };
  }

  onButtonClicked = async (value: any) => {
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

      if (
        element.publicKey?.toLowerCase() ===
        window.ethereum.selectedAddress?.toLowerCase()
      ) {
        userArray.push(element);
      }
    }

    if (userArray.length < 1) {
      alert("you have to login with metamesk for send comment to chat");
    } else {
      this.setState({ isLoggedIn: true });
      client.send(
        JSON.stringify({
          type: "message",
          msg: value,
          user: userArray[0].userName,
          room: streamerPublicKey,
        })
      );
      this.setState({ searchVal: "" });
    }
  };

  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message: any) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ", dataFromServer);

      if (
        dataFromServer.type === "message" &&
        dataFromServer.room === streamerPublicKey
      ) {
        this.setState((state: any) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.msg,
              user: dataFromServer.user,
            },
          ],
        }));
      }
    };
  }

  render() {
    return (
      <div className="main" id="wrapper">
        <div>
          <div className="title">
            <Text
              id="main-heading"
              type="secondary"
              style={{ fontSize: "36px" }}
            >
              Websocket Chat: {this.state.userName}
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 50,
            }}
            id="messages"
          >
            {this.state.messages.map((message: any) => (
              <Card
                key={message.msg}
                style={{
                  width: 300,
                  margin: "16px 4px 0 4px",
                  alignSelf:
                    this.state.userName === message.user
                      ? "flex-end"
                      : "flex-start",
                }}
                loading={false}
              >
                <Meta title={message.user + ":"} description={message.msg} />
              </Card>
            ))}
          </div>
          <div className="bottom">
            <Search
              placeholder="input message and send"
              enterButton="Send"
              value={this.state.searchVal}
              size="large"
              onChange={(e) => this.setState({ searchVal: e.target.value })}
              onSearch={(value) => this.onButtonClicked(value)}
            />
          </div>
        </div>
      </div>
    );
  }
}
