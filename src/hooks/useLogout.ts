import React from "react"
import { useAppDispatch } from "@/app/hooks"
import { logout } from "@/features/user/userSlice"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = React.useCallback(() => {
    dispatch(logout())
    navigate("/auth/login")
  }, [])

  return handleLogout
}
