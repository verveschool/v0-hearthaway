"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Search } from "lucide-react"

import type { MovingAbroadArticle } from "@/lib/moving-abroad-data"

interface ResourcePublicationProps {
  articles: MovingAbroadArticle[]
}

export function ResourcePublication({ articles }: ResourcePublicationProps) {
  const [query, setQuery] = useState("")
  const [activeTopic, setActiveTopic] = useState("All")

  const topics = useMemo(() => {
    const seen = new Set<string>()

    for (const article of articles) {
      for (const tag of article.tags) {
        seen.add(tag)
      }
    }

    return ["All", ...seen]
  }, [articles])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return articles.filter((article) => {
      const matchesTopic = activeTopic === "All" || article.tags.includes(activeTopic)
      const searchableText = [article.title, article.description, ...article.tags]
        .join(" ")
        .toLowerCase()
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery)

      return matchesTopic && matchesQuery
    })
  }, [activeTopic, articles, query])

  return (
    <div className="mx-auto w-full max-w-[920px]">
      <header className="border-b border-border/70 pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Resources
          </h1>
          <label className="group flex w-full items-center gap-3 border-b border-border pb-3 text-muted-foreground transition-colors focus-within:border-primary md:max-w-[320px]">
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only">Search resources</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources"
              type="search"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
            />
          </label>
        </div>

        <nav aria-label="Filter resources by topic" className="mt-8 -mb-px overflow-x-auto">
          <div className="flex min-w-max items-center gap-6">
            {topics.map((topic) => {
              const isActive = activeTopic === topic

              return (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTopic(topic)}
                  className={`border-b-2 pb-3 text-sm transition-colors ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {topic}
                </button>
              )
            })}
          </div>
        </nav>
      </header>

      <section aria-live="polite" aria-label="Resource articles">
        {filteredArticles.length > 0 ? (
          <div>
            {filteredArticles.map((article) => (
              <article key={article.slug} className="border-b border-border/70 py-8 first:pt-10 last:border-b-0">
                <div className="flex items-start gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                      <span>{article.readTime}</span>
                      <span aria-hidden="true">·</span>
                      <div className="flex flex-wrap gap-x-2 gap-y-1">
                        {article.tags.map((tag, index) => (
                          <span key={tag}>
                            {index > 0 ? " · " : ""}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                      <Link href={`/moving-abroad/${article.slug}`} className="transition-colors hover:text-primary">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                      {article.description}
                    </p>
                    <Link
                      href={`/moving-abroad/${article.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/75"
                    >
                      Read article
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>

                  {article.image ? (
                    <div className="hidden size-24 shrink-0 overflow-hidden rounded-md bg-muted sm:block">
                      <img src={article.image} alt="" className="size-full object-cover" />
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-b border-border/70 py-16 text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">No resources found</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Try a different search term or choose another topic to continue exploring the publication.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setActiveTopic("All")
              }}
              className="mt-6 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
