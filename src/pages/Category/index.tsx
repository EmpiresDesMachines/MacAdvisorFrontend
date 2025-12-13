import React from "react"
import cn from "classnames"
import { useGetProductsByCategoryQuery } from "@/app/services/productsApi"
import type { ProductCategory } from "@/app/types"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { FilterSelect } from "@/components/FilterSelect"

import { GridToggleControl } from "@/components/GridToggleControl"
import { CategoryItem } from "@/components/CategoryItem"
import { CategoryItemPreloader } from "@/components/CategoryItemPreloader"

export const LIMIT_OPTIONS = [10, 20, 30] as const

export const categories: ProductCategory[] = [
  "MacBook",
  "MacBook Air",
  "MacBook Pro",
  "iMac",
  "Mac Pro",
  "Mac Mini",
  "Other",
] as const

export type PC = (typeof categories)[number]

export const Category = () => {
  const navigate = useNavigate()
  const { category } = useParams<{ category: ProductCategory }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = searchParams.get("page") ?? "1"
  const currentLimit = searchParams.get("limit") ?? "10"

  const { data, isError, isLoading } = useGetProductsByCategoryQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    category: category!,
    page: currentPage,
    limit: currentLimit,
  })
  // console.log(data)

  const pagesArray = Array.from(
    { length: data?.totalPages ?? 0 },
    (_, idx) => ++idx,
  )

  const goToPage = (page: string) => {
    setSearchParams(
      {
        page: page,
        limit: currentLimit,
      },
      { replace: true },
    )
  }

  const changeLimit = (limit: string) => {
    setSearchParams(
      {
        page: "1", // при смене лимита вернуться на первую страницу
        limit: limit,
      },
      { replace: true },
    )
  }

  const changeCategory = (category: string) => {
    //                    category: typeof categories[number]
    navigate(`/products/${encodeURIComponent(category)}`, { replace: true })
  }

  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const changeGrid = () => {
    setViewMode(prev => (prev === "grid" ? "list" : "grid"))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 flex-wrap">
          <FilterSelect
            title="Категория:"
            values={categories}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            defaultValue={category!}
            changeFunction={changeCategory}
          />
          <FilterSelect
            title="Страница:"
            values={pagesArray}
            defaultValue={currentPage}
            changeFunction={goToPage}
          />
          <FilterSelect
            title="Элементов на странице:"
            values={LIMIT_OPTIONS}
            defaultValue={currentLimit}
            changeFunction={changeLimit}
          />
        </div>
        <GridToggleControl viewMode={viewMode} changeGrid={changeGrid} />
      </div>

      {isLoading && (
        // <div className="text-center py-12">
        //   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        // </div>

        <ul
          className={cn({
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6":
              viewMode === "grid",
            "space-y-4": viewMode !== "grid",
          })}
        >
          {new Array(8).fill("").map((_, idx) => (
            <CategoryItemPreloader key={idx} viewMode={viewMode} />
          ))}
        </ul>
      )}

      {isError && (
        <div className="text-center py-12 text-destructive">
          Ошибка загрузки товаров
        </div>
      )}

      {data && (
        <ul
          className={cn({
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6":
              viewMode === "grid",
            "space-y-4": viewMode !== "grid",
          })}
        >
          {data.data.map(product => (
            <CategoryItem
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
