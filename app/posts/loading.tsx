import PostsLoadingBar from '@/app/components/PostsLoadingBar'

export default function Loading() {
  return (
    <>
      <PostsLoadingBar />
      <div className="py-32 px-4 relative min-h-screen bg-[--bg] text-[--ink]">
        <div className="max-w-[1300px] m-auto">
          <div className="mb-8 h-16 w-48 mx-auto rounded-full bg-[--bg-2] animate-pulse" />
          <div className="h-6 w-80 mx-auto rounded-full bg-[--bg-2] animate-pulse mb-12" />

          <div className="flex justify-center gap-3 flex-wrap mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-9 w-20 rounded-full bg-[--bg-2] animate-pulse" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-[--line] bg-[--bg-2]">
                <div className="h-48 bg-[--line] animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-[--line] animate-pulse" />
                  <div className="h-4 w-full rounded bg-[--line] animate-pulse" />
                  <div className="h-4 w-2/3 rounded bg-[--line] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
