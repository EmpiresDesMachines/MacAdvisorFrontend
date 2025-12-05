import { Outlet, useLocation } from "react-router-dom"
import { Container } from "../Container"
import { Header } from "../Header"
import cn from "classnames"

export const Layout = () => {
  const { pathname } = useLocation()
  const flex = /(auth|user)/.test(pathname)
  return (
    <>
      <Container>
        <Header />
        <div
          className={cn({
            flex: flex,
            ["flex-1"]: true,
            ["flex-col"]: true,
            ["items-center"]: true,
            ["justify-center"]: true,
            ["p-4"]: true,
          })}
        >
          <Outlet />
        </div>
      </Container>
    </>
  )
}
