import type { User } from "../types"
import { api } from "./api"

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation<
      { user: User; token?: string },
      Partial<{ email: string; username: string; password: string }>
    >({
      query: userData => ({
        url: "/user/profile",
        method: "PATCH",
        body: userData,
      }),
    }),
    deleteProfile: builder.mutation<
      { success: boolean; message: string },
      void
    >({
      query: () => ({
        url: "/user/profile",
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = userApi

export const {
  endpoints: { getProfile, updateProfile, deleteProfile },
} = userApi
