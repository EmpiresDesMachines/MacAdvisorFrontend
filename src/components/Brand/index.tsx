import React from "react"
import { Link } from "react-router-dom"
import { GiAppleCore, GiShinyApple } from "react-icons/gi"

type BrandProps = {
  size?: string
}

export const Brand = ({ size = "3.5rem" }: BrandProps = {}) => {
  const [hover, setHover] = React.useState(false)

  return (
    <Link
      to="/"
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      className="inline-flex items-center gap-3 group transition-all duration-300 -hover:scale-105"
      aria-label="MacAdvisor — на главную"
    >
      <span className="inline-block" style={{ width: size, height: size }}>
        {hover ? (
          <GiAppleCore className="w-full h-full text-primary" />
        ) : (
          <GiShinyApple className="w-full h-full text-primary" />
        )}
      </span>

      <span className="font-bold text-3xl text-foreground group-hover:text-primary transition-colors">
        mac-advisor
      </span>
    </Link>
  )
}
