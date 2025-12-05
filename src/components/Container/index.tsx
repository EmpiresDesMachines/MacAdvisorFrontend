type Props = {
  children: React.ReactNode
}
export const Container = ({ children }: Props) => {
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto min-h-screen">
      {children}
    </div>
  )
}
