import PostsLoadingBar from '@/app/components/PostsLoadingBar'

export default function Loading() {
  return (
    <>
      <PostsLoadingBar />
      <article className="py-32 px-4 relative min-h-screen bg-[--bg] text-[--ink]">
        <div className="max-w-[800px] mx-auto animate-pulse">
          <div className="h-4 w-28 rounded bg-[--bg-2] mb-8" />

          <div className="h-6 w-32 rounded-full bg-[--bg-2] mb-4" />
          <div className="h-12 w-full rounded bg-[--bg-2] mb-3" />
          <div className="h-12 w-2/3 rounded bg-[--bg-2] mb-6" />
          <div className="h-5 w-1/2 rounded bg-[--bg-2] mb-10" />

          <div className="h-[400px] w-full rounded-2xl bg-[--bg-2] mb-10" />

          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-[--bg-2]" />
            <div className="h-4 w-full rounded bg-[--bg-2]" />
            <div className="h-4 w-5/6 rounded bg-[--bg-2]" />
            <div className="h-4 w-full rounded bg-[--bg-2]" />
            <div className="h-4 w-3/4 rounded bg-[--bg-2]" />
          </div>
        </div>
      </article>
    </>
  )
}
