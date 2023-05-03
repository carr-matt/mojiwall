import { type NextPage } from "next";
import Head from "next/head";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>MojiWall · Post</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="flex border-b border-slate-600 p-4">Post View</div>
      </main>
    </>
  );
};

export default SinglePostPage;
