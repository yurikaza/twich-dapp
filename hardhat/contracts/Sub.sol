// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

// 0x9113B747aBBeA1a3d52796B6792AAEE525Af0290

contract Sub {
    
    struct LiveStreamSub {
        address subPublicKey;
        address streamerPublicKey;
        string date;
        string  andDate;
    }

    LiveStreamSub[] public subs;

    function getSubs() public view returns (LiveStreamSub[] memory) {
        return subs;
    }

    function createSub(address  _streamerPublicKey, string memory _date, string memory _andDate) public payable {
        require(msg.value == 3000000000000000 wei);
    
        LiveStreamSub memory sub;

        sub.subPublicKey = msg.sender;
        sub.streamerPublicKey = _streamerPublicKey;
        sub.date = _date;
        sub.andDate = _andDate;
        
        subs.push(sub);
    }
    
    function SendMatic(address payable _to,uint256 balance) external {
    _to.transfer(balance);
    }
} 
