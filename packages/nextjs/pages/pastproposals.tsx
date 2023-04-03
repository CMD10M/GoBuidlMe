import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber, useScaffoldEventHistory} from "~~/hooks/scaffold-eth";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const pastproposals : NextPage = ( ) => {


    const { data: events } = useScaffoldEventHistory({
        contractName: "GoBuidlMe",
        eventName: "ProposalCreated",
        fromBlock: 0,
        blockData: true,
        transactionData: true,
        receiptData: true,
      });

      const { data: donations } = useScaffoldEventHistory({
        contractName: "GoBuidlMe",
        eventName: "Donations",
        fromBlock: 0,
        blockData: true,
        transactionData: true,
        receiptData: true,
      });


      const [logs, setLogs] = useState([]);

      useEffect(() => {
        const newLogs = [];
        events.forEach((event, index) => {
          const proposalName = event.args[0];
          const proposalDesc = event.args[1];
          const beneficiary = event.args[2];
          const requestedAmount = event.args[3].toString() / 1000000000000000000;
          const futureDateEnd = new Date(event.args[4] * 1000);
          const futureDayEnd = futureDateEnd.getUTCDate();
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
          const futureMonthNameEnd = monthNames[futureDateEnd.getUTCMonth()];
          const futureYearEnd = futureDateEnd.getUTCFullYear();
          const futureHourEnd = futureDateEnd.getUTCHours();
          const futureMinuteEnd = futureDateEnd.getUTCMinutes();
    
          const log = `Proposal Name: ${proposalName}\nProposal Description: ${proposalDesc}\nBeneficiary: ${beneficiary}\nRequested Amount: ${requestedAmount}\nEnd Date: ${futureMonthNameEnd} ${futureDayEnd}, ${futureYearEnd} ${futureHourEnd}:${futureMinuteEnd}\n\n`;
          newLogs.push(log);
        });
    
        setLogs(newLogs);
      }, [events]);
      
    
return (
    <>
  <div className="h-screen flex flex-col items-center">
    <div className="bg-white rounded-lg shadow-md w-1/2 px-6 py-8 md:mx-4 mb-6 md:mb-0 text-center item-center overflow-auto">
      {logs.map((log, index) => (
        <div key={index}>
          {log.split('\n').map((line, index) => {
            const parts = line.split(': ');
            const key = parts[0];
            const value = parts[1];
            switch (key) {
              case 'Proposal Name':
                return <h2 className="text-2xl font-bold mb-6" key={index}>{key}: {value}</h2>;
              case 'Proposal Description':
                return <p className="text-gray-600 mb-4 whitespace-normal break-words" key={index}>{key}: {value}</p>;
              case 'Beneficiary':
                return <p className="mr-2" key={index}>{key}: {value}</p>;
              case 'Requested Amount':
                return <p className="text-gray-600 mb-4" key={index}>{key}: {value}</p>;
              case 'End Date':
                return <p className="text-gray-600 mb-4" key={index}>{key}: {value}</p>;
              default:
                return null;
            }
          })}
        </div>
      ))}
    </div>
  </div>
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