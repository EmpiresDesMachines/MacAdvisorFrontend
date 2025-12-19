import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { useGetProductByIdQuery } from "@/app/services/productsApi"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { Preloader } from "@/components/Preloader/idex"

export const Product = () => {
  const navigate = useNavigate()
  const params = useParams<{ id?: string }>()
  const id = params.id ?? ""

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
  } = useGetProductByIdQuery({ id }, { skip: !id })

  if (!id) {
    navigate("/")
    // return (
    //   <div className="flex min-h-screen items-center justify-center">
    //     <p className="text-sm text-muted-foreground">
    //       Некорректный адрес товара.
    //     </p>
    //   </div>
    // )
  }

  if (isLoading || (!product && isFetching)) {
    return <Preloader />
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-destructive">
          Ошибка при загрузке данных о товаре.
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Товар не найден.</p>
      </div>
    )
  }

  const introYear = new Date(product.intro).getFullYear()
  const baseConfig = {
    cpu: product.cpus[0],
    title: product.titles[0],
  }

  const imgs = product.imgs.map(v => v.split("/").pop() ?? "")

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 lg:px-8">
      {/* breadcrumbs */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">
          <Link to="/">Mac</Link>
        </span>
        <span>/</span>
        <span>
          <Link to={`/products/${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
        </span>
        <span>/</span>
        <span className="truncate">{product.family}</span>
      </div>

      <Card className="border-none bg-background shadow-none">
        <CardContent className="flex lg:gap-8">
          <section className="space-y-4 flex-1 max-lg:hidden">
            <Card className="overflow-hidden border bg-card">
              <CardContent className="p-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {imgs.map((src: string, index: number) => (
                      <CarouselItem key={index}>
                        <AspectRatio ratio={4 / 3} className="bg-muted">
                          <img
                            src={"/images/" + src}
                            alt={`${product.family} — фото ${index + 1}`}
                            className="h-full w-full rounded-md object-contain"
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {imgs.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </>
                  )}
                </Carousel>
              </CardContent>
            </Card>

            {imgs.length > 1 && (
              <div className="flex gap-2">
                {imgs.map((src: string, index: number) => (
                  <div
                    key={index}
                    className="flex-1 overflow-hidden rounded-md border bg-muted/40"
                  >
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={"/images/" + src}
                        alt={`${product.family} — превью ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="flex-1 space-y-6">
            <CardHeader className="p-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="uppercase tracking-wide">
                  {product.category}
                </Badge>
                <Badge variant="secondary">{introYear}</Badge>
                <Badge variant="secondary">{product.model}</Badge>
              </div>

              <CardTitle className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                {baseConfig.title}
              </CardTitle>

              <CardDescription className="text-base">
                <img
                  className="hidden max-lg:block "
                  src={`/images/${imgs[0]}`}
                  alt={`${product.family} — main image`}
                />
                Семейство: <span className="font-medium">{product.family}</span>
              </CardDescription>
            </CardHeader>

            <div className="grid grid-cols-2 gap-4 rounded-lg border bg-muted/40 p-4 text-sm md:grid-cols-3">
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Процессор
                </p>
                <p className="font-medium">{baseConfig.cpu.trim()}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Память
                </p>
                <p className="font-medium">{product.ram}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Графика
                </p>
                <p className="font-medium">{product.vram}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Накопитель
                </p>
                <p className="font-medium">{product.storage}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Оптический привод
                </p>
                <p className="font-medium">
                  {product.optical === "None" ? "Отсутствует" : product.optical}
                </p>
              </div>
            </div>

            <Separator />

            {product.titles.length > 1 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Конфигурации
                </h2>

                <Tabs defaultValue={product.titles[0]} className="w-full">
                  <TabsList className="w-full justify-start overflow-x-auto">
                    {product.titles.map((title: string) => (
                      <TabsTrigger
                        key={title}
                        value={title}
                        className="whitespace-nowrap"
                      >
                        {title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {product.titles.map((title: string, index: number) => {
                    const cpu = product.cpus[index] ?? product.cpus[0]
                    return (
                      <TabsContent key={title} value={title} className="pt-4">
                        <div className="space-y-2 rounded-lg border bg-muted/30 p-4 text-sm">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs uppercase text-muted-foreground">
                              Конфигурация
                            </span>
                            <span className="font-medium">{title}</span>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                              <p className="text-xs uppercase text-muted-foreground">
                                Процессор
                              </p>
                              <p className="font-medium">{cpu.trim()}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase text-muted-foreground">
                                Память / Накопитель
                              </p>
                              <p className="font-medium">
                                {product.ram} · {product.storage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    )
                  })}
                </Tabs>
              </div>
            )}
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
