import { authApi } from "@/app/services/authApi"
import type { User } from "@/app/types"
import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"

type initialState = {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}
const initialState: initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
}
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      // ??
      state.user = null
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
        state.user = action.payload.user
      },
    )
  },
})

export const { logout, resetUser } = slice.actions

export default slice.reducer

export const userSelector = (state: RootState) => state.user.user

export const isAuthenticatedSelector = (state: RootState) =>
  state.user.isAuthenticated
