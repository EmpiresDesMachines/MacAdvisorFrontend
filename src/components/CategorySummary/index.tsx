import React from "react"
import type { accentColor, Product, ProductCategory } from "@/app/types"
import { prepareGlobalCategoryParams, productionStatusColor } from "./utils"
import { CategorySummaryRow } from "../CategorySummaryRow"
import { CategorySummaryBadge } from "../CategorySummaryBadge"
import { Link } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6"

type Props = {
  data: Product[]
  category: ProductCategory
}
export const CategorySummary = React.memo(({ data, category }: Props) => {
  const {
    lastRelease,
    daysSinceLastRelease,
    releases,
    lastReleaseDate,
    imgPath,
    averageTimeBetweenReleases,
    maxTimeBetweenReleases,
    minTimeBetweenReleases,
    approximateProgress,
  } = React.useMemo(() => prepareGlobalCategoryParams(data), [data])

  const prepareRecentReleases = releases.map(
    ({ id, intro, timeUntilRelease }) => ({
      id,
      date: intro,
      value: timeUntilRelease,
      progress: (timeUntilRelease / maxTimeBetweenReleases) * 100,
    }),
  )
  const color = productionStatusColor(approximateProgress)

  return (
    <div>
      <div className="flex items-center gap-6 pb-8 border-b">
        <img src={imgPath} alt={category} className="w-[300px] h-[180px] p-2" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category}
            <Link
              to={`/products/${encodeURIComponent(category)}`}
              className="text-xl font-normal ml-4 duration-300 hover:text-[#426694]"
            >
              <FaArrowRightLong className="inline-block animate-bounce " />{" "}
              перейти к каталогу
            </Link>
          </h1>
          <div className="my-2">
            <CategorySummaryBadge color={color} />
          </div>
          <p className="text-gray-600 mb-1 text-sm md:text-base">
            <strong>{category}</strong> — мощная линейка устройств, созданная на
            основе передовых технологий и современных инженерных решений.
            Устройства этой серии сочетают в себе высокопроизводительные
            процессоры, быстрые SSD‑накопители и эффективные системы охлаждения,
            обеспечивая плавную и надежную работу как при выполнении
            повседневных задач, так и при решении требовательных
            профессиональных сценариев. Благодаря тесной интеграции аппаратного
            и программного обеспечения эта линейка обеспечивает отличное время
            автономной работы, надежную защиту и продуманный пользовательский
            опыт, идеально подходящий для работы, творчества и развлечений.
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <CategorySummaryRow
          title={"Days since last release"}
          color={color}
          data={[
            {
              id: lastRelease.id,
              date: lastReleaseDate,
              progress: (daysSinceLastRelease / maxTimeBetweenReleases) * 100,
              value: daysSinceLastRelease,
            },
          ]}
        />
        <CategorySummaryRow
          title={"Average"}
          data={[
            {
              id: "Average",
              progress:
                (averageTimeBetweenReleases / maxTimeBetweenReleases) * 100,
              value: averageTimeBetweenReleases,
            },
          ]}
        />
        <CategorySummaryRow
          title={"Recent releases "}
          data={prepareRecentReleases}
        />
      </div>
    </div>
  )
})
