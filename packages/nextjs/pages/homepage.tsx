import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite} from "~~/hooks/scaffold-eth";
import { useState } from "react";
import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const Homepage : NextPage = ( ) => {



  return (
    <>
<div className="bg-gray-100 h-screen flex flex-col py-24 items-center">
  <div className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
    <h1 className="text-5xl font-bold mb-6 text-blue-600">GoBuidlMe</h1>
    <p className="text-lg text-gray-700 mb-10">A platform for builders to request funding for their builds!</p>
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <Link href="/createproposal" className="btn btn-primary py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
        Create A Proposal
      </Link>
      <Link href="/donate" className="btn btn-secondary py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
        Donate To A Proposal
      </Link>
    </div>
  </div>
</div>


  </> 
  );
      };
    

export default Homepage;
