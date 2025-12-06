import { useAppSelector } from "@/app/hooks"
import { isAuthenticatedSelector } from "@/features/user/userSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  redirectTo?: string
}

export const useAuthRedirect = ({ redirectTo = "/auth/login" }: Props) => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo)
    }
  }, [isAuthenticated])
}
