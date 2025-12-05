import { Brand } from "../Brand"
import { Profiler } from "../Profiler"

export const Header = () => {
  return (
    <>
      <div className="flex align-middle justify-between p-4 ">
        <Brand />
        <Profiler />
      </div>
    </>
  )
}
