import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { logout, userSelector } from "@/features/user/userSlice"
import { formatToClientDate } from "@/utils/format-to-client-date"
import { Separator } from "@radix-ui/react-separator"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"
import { Button } from "@/components/ui/button"
import { ProfileOptions } from "@/components/ProfileOptions"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showSettings, setShowSettings] = useState(false)

  const translate = {
    email: "почта",
    username: "имя пользователя",
    createdAt: "дата создания",
    updatedAt: "дата обновления",
  } as const

  const user = useAppSelector(userSelector)
  const profileLogout = () => {
    dispatch(logout())
    navigate("/auth/login")
  }

  useAuthRedirect({})

  const entries = Object.entries(user ?? {})
    .filter(([key]) => key !== "id")
    .map(([key, value]) => {
      const label = translate[key as keyof typeof translate]

      if (key === "createdAt" || key === "updatedAt") {
        return [label, formatToClientDate(value ?? "")]
      }

      return [label, value]
    })

  return (
    <>
      <Card className="w-full max-w-md mx-auto border-dashed">
        <CardHeader>
          <CardTitle className="text-xl">Профиль</CardTitle>
          <CardDescription>Ваши данные.</CardDescription>
        </CardHeader>
        <Separator className="mb-4" />

        <CardContent className="space-y-2">
          <div className="grid gap-2 text-sm">
            {entries.map(([key, value]) => (
              <div
                key={key}
                className="flex items-baseline justify-between rounded-md px-2 py-1 hover:bg-muted/60 transition-colors"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {key}
                </span>
                <span className="text-sm font-normal text-right max-w-[60%] break-words">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>

        <Button
          type="button"
          className="px-10 m-auto w-50"
          onClick={profileLogout}
          disabled={false}
        >
          Выйти из профиля
        </Button>
        <Button
          type="button"
          className="px-10 m-auto w-50"
          disabled={false}
          onClick={() => {
            setShowSettings(prev => !prev)
          }}
        >
          Управление профилем
        </Button>
      </Card>
      {showSettings && <ProfileOptions />}
    </>
  )
}
