import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber} from "~~/hooks/scaffold-eth";
import { useState } from "react";
import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const pastproposals : NextPage = ( ) => {

    const [proposals, setProposals] = useState([]);

    const finishedproposals = useScaffoldEventSubscriber({
      contractName: "GoBuidlMe",
      eventName: "ProposalCreated",
      listener: (proposalName, proposalDescription, beneficiary, requested_amount, start, end) => {
        setProposals(prevProposals => [
          ...prevProposals,
          {
            name: proposalName,
            description: proposalDescription,
            beneficiary: beneficiary,
            amount: requested_amount,
            start: start,
            end: end
          }
        ]);
      }
    });
    
return (
    <>
    {proposals.map((proposal, index) => (
        <div key={index}>
        <h3>{proposal.name}</h3>
        <p>{proposal.description}</p>
        <p>Beneficiary: {proposal.beneficiary}</p>
        <p>Requested Amount: {proposal.amount.toString()} ETH</p>
        <p>Start Date: {proposal.start.toString()}</p>
        <p>End Date: {proposal.end.toString()}</p>
        <hr />
        </div>
    ))}

</>
  );};
    

export default pastproposals;


// const [finalized, setFinalized] = useState([]);

// const finalizedproposals = useScaffoldEventSubscriber({
//     contractName: "GoBuidlMe",
//     eventName: "finalizedProposal",
//     listener: (finalized, donations) => {
//         setFinalized(prevFinalized => [...prevFinalized, {
//             finalized: finalized,
//             donations: donations
//         }]);
//     }
// });