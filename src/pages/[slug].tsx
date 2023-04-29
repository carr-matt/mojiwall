import { type NextPage } from "next";
import Head from "next/head";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>MojiWall</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="flex border-b border-slate-600 p-4">Profile View</div>
      </main>
    </>
  );
};

export default ProfilePage;
