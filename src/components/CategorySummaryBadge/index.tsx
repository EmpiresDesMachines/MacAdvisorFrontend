import type { accentColor } from "@/app/types"

type Props = { color: accentColor }

const textByColor: Record<accentColor, Record<"title" | "text", string>> = {
  green: { title: "Buy Now", text: "Just Updated" },
  silver: { title: "Neutral", text: "Mid-product Cycle" },
  orange: { title: "Caution", text: "Approaching End of Cycle" },
  red: { title: "High Caution", text: "Beyond Product Cycle" },
}

export const CategorySummaryBadge = ({ color }: Props) => {
  const { title, text } = textByColor[color]

  return (
    <span
      className="inline-block rounded-sm cursor-default text-xs"
      style={{
        border: `1px solid ${color}`,
      }}
    >
      <span className="inline-block p-1" style={{ backgroundColor: color }}>
        {title}
      </span>
      <span className="inline-block p-1">{text}</span>
    </span>
  )
}
