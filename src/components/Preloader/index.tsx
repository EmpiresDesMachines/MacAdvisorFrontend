import { Skeleton } from "../ui/skeleton"

export const Preloader = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <Skeleton className="flex h-4 w-[360px] mb-4" />
      <div className="flex lg:gap-8">
        <section className="flex-1 max-lg:hidden">
          <Skeleton className="flex h-120" />
        </section>
        <section className="flex-1">
          <Skeleton className="flex h-4 w-[300px] mb-4" />
          <Skeleton className="flex h-12 mb-4" />
          <Skeleton className="hidden max-lg:flex  h-[200px] w-[200px] mb-4" />
          <Skeleton className="flex h-4 w-[200px] mb-4" />
          <Skeleton className="flex h-24 mb-4" />
          <Skeleton className="flex h-4 w-[200px] mb-4" />
          <Skeleton className="flex h-24 mb-4" />
          <Skeleton className="flex h-24 mb-4" />
        </section>
      </div>
    </div>
  )
}
