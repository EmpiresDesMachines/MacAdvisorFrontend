import { Alert, AlertTitle } from "../ui/alert"

type AuthErrorProps = {
  error: string
  text?: string
}
export const FormError = ({ error = "", text = "" }: AuthErrorProps) => {
  return (
    error && (
      <Alert variant="destructive" className="my-5">
        <AlertTitle className="text-center">
          {text || `Ошибка: ${error}`}
        </AlertTitle>
      </Alert>
    )
  )
}
