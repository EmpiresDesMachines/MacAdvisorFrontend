import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { PiNumberSquareFourBold } from "react-icons/pi"
import { BsFillQuestionSquareFill } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const NotFound = () => {
  // return <div>NotFound</div>
  return (
    <Card className="w-full max-w-xl mx-auto border-dashed mt-30">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center justify-center">
          <PiNumberSquareFourBold size="3em" />
          <BsFillQuestionSquareFill size="3em" />
          <PiNumberSquareFourBold size="3em" />
        </CardTitle>
        <CardDescription className="text-xl sm:text-3xl text-bold text-center my-10">
          СТРАНИЦА НЕ НАЙДЕНА
        </CardDescription>
        <CardContent>
          <div className="flex items-center justify-center space-x-4">
            <Button asChild>
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
