import type { accentColor } from "@/app/types"
import { Link } from "react-router-dom"

type Data = {
  id: string
  date?: string
  progress: number
  value: number
}

type Color = accentColor
type Props = { title: string; color?: Color; data: Data[] }

export const CategorySummaryRow = ({ title, data, color }: Props) => {
  const formatDate = (date?: string) =>
    (date &&
      new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })) ??
    "-"
  const progressColor = color ?? "#426694"
  const textColor = color === "silver" ? "#101828" : (color ?? "#101828")

  return (
    <div className="release-row flex w-full pt-8 border-b">
      <h3 className="flex-1 heading text-gray-900 text-2xl font-bold">
        {title}
      </h3>
      <div className="progress-wrapper flex flex-1 flex-col">
        {data.map(({ id, date, progress, value }) => {
          const formattedDate = formatDate(date)
          return (
            <div
              className="flex flex-1 progress border-b last:border-b-0"
              key={id}
            >
              <div className="progress-wrapper w-4/5 flex flex-col  mr-2 pb-8">
                <div className="progress-date text-sm py-2">
                  {(date && (
                    <Link
                      className="border-b border-dashed border-gray-500"
                      to={`/products/catalog/${id}`}
                    >
                      {formattedDate}
                    </Link>
                  )) ??
                    formattedDate}
                </div>
                <div className="progress-graph bg-[#edf2f7] h-[10px] rounded-[10px] overflow-hidden">
                  <div
                    style={{
                      backgroundColor: progressColor,
                      width: `${String(progress)}%`,
                    }}
                    className="progress-graph-inner bg-[#426694] h-[10px] rounded-[10px]"
                  ></div>
                </div>
              </div>
              <div
                className="progress-days flex items-center justify-center pr-6 w-1/5 text-right text-2xl"
                style={{ color: textColor }}
              >
                {value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
