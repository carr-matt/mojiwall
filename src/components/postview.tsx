import type { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <>
      <div className="-z-1 h-1 w-full bg-gradient-to-r from-transparent via-indigo-900 to-transparent" />
      <div
        key={post.id}
        className="m-0 flex gap-3 rounded-md border border-purple-900 bg-indigo-950 p-4 shadow-sm transition hover:ease-in-out hover:md:scale-105"
      >
        <Link href={`/@${author.username}`}>
          <Image
            src={author.profileImageUrl}
            alt={`@${author.username}'s profile image`}
            className="h-14 w-14 rounded-full"
            width={56}
            height={56}
          />
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-2 text-slate-300">
            <Link href={`/@${author.username}`}>
              <span>@{author.username}</span>
            </Link>
            <Link href={`/post/${post.id}`}>
              <span className="font-thin">{` · ${dayjs(
                post.createdAt
              ).fromNow()}`}</span>
            </Link>
          </div>
          <span className="text-3xl">{post.content}</span>
        </div>
      </div>
      <div className="-z-1 h-1 w-full bg-gradient-to-r from-transparent via-indigo-900 to-transparent" />
    </>
  );
};
