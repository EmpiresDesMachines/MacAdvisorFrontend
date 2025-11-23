import type { Product, ProductCategory, ProductData } from "../types"
import { api } from "./api"

export const productsApi = api.injectEndpoints({
  endpoints: builder => ({
    getProductById: builder.query<Product, { id: string }>({
      query: ({ id }) => ({
        url: `/products/catalog/${id}`,
        method: "GET",
      }),
    }),

    getAllProducts: builder.query<
      ProductData,
      Partial<{ page: number | string; limit: number | string }> | undefined
    >({
      query: (params = {}) => {
        /*create query string for rtk <= 1.9
        //#1
        const query =
          "?" +
          new URLSearchParams(
            params as unknown as Record<string, string>,
          ).toString()

        //#2
        const query =
          "?" +
          Object.entries(params)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
            )
            .join("&")
        */

        return {
          // url: `/products?${query}`, // version <= 1.9
          url: `/products`,
          params,
          method: "GET",
        }
      },
    }),

    getProductsByCategory: builder.query<
      ProductData,
      {
        category: ProductCategory
        page?: number | string
        limit?: number | string
      }
    >({
      query: ({ category, page = 1, limit = 10 }) => ({
        url: `/products/${encodeURIComponent(category)}`,
        params: {
          page,
          limit,
        },
        method: "GET",
      }),
    }),
  }),
})

export const {
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useLazyGetProductsByCategoryQuery,
} = productsApi

export const {
  endpoints: { getProductById, getProductsByCategory, getAllProducts },
} = productsApi
