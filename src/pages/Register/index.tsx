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
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "@/app/services/authApi"
import { hasErrorField } from "@/utils/has-error-field"
import { FormError } from "@/components/FormError"
import { AuthSuccess } from "@/components/AuthSuccess"

const registerSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),
  password: z.string().min(1, "Пароль обязателен").min(6, "Минимум 6 символов"),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export const Register = () => {
  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = React.useState("")
  const [successEmail, setSuccessEmail] = React.useState<string>("")
  const navigate = useNavigate()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register(data)
        .unwrap()
        .then(() => {
          setSuccessEmail(data.email)
        })
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.message)
      }
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Регистрация</CardTitle>
        <CardDescription>
          Введите email и пароль для регистрации
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
                  <FormLabel>Email</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              Зарегистрироваться
            </Button>
          </form>
        </Form>

        <FormError error={error} text="Ошибка при регистрации." />
        <AuthSuccess email={successEmail} />

        <div className="text-center pt-4 border-t border-gray-200 space-y-2">
          <p className="text-sm text-gray-600">Уже есть аккаунт?</p>

          <Button className="w-full" asChild>
            <Link
              to="/auth/login"
              // className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-md transition-all duration-200 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
              className="block w-full"
            >
              Войдите
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
