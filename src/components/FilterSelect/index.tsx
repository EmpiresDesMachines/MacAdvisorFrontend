import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FilterSelectProps = {
  title: string
  defaultValue: string | number
  values: readonly (string | number)[]
  changeFunction: (val: string) => void
}
export const FilterSelect = ({
  title,
  defaultValue,
  values,
  changeFunction,
}: FilterSelectProps) => {
  return (
    <div className="filter-selector flex items-center">
      <span className="text-sm text-muted-foreground pr-2 cursor-default">
        {title}
      </span>
      <Select
        value={String(defaultValue)}
        onValueChange={value => {
          changeFunction(value)
        }}
      >
        <SelectTrigger className="w-auto">
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {values.map(limit => (
            <SelectItem key={limit} value={String(limit)}>
              {limit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
