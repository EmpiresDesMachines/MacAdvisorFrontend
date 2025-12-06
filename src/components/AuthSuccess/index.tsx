import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { FaCheckCircle } from "react-icons/fa"

type Props = {
  email: string
}
export const AuthSuccess = ({ email }: Props) => {
  return (
    email && (
      <div className="space-y-4 my-5">
        <Alert className="border-green-200 bg-green-50">
          <FaCheckCircle color="green" />
          <AlertTitle className="text-green-800">
            Регистрация выполнена!
          </AlertTitle>
          <AlertDescription className="text-green-700">
            <p>
              Пользователь <strong className="">{email}</strong> успешно создан.
              <br />
              Теперь вы можете войти в систему.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    )
  )
}
