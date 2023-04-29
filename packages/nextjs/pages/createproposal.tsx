import { useState } from "react";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const CreateProposal: NextPage = () => {
  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("0");
  const [durationInDays, setDurationInDays] = useState("0");

  const { writeAsync: createProposal } = useScaffoldContractWrite({
    contractName: "GoBuidlMe",
    functionName: "createProposal",
    args: [
      proposalName,
      proposalDescription,
      beneficiary,
      NUMBER_REGEX.test(requestedAmount) ? ethers.utils.parseEther(requestedAmount) : undefined,
      // When you need to multiply by 10e18 and pass use parseEther if you need to pass value as it is use BigNumber.from
      // Please check ethers docs
      NUMBER_REGEX.test(durationInDays) ? ethers.BigNumber.from(durationInDays) : undefined,
    ],
  });

  const handleProposal = async () => {
    await createProposal();
  };

  return (
    <>
      <div className="flex flex-col items-center pt-10">
        <div className="flex flex-col items-start w-1/2">
          <label className="text-gray-600 font-medium mb-2">Proposal Name:</label>
          <input
            className="border border-gray-400 rounded-lg py-2 px-3 mb-4 w-full"
            type="text"
            placeholder="Write Your Proposal Name"
            onChange={e => setProposalName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-1/2">
          <label className="text-gray-600 font-medium mb-2">Proposal Description:</label>
          <textarea
            className="border border-gray-400 rounded-lg py-2 px-3 mb-4 w-full resize-none h-20 overflow-y-auto"
            placeholder="Write Your Proposal Description"
            onChange={e => setProposalDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-1/2">
          <label className="text-gray-600 font-medium mb-2">Beneficiary:</label>
          <input
            className="border border-gray-400 rounded-lg py-2 px-3 mb-4 w-full"
            type="text"
            placeholder="Write Your Beneficiary Address"
            onChange={e => setBeneficiary(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-1/2">
          <label className="text-gray-600 font-medium mb-2">Requested Amount in ETH:</label>
          <input
            value={requestedAmount}
            className="border border-gray-400 rounded-lg py-2 px-3 mb-4 w-full"
            placeholder="Write Your Requested Amount in ETH"
            onChange={e => setRequestedAmount(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-1/2">
          <label className="text-gray-600 font-medium mb-2">Duration in Days:</label>

          <input
            type="number"
            value={parseInt(durationInDays)}
            className="border border-gray-400 rounded-lg py-2 px-3 mb-4 w-full"
            placeholder="Write Your Proposal Duration in Days"
            onChange={e => setDurationInDays(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600"
          onClick={handleProposal}
        >
          Create Your Proposal
        </button>
        <div className="flex flex-col items-start w-1/2 items-center py-4"></div>
      </div>
    </>
  );
};

export default CreateProposal;
