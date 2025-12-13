import cn from "classnames"
import { Skeleton } from "@/components/ui/skeleton"

type ViewMode = "grid" | "list"

type CategoryItemSkeletonProps = {
  viewMode: ViewMode
}
export const CategoryItemPreloader = ({
  viewMode,
}: CategoryItemSkeletonProps) => {
  return (
    <li
      className={cn({
        "bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow":
          viewMode === "grid",

        "bg-card border rounded-lg p-6 flex items-center justify-between hover:bg-accent/50 transition-colors":
          viewMode !== "grid",
      })}
    >
      <div className="cursor-default">
        <div className="pb-2 h-[160px] flex items-center">
          <Skeleton className="m-auto h-[140px] w-[140px] rounded-md" />
        </div>

        <Skeleton className="h-5 w-4/5 mb-2" />

        <div className="space-y-1">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>

      {viewMode === "list" && <Skeleton className="h-9 w-24 ml-4 shrink-0" />}
    </li>
  )
}
