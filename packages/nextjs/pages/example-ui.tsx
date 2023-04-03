import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite} from "~~/hooks/scaffold-eth";
import { useState } from "react";
import { ethers } from "ethers";

// const event=useScaffoldEventSubscriber({
//   contractName: "GoBuidlMe",
//   eventName: "ProposalCreated",
//   listener: (proposalName, proposalDescription, beneficiary, requested_amount, start, end) => {
//     console.log("ProposalCreated", proposalName, proposalDescription, beneficiary, requested_amount, start, end);
//   }
// });

// const { data: currentProposalName } = useScaffoldContractRead({
//   contractName: "GoBuidlMe",
//   functionName: "proposalName",
// });


const Donate: NextPage = () => {
  return (
    <>

        <div>test</div>

    </>
  );
};

export default Donate;
