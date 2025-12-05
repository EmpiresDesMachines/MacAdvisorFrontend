import { useAppSelector } from "@/app/hooks"
import {
  isAuthenticatedSelector,
  userSelector,
} from "@/features/user/userSlice"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link, useLocation } from "react-router-dom"

export const Profiler = () => {
  const { pathname } = useLocation()
  const isLoginPage = pathname.includes("login")

  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const user = useAppSelector(userSelector)

  {
    /* <span className="text-sm font-medium">Привет, User!</span> */
  }
  return (
    <div className="flex items-center gap-3">
      {!isAuthenticated ? (
        <>
          <Button
            className="transition-all duration-400 ease-in-out"
            variant={isLoginPage ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/auth/login">Войти</Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            className="transition-all duration-400 ease-in-out"
            variant={isLoginPage ? "ghost" : "default"}
            size="sm"
            asChild
          >
            <Link to="/auth/register">Регистрация</Link>
          </Button>
        </>
      ) : (
        <Link
          to="user/profile"
          className="
            group inline-flex items-center gap-2
            rounded-full border border-border
            bg-muted/70 px-3 py-1.5
            text-xs md:text-sm
            hover:bg-muted hover:border-primary/40
            transition-colors duration-200
          "
        >
          <div className="flex flex-col leading-tight text-left">
            <span className="font-medium text-foreground group-hover:text-primary">
              {user?.email}
            </span>
            <span className="text-[11px] text-muted-foreground">
              Перейти в профиль
            </span>
          </div>
        </Link>
      )}
    </div>
  )
}
