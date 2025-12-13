import cn from "classnames"
import type { Product } from "@/app/types"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

type Props = {
  product: Product
  viewMode: "grid" | "list"
}

export const CategoryItem = ({ product, viewMode }: Props) => {
  const src = `/images/${product.imgs[0].split("/").pop() ?? ""}`
  const link = `/products/catalog/${product.id}`
  return (
    <li
      className={cn({
        "bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow":
          viewMode === "grid",

        "bg-card border rounded-lg p-6 flex items-center justify-between hover:bg-accent/50 transition-colors":
          viewMode !== "grid",
      })}
    >
      <div className="cursor-default">
        <Link to={link}>
          <div className="pb-2 h-[160px] flex items-center">
            <img
              src={src}
              alt={product.model}
              className="select-none m-auto max-h-[160px] "
              draggable="false"
            />
          </div>
          <h3 className="font-semibold text-lg">{product.titles[0]}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          • year:{" "}
          {new Date(
            product.disc ?? (product.intro as unknown as Date),
          ).getFullYear()}
          <br />• ram: {product.ram} <br /> • storage: {product.storage} <br />
        </p>
      </div>
      {viewMode === "list" && (
        <Button variant="outline" size="sm" asChild>
          <Link to={link}>Подробнее</Link>
        </Button>
      )}
    </li>
  )
}
