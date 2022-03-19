import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPageWithAuth } from "./_app";

const Home: NextPageWithAuth = () => {
  const { status } = useSession();
  const router = useRouter();
  console.log(status);
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/places");
    }
  }, [status, router]);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Head>
        <title>HaveBeen</title>
        <meta name="description" content="Made by Odysseas Papadimas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button
        className="bg-white p-4 text-black rounded-md text-lg font-semibold"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/places",
          })
        }
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Home;
