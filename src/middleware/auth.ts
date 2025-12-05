import { createListenerMiddleware } from "@reduxjs/toolkit"
import { authApi } from "@/app/services/authApi"
import { logout } from "@/features/user/userSlice"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,

  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
    }
  },
})

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    localStorage.removeItem("token")
  },
})
