export const guideTopics = [
  'Choosing housing',
  'Contracts and payments',
  'Safety and verification',
  'Before departure',
  'Arrival and settling in',
  'Student life',
  'Destination housing',
] as const

export type GuideTopic = (typeof guideTopics)[number]

export type GuideSource = {
  id: string
  label: string
  href: string
}

export type GuideTable = {
  caption: string
  columns: string[]
  rows: string[][]
}

export type GuideSection = {
  id: string
  title: string
  prose: string
  points?: string[]
  steps?: string[]
  table?: GuideTable
  sources?: string[]
}

export type GuideBody = {
  introduction: string
  takeaways: string[]
  sections: GuideSection[]
  checklist: string[]
  faq: { question: string; answer: string; sources?: string[] }[]
  sources: GuideSource[]
}

export type ReviewedGuide = {
  slug: string
  title: string
  description: string
  topic: GuideTopic
  reviewedOn: string
  related: string[]
  body: GuideBody
}

export function guideWordCount(body: GuideBody): number {
  const sections = body.sections.flatMap((section) => [
    section.title,
    section.prose,
    ...section.points ?? [],
    ...section.steps ?? [],
    ...section.table ? [section.table.caption, ...section.table.columns, ...section.table.rows.flat()] : [],
  ])
  return [
    body.introduction,
    ...body.takeaways,
    ...sections,
    ...body.checklist,
    ...body.faq.flatMap(({ question, answer }) => [question, answer]),
  ].join(' ').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0
}

export function paragraphs(prose: string): string[] {
  return prose.trim().split(/\n\s*\n/).map((part) => part.trim())
}
