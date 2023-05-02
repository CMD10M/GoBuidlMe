//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";


contract GoBuidlMe {
    constructor() {
    }
        struct Proposals {
            uint index;
            string proposalName;
            string proposalDescription;
            address beneficiary;
            uint requested_amount;
            uint donations;
            uint start;
            uint end;
            bool finalized;
    }

    mapping(uint => mapping(address => bool)) public donated;
    mapping(uint => mapping(address => uint256)) public donationAmount;

    Proposals[] public createProposals;

    event ProposalCreated(string proposalName, string proposalDescription, address beneficiary, uint requested_amount, uint end);
    event Donations(uint donations);
    
    function createProposal(string memory _proposalName, string memory _proposalDescription, address _beneficiary, uint _requested_amount, uint _durationInDays) public {
        uint256 endtime = block.timestamp + (_durationInDays * 1 minutes);
        createProposals.push(Proposals({
            proposalName: _proposalName, 
            proposalDescription: _proposalDescription,
            beneficiary: _beneficiary,
            requested_amount: _requested_amount,
            start: block.timestamp,
            end: endtime,
            finalized: false,
            index: createProposals.length,
            donations: 0
            }));

        emit ProposalCreated(_proposalName, _proposalDescription, _beneficiary, _requested_amount, endtime);
    }

function getProposals() public view returns (Proposals[] memory) {
    Proposals[] memory proposals = new Proposals[](createProposals.length);
    for (uint i = 0; i < createProposals.length; i++) {
        Proposals memory proposal = createProposals[i];
        proposals[i] = proposal;
    }
    return proposals;
}

    function donate(uint256 proposalID) public payable {
        console.log("ProposalID", proposalID);
        Proposals storage proposal = createProposals[proposalID];
        require(block.timestamp < proposal.end, "Donation period has ended");
        donated[proposalID][msg.sender] = true;
        donationAmount[proposalID][msg.sender] += msg.value;
        uint256 amount = msg.value;
        proposal.donations += amount;
        emit Donations(proposal.donations);
    }
    
    function finalize(uint256 proposalID) public payable {
        Proposals storage proposal = createProposals[proposalID];
        require(!proposal.finalized, "Already finalized");
        require(block.timestamp >= proposal.end, "Donation period has not ended yet");
        proposal.finalized = true;
        (bool sent,) = proposal.beneficiary.call{value: proposal.donations}("");
        require(sent, "Failed to send Ether");
        delete proposal.donations;
        }

    // function finalize(uint256 proposalID) public payable {
    //     Proposals storage proposal = createProposals[proposalID];
    //     require(block.timestamp > proposal.end, "Proposal has not yet ended");
    //     require(!proposal.finalized, "Proposal has already been finalized");

    //     proposal.finalized = true;
    //     (bool sent,) = proposal.beneficiary.call{value: proposal.donations}("");
    //     require(sent, "Failed to send Ether");
    //     delete proposal.donations;
    //     }

    function cancel(uint256 proposalID) public payable {
        Proposals storage proposal = createProposals[proposalID];
        require(donated[proposalID][msg.sender], "Sender has not donated yet");
        require(!proposal.finalized, "Proposal has already been finalized");
        require(block.timestamp < proposal.end, "Donation period has ended");
        uint256 amount = donationAmount[proposalID][msg.sender];
        donationAmount[proposalID][msg.sender] = 0;
        donated[proposalID][msg.sender] = false;
        proposal.donations -= amount;
        (bool sent,) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}