import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { hasErrorField } from "@/utils/has-error-field"
import { FormError } from "@/components/FormError"
import { useUpdateProfileMutation } from "@/app/services/userApi"

const updateProfileSchema = z.object({
  email: z.string().email("Некорректный email").or(z.literal("")),
  password: z.string().min(6, "Минимум 6 символов").or(z.literal("")),
  username: z.string().min(6, "Минимум 6 символов").or(z.literal("")),
})

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>

export const UpdateProfileForm = () => {
  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  })

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const navigate = useNavigate()
  const [error, setError] = React.useState("")

  const onSubmit = async (data: UpdateProfileFormValues) => {
    setError("")

    // Убираем поля с пустой строкой, чтобы не отправлять их на сервер
    const payload = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== ""),
    )

    // Если пользователь вообще ничего не заполнил
    if (Object.keys(payload).length === 0) {
      setError("Empty Form!")
      return
    }

    try {
      await updateProfile(payload).unwrap()
      // navigate("/", { replace: true })
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.message)
      } else {
        setError("Не удалось изменить профиль. Попробуйте ещё раз.")
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-5 border-dashed">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Редактирование профиля</CardTitle>
        <CardDescription>
          Укажите поля, которые хотите изменить. Остальные можно оставить
          пустыми.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новый email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новое имя пользователя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новый пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Оставьте пустым, если не хотите менять"
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              Сохранить изменения
            </Button>
          </form>
        </Form>

        <FormError
          error={error}
          text="Не удалось сохранить изменения профиля."
        />
      </CardContent>
    </Card>
  )
}
