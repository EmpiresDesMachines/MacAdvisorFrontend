import type { User } from "../types"
import { api } from "./api"

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      { token: string; user: User },
      { email: string; password: string }
    >({
      query: userData => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<User, { email: string; password: string }>({
      query: userData => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi

export const {
  endpoints: { login, register },
} = authApi
