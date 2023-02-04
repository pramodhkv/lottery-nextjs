import { useAddress, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";
import LotteryDetails from "../components/LotteryDetails";

const Home: NextPage = () => {
  const address = useAddress();
  const { isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!address) return <Login />;

  return (
    <div className="bg-body text-white min-h-screen flex flex-col">
      <Head>
        <title>Lottery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div>
        <Toaster />
      </div>

      <LotteryDetails />
    </div>
  );
};

export default Home;
