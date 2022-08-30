// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// 0xe36Ed213FdeA0cF58248373d8154E990C6076b15

contract User {

    struct MyUser {
        uint256 id;
        address publicKey;
        string userName;
        string about;
        string[] socialMedia;
        string byNoGame;
    }

    MyUser[] public users;

    function getUser() public view returns (MyUser[] memory) {
        /*
        MyUser memory user;
        
        for (uint256 index = 0; index < myArray.length; index++) {
            if(myArray[index].publicKey == msg.sender) {
                myArray.push(myArray[index]);
            }
        }
       */ 
        return users;
    }

    function createUser(string memory _userName, string memory _about, string[] memory _socialMedia, string memory _bynogame) public {
        MyUser memory user;

        user.id = users.length + 1;
        user.publicKey = msg.sender;
        user.userName = _userName;
        user.about = _about;
        user.socialMedia = _socialMedia;
        user.byNoGame = _bynogame;
        
        users.push(user);
    }
} 