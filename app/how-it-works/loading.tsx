import { Skeleton } from "@/components/ui/skeleton"

export default function HowItWorksLoading() {
  return (
    <div className="min-h-screen pt-20 bg-slate-900">
      <section className="py-12 bg-slate-800/50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-slate-700" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-slate-700" />
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative text-center">
                <Skeleton className="w-24 h-24 rounded-3xl mx-auto mb-6 bg-slate-700" />
                <Skeleton className="h-8 w-1/2 mx-auto mb-4 bg-slate-700" />
                <Skeleton className="h-6 w-3/4 mx-auto bg-slate-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
