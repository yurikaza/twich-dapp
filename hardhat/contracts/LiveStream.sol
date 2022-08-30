// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract LiveStream {
    
    struct UserLiveStream {
        string id;
        address publicKey;
        string userName;
        string category;
        string link;
        bool subOnly;
    }

    UserLiveStream[] public streams;

    function getLiveStream() public view returns (UserLiveStream[] memory) {
        return streams;
    }

    function createLiveStream(string memory _userName, string memory _id, string memory _category, string memory _link, bool _subOnly) public {
        UserLiveStream memory stream;

        stream.publicKey = msg.sender;
        stream.userName = _userName;
        stream.id = _id;
        stream.category = _category;
        stream.link = _link;
        stream.subOnly = _subOnly;
        
        streams.push(stream);
    }
} 