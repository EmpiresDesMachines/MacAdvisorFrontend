import React from "react"
import type { ProductCategory } from "@/app/types"
import { useGetProductsByCategoryQuery } from "@/app/services/productsApi"

const categories: ProductCategory[] = [
  "MacBook Pro",
  "MacBook Air",
  "Mac Mini",
  "Mac Pro",
  "iMac",
  "MacBook",
  "Other",
] as const

export type Releases = { title: string; id: string; lifetime: number }[]

export const Main = () => {
  const [category, setCategory] =
    React.useState<(typeof categories)[number]>("MacBook Air")

  const changeCategory = (val: ProductCategory) => {
    setCategory(val)
  }

  const { data, isLoading, isError } = useGetProductsByCategoryQuery({
    category,
    limit: 20,
  })

  if (isLoading) {
    return "loading"
  }
  if (isError) {
    return "error"
  }
  if (data) {
    return "success"
  }
}
