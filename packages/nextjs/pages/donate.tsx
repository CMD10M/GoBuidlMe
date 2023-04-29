import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite} from "~~/hooks/scaffold-eth";
import { useState } from "react";
import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const Test : NextPage = ( ) => {

// const event=useScaffoldEventSubscriber({
//   contractName: "GoBuidlMe",
//   eventName: "ProposalCreated",
//   listener: (proposalName, proposalDescription, beneficiary, requested_amount, start, end) => {
//     console.log("ProposalCreated", proposalName, proposalDescription, beneficiary, requested_amount, start, end);
//   }
// });

  const { data: currentProposalName } = useScaffoldContractRead({
    contractName: "GoBuidlMe",
    functionName: "proposalName",
  });
  const { data: currentProposalDescription } = useScaffoldContractRead({
    contractName: "GoBuidlMe",
    functionName: "proposalDescription",
  });
  const { data: currentrequested_amount } = useScaffoldContractRead({
    contractName: "GoBuidlMe",
    functionName: "requested_amount",
  });
  const ethRequestedAmount = parseFloat(currentrequested_amount)/1000000000000000000;

  const { data: currentdonations } = useScaffoldContractRead({
    contractName: "GoBuidlMe",
    functionName: "donations",
  });
  const ethDonations = parseFloat(currentdonations)/1000000000000000000;

  const { data: currentbeneficiary } = useScaffoldContractRead({
    contractName: "GoBuidlMe",
    functionName: "beneficiary",
  });
  const { data: currentStart } = useScaffoldContractRead({
    contractName: "GoBuidlMe",
    functionName: "start",
  });

  const { data: currentend } = useScaffoldContractRead({
    contractName: "GoBuidlMe",
    functionName: "end",
  });

  const futureDateStart = new Date(currentStart * 1000);
  const futureDateEnd = new Date(currentend * 1000);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const futureDayStart = futureDateStart.getUTCDate();
  const futureMonthNameStart = monthNames[futureDateStart.getUTCMonth()];
  const futureYearStart = futureDateStart.getUTCFullYear();
  const futureHourStart = futureDateStart.getUTCHours();
  const futureMinuteStart = futureDateStart.getUTCMinutes();
  const futureDayEnd = futureDateEnd.getUTCDate();
  const futureMonthNameEnd = monthNames[futureDateEnd.getUTCMonth()];
  const futureYearEnd = futureDateEnd.getUTCFullYear();
  const futureHourEnd = futureDateEnd.getUTCHours();
  const futureMinuteEnd = futureDateEnd.getUTCMinutes();

const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

console.log(currentTimeInSeconds);
console.log(currentend - currentTimeInSeconds);

const remaining_seconds = (currentend - currentTimeInSeconds) < 0 ? 0 : (currentend - currentTimeInSeconds);
const remaining_days = (remaining_seconds / 86400) < 0 ? 0 : (remaining_seconds / 86400).toFixed(0);
const remaining_hours = (remaining_seconds / 3600) < 0 ? 0 : (remaining_seconds / 3600).toFixed(0);
const remaining_minutes = (remaining_seconds / 60) < 0 ? 0 : (remaining_seconds / 60).toFixed(0);


  const{writeAsync: finalize} = useScaffoldContractWrite({
    contractName: "GoBuidlMe",
    functionName: "finalize",
  });
  
  const handlefinalyze = async () => {
    await finalize();
  }

  const{writeAsync: canceled} = useScaffoldContractWrite({
    contractName: "GoBuidlMe",
    functionName: "cancel",
  });
  
  const handlecancel = async () => {
    await canceled();
  }

  const [donation, setdonation] = useState("0");

  const{writeAsync: donated} = useScaffoldContractWrite({
    contractName: "GoBuidlMe",
    functionName: "donate",
    value: donation,
  });

  const handleDonate = async () => {
    await donated();
  };


  return (
    <>
<div className="max-w-6xl mx-auto py-12">
  <div className="bg-white rounded-lg shadow-md w-full px-6 py-8 md:mx-4 mb-6 md:mb-0 text-center overflow-auto">
    <h2 className="text-2xl font-bold mb-6">{currentProposalName}</h2>
    <p className="text-gray-600 mb-4 whitespace-normal break-words">Description: {currentProposalDescription}</p>
    <p className="text-gray-600 mb-4">Requested Amount: {ethRequestedAmount} ETH</p>
    <div className="flex items-center justify-center text-gray-600 mb-4">
  <p className="mr-2">Beneficiary:</p>
  <Address address={currentbeneficiary} />
</div>
    <p className="text-gray-600 mb-4">Time Remaining: {remaining_days} Days, {remaining_hours} Hours, {remaining_minutes} Minutes</p>
    <p className="text-gray-600 mb-8" >Donations: {ethDonations} ETH</p>
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
  <button 
    className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm transition duration-200 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 mb-4"
    onClick={handlecancel}
  >
    Refund
  </button>
</div>



        <div className="py-4">
          <button 
            className="flex-shrink-0 inline-flex items-center justify-center bg-blue-500 text-white font-medium py-1 px-3 rounded-lg transition duration-200 hover:bg-blue-600"
            onClick={handlefinalyze}
          >
            Finalize Proposal
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  </> 
  );
      };
    

export default Test;
