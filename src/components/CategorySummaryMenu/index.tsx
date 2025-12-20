import type { ProductCategory } from "@/app/types"

type Props = {
  onChangeCategory: (val: ProductCategory) => void
}
type MenuItem = {
  title: ProductCategory
  img: string
}

const menuCategories: MenuItem[] = [
  { title: "MacBook Air", img: "/images/macbook-air-15-2025-sky-blue.png" },
  { title: "MacBook Pro", img: "/images/macbook-pro-m3-14-2023-silver.jpg" },
  { title: "Mac Mini", img: "/images/mac-mini-m4-2024.png" },
  { title: "Mac Pro", img: "/images/apple-mac-pro-2023-rack.jpg" },
  { title: "iMac", img: "/images/imac-24-2024-m4-blue.png" },
  { title: "MacBook", img: "/images/apple-macbook-retina-2016.jpg" },
  { title: "Other", img: "/images/apple-mac-studio-2025.png" },
]

export const CategorySummaryMenu = ({ onChangeCategory }: Props) => {
  return (
    <ul className="menu flex my-8">
      {menuCategories.map(({ title: category, img }) => (
        <li
          className="menu-item flex-1 group p-8 border-r-1 last:border-r-0 cursor-pointer text-center m-0-auto"
          onClick={() => {
            onChangeCategory(category)
          }}
          key={category}
        >
          <img
            className="block w-[50px] h-[30px] mx-auto mb-4 transition-transform duration-300 group-hover:scale-125"
            src={img}
            alt={category}
          />
          {category}
        </li>
      ))}
    </ul>
  )
}
