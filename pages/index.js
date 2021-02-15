import Head from "next/head";

import { fetchEntries } from "@utils/fetchFromServer";
import Link from "next/link";

import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>What's for dinner?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container px-3 max-w-md mx-auto">
          <Header />
          <div className="flex flex-col">
            <Link href={`/food-planner`}>Planera matschema</Link>
            <Link href={`/shopping-list`}>Inköpslista</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
