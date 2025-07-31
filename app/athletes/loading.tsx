import { Skeleton } from "@/components/ui/skeleton"

export default function AthletesLoading() {
  return (
    <div className="min-h-screen pt-20 bg-slate-900">
      <section className="py-12 bg-slate-800/50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-slate-700" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-slate-700" />
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 shadow-lg h-fit sticky top-24">
            <Skeleton className="h-8 w-1/2 mb-6 bg-slate-700" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-slate-700" />
              <Skeleton className="h-10 w-full bg-slate-700" />
              <Skeleton className="h-10 w-full bg-slate-700" />
              <Skeleton className="h-10 w-full bg-slate-700" />
            </div>
          </div>

          {/* Athlete Cards Skeleton */}
          <div className="w-full md:w-3/4 lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg"
              >
                <Skeleton className="w-full h-48 bg-slate-700" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4 bg-slate-700" />
                  <Skeleton className="h-4 w-1/2 bg-slate-700" />
                  <Skeleton className="h-4 w-full bg-slate-700" />
                  <Skeleton className="h-4 w-2/3 bg-slate-700" />
                  <Skeleton className="h-10 w-full bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
