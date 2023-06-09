import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { TypeAnimation } from "react-type-animation";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const GreetingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Sign in with Github...",
        1800,
        "...and add to the wall!",
        3500,
        "",
        2000,
        "🤠  👻  👀  🌼  😻",
        2000,
        "❤️  🔥  💜  👽  🐸",
        2000,
        "🍿 💻 🔋 🪫 🔌",
        2000,
        "😀😃😆😂🤣",
        2000,
        "🥰 😍 🤩 😘 😗",
        2000,
        "🤔 🤨 😐 😑 😶",
        2000,
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      speed={45}
      deletionSpeed={85}
      omitDeletionAnimation={false}
      className="pl-3 pr-0 align-middle font-thin text-white"
    />
  );
};

const CreatePost = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: 56,
              height: 56,
            },
          },
        }}
      />
      <input
        placeholder="Add your emojis!"
        className="grow bg-transparent outline-none placeholder:font-mono placeholder:text-[#f472b6]"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })}>
          <PaperAirplaneIcon className="h-12 w-12 text-blue-200 shadow-md transition-all ease-in-out hover:h-14 hover:w-14 hover:text-fuchsia-400" />
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading)
    return (
      <div className="flex flex-grow items-center justify-center">
        <div className="animate-ping text-8xl">😃</div>
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex grow flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user is not loaded
  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="sticky top-0 z-40 flex rounded-b-md border border-violet-900 bg-indigo-950/25 p-4 shadow-xl backdrop-blur-xl">
        {!isSignedIn && (
          <div className="">
            <SignInButton mode="modal">
              <button className="rounded-full bg-[#1D9BF0] px-4 py-2 font-semibold text-white transition duration-200 ease-in hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Sign&nbsp;in
              </button>
            </SignInButton>
            <span className="text-2xl min-[405px]:text-3xl">
              <GreetingAnimation />
            </span>
          </div>
        )}
        {isSignedIn && <CreatePost />}
      </div>

      <Feed />
      <div className="sticky bottom-0 z-40 flex items-center justify-center rounded-t-md border border-sky-400 bg-[#1D9BF0]/75 px-4 py-2 text-xl backdrop-blur-md">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-bounce">😃</div>
          <div className="align-baseline font-mono text-base">MojiWall</div>
        </div>
        <div className="font-thin">&nbsp;·&nbsp;</div>
        <a href="https://github.com/carr-matt/mojiwall" target="_blank">
          <div className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <div className="align-baseline text-base">Github</div>
          </div>
        </a>
      </div>
    </PageLayout>
  );
};

export default Home;
