import React from "react"
import type { ProductCategory } from "@/app/types"
import { useGetProductsByCategoryQuery } from "@/app/services/productsApi"
import { CategorySummaryMenu } from "@/components/CategorySummaryMenu"

const categories: ProductCategory[] = [
  "MacBook Pro",
  "MacBook Air",
  "Mac Mini",
  "Mac Pro",
  "iMac",
  "MacBook",
  "Other",
] as const

type PC = (typeof categories)[number]

export type Releases = { title: string; id: string; lifetime: number }[]

export const Main = () => {
  const [category, setCategory] =
    React.useState<(typeof categories)[number]>("MacBook Air")

  const changeCategory = (val: ProductCategory) => {
    if (val !== category) {
      setCategory(val)
    }
    // setCategory(val)
  }

  const { data, isLoading, isError } = useGetProductsByCategoryQuery({
    category,
    limit: 20,
  })
  console.log("Main data:", data)

  if (isLoading) {
    return ""
  }
  if (isError) {
    return ""
  }
  if (data) {
    return (
      <>
        <CategorySummaryMenu onChangeCategory={changeCategory} />
      </>
    )
  }
}
