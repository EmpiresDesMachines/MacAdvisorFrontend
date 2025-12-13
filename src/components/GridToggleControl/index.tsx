import { FaThLarge, FaThList } from "react-icons/fa"

type GridToggleControlProps = {
  viewMode: "grid" | "list"
  changeGrid: () => void
}
export const GridToggleControl = ({
  viewMode,
  changeGrid,
}: GridToggleControlProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden sm:block">
        Вид:
      </span>
      <div className="flex p-1 cursor-pointer" onClick={changeGrid}>
        {viewMode === "grid" ? (
          <FaThLarge
            size={"1.4em"}
            className="text-muted-foreground transition-colors hover:text-slate-800 dark:hover:text-slate-200 duration-200"
          />
        ) : (
          <FaThList
            size={"1.4em"}
            className="text-muted-foreground transition-colors hover:text-slate-800 dark:hover:text-slate-200 duration-200"
          />
        )}
      </div>
    </div>
  )
}
