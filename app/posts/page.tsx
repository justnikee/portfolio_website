import React from "react";

const Posts = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 pt-[120px]">
      <div className="text-center">
        <span className="eyebrow mb-6 block">Posts</span>
        <h1 className="font-[MainFont] text-5xl uppercase leading-[0.9] sm:text-8xl">
          Still <span className="accent-text">simmering.</span>
        </h1>
        <p className="m-auto mt-6 max-w-md font-[outfit] text-[--ink-soft]">
          Notes and write-ups are in the oven. Check back soon.
        </p>
      </div>
    </main>
  );
};

export default Posts;
