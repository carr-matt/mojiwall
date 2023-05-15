import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <div className="z-20 flex h-full w-full flex-col md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};
