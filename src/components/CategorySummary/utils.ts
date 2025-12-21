import type { accentColor, Product, Release } from "@/app/types"

export const productionStatusColor = (value: number): accentColor => {
  const color =
    value <= 0.33
      ? "green"
      : value <= 0.66
        ? "silver"
        : value <= 0.99
          ? "orange"
          : "red"

  return color
}

export const extractTitle = (title: string) =>
  title.match(/(.+").*$/)?.[1].replace(/"/g, "") ?? title

export const prepareImgPath = (imgs: string[]) => {
  return `/images/${imgs[0].split("/").pop() ?? ""}`
}

export const removeTimeDuplicates = (products: Product[]) => {
  return products.reduce(
    (acc: Product[], product) =>
      acc[acc.length - 1]?.intro === product.intro
        ? acc
        : (acc.push(product), acc),
    [],
  )
}

export const differenceBetweenDates = (from: Date, to: Date) => {
  const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
  return Math.floor((Number(from) - Number(to)) / MILLISECONDS_IN_DAY)
}

export const prepareReleasesData = (data: Product[]) => {
  const result = []
  for (let i = 0; i < data.length - 1; i++) {
    const { titles, id, intro } = data[i]
    result.push({
      title: extractTitle(titles[0]),
      id,
      intro,
      timeUntilRelease: differenceBetweenDates(
        new Date(intro),
        new Date(data[i + 1].intro),
      ),
    })
  }
  return result
}

export const prepareGlobalCategoryParams = (data: Product[]) => {
  const releases: Release[] = prepareReleasesData(
    removeTimeDuplicates(data),
  ).slice(0, 10)

  const imgPath = prepareImgPath(data[0].imgs)

  const averageTimeBetweenReleases = Math.round(
    releases.reduce((acc, v) => acc + v.timeUntilRelease, 0) / releases.length,
  )
  const maxTimeBetweenReleases = Math.max.apply(
    null,
    releases.map(v => v.timeUntilRelease),
  )

  const minTimeBetweenReleases = Math.min(
    ...releases.map(v => v.timeUntilRelease),
  )

  const lastReleaseDate = data[0].intro

  const daysSinceLastRelease = differenceBetweenDates(
    new Date(),
    new Date(lastReleaseDate),
  )

  const approximateProgress = daysSinceLastRelease / averageTimeBetweenReleases

  return {
    lastRelease: releases[0],
    daysSinceLastRelease,
    releases: releases.slice(1),
    lastReleaseDate,
    imgPath,
    averageTimeBetweenReleases,
    maxTimeBetweenReleases,
    minTimeBetweenReleases,
    approximateProgress,
  }
}
