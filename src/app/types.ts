type IsoDateString = string

export type ProductCategory =
  | "MacBook"
  | "MacBook Air"
  | "MacBook Pro"
  | "iMac"
  | "Mac Pro"
  | "Mac Mini"
  | "Other"

export type Product = {
  id: string
  intro: IsoDateString
  disc: IsoDateString | null
  category: ProductCategory
  titles: string[]
  imgs: string[]
  family: string
  model: string
  cpus: string[]
  ram: string
  vram: string
  storage: string
  optical: string
  createdAt: IsoDateString
  updatedAt: IsoDateString
}
export type ProductData = {
  data: Product[]
  currentPage: number
  totalPages: number
  productCount: number
}

// export type User = Record<string, string>
export type User = {
  id: string
  email: string
  username: string | null
  createdAt: IsoDateString
  updatedAt: IsoDateString
}
