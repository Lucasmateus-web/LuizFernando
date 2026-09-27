export type Project = {
  src: string
  alt: string
  title: string
  category: string
  eyebrow: string
  summary: string
  description: string
  highlights: string[]
  imageWidth: number
  imageHeight: number
  objectPosition?: string
}

export type Training = {
  src: string
  alt: string
  title: string
  subtitle: string
  objectPosition: string
}

export type Partner = { name: string; logo: string }

export type Statistic = {
  icon: "award" | "users" | "building"
  value: number
  suffix: string
  label: string
}
