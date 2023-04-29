import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite} from "~~/hooks/scaffold-eth";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const Test2 : NextPage = ( ) => {
  
  const [proposals, setProposals] = useState([]);
  const [index, setIndex] = useState(0);

  const { data: proposal} = useScaffoldContractRead({
    contractName: "GoBuidlMe",
    functionName: "getProposals",
  });
  const proposalArr = typeof proposal === 'object' ? Object.values(proposal) : [];
  const proposalID = 2;
  const [donation, setdonation] = useState("0");

  const {writeAsync: donated} = useScaffoldContractWrite({
    contractName: "GoBuidlMe",
    functionName: "donate",
    value: donation,
    args: [proposalID],
  });
  const handleDonate = async () => {
    await donated();
  };

  return (
    <>
    {proposalArr
    .filter((proposal) => proposal.end > Math.floor(Date.now() / 1000))
    .map((proposal) => (
  <div key={proposal.proposalName} className="max-w-6xl mx-auto py-12">
  <div className="bg-white rounded-lg shadow-md w-full px-6 py-8 md:mx-4 mb-6 md:mb-0 text-center overflow-auto justify-between flex-row">
    <h2 className="text-2xl font-bold mb-6">{proposal.proposalName}</h2>
    <p className="text-gray-600 mb-4 whitespace-normal break-words">Description: {proposal.proposalDescription}</p>
    <p className="text-gray-600 mb-4">Requested Amount: {parseFloat(proposal.requested_amount).toFixed(2)/ 1000000000000000000} ETH</p>
    <div className="flex items-center justify-center text-gray-600 mb-4">
  <p className="mr-2">Beneficiary:</p>
  <Address address={proposal.beneficiary} />
</div>
    <p className="text-gray-600 mb-8" >Donations: {parseFloat(proposal.donations).toFixed(2)/ 1000000000000000000} ETH</p>
    <input className="w-48 px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      placeholder="ETH Donation"
      value={donation}
      onChange={e => setdonation(e.target.value)}
    />
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row space-x-4">
  <button 
    className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm transition duration-200 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 mb-4"
    onClick={handleDonate}
  >
    Donate
  </button>
</div>
      </div>
    </div>
  </div>
</div>
))}
  </> 
  );
      };
    

export default Test2;
