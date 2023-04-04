//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */

contract GoBuidlMe {
    string public proposalName;
    string public proposalDescription;
    address public beneficiary;
    uint public requested_amount;
    uint public donations;
    uint public start;
    uint public end;
    bool public finalized;
    mapping(address => bool) public donated;
    mapping(address => uint256) public donationAmount;
    address[] public donors;

    constructor() {
        finalized = true;
    }

    event ProposalCreated(string proposalName, string proposalDescription, address beneficiary, uint requested_amount, uint end);
    event Donations(uint donations);
    
    function createProposal(string memory _proposalName, string memory _proposalDescription, address _beneficiary, uint _requested_amount, uint _durationInDays) public {
        require(finalized, "Previous proposal has not been finalized yet.");
        // require(_durationInDays <= 10, "Duration cannot be greater than 10 days.");
        proposalName = _proposalName;
        proposalDescription = _proposalDescription;
        beneficiary = _beneficiary;
        requested_amount = _requested_amount;
        start = block.timestamp;
        end = start + (_durationInDays * 1 minutes);
        finalized = false;
        emit ProposalCreated(_proposalName, _proposalDescription, _beneficiary, _requested_amount, end);
    }

    function donate() public payable {
        require(block.timestamp < end, "Donation period has ended");
        donated[msg.sender] = true;
        donors.push(msg.sender);
        uint256 amount = msg.value;
        donationAmount[msg.sender] = amount;
        donations += amount;
        emit Donations(donations);
    }
    
    function finalize() public payable {
        require(!finalized, "Already finalized");
        require(block.timestamp >= end, "Donation period has not ended yet");
        finalized = true;
        (bool sent,) = beneficiary.call{value: donations}("");
        require(sent, "Failed to send Ether");
        delete donations;
        }

    function cancel() public payable {
        require(donated[msg.sender], "Sender has not donated yet");
        require(!finalized, "Proposal has already been finalized");
        require(block.timestamp < end, "Donation period has ended");
        uint256 amount = donationAmount[msg.sender];
        donationAmount[msg.sender] = 0;
        donated[msg.sender] = false;
        donations -= amount;
        (bool sent,) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}