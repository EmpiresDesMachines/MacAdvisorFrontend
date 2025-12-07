import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useDeleteProfileMutation } from "@/app/services/userApi"
import { useLogout } from "@/hooks/useLogout"
import { Link } from "react-router-dom"

export const ProfileOptions = () => {
  const [deleteProfile, { isLoading, isSuccess, isError }] =
    useDeleteProfileMutation()

  const logout = useLogout()
  const deleteAccount = async () => {
    try {
      await deleteProfile().unwrap()
      logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto mt-5 border-dashed shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Управление профилем</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator />

          {/* Danger zone */}
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-destructive">
                Danger zone
              </span>
              <span className="text-xs text-muted-foreground">
                Будьте осторожны: действия могут быть необратимы
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <Button
                asChild
                type="button"
                variant="secondary"
                className="w-full sm:flex-1"
              >
                <Link to="/user/profile/update">Редактировать профиль</Link>
              </Button>
              <Button
                onClick={() => void deleteAccount()}
                type="button"
                variant="destructive"
                className="w-full sm:flex-1"
              >
                Удалить профиль
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
