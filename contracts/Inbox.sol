// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
/// @title Cntract for sending a Massage.
/// @author Md. Maruf Ahmed Robin <maruf.robin@northsouth.edu>
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract Inbox {
    string public firstMsg;
    constructor (string memory _msg){
        firstMsg = _msg;
    }
    function setMsg(string memory _newMsg) public{
        firstMsg = _newMsg;
    }

}