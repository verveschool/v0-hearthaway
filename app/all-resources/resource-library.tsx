"use client"

import { useMemo, useRef } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import type { MovingAbroadArticle } from "@/lib/moving-abroad-data"

type ResourceSummary = Pick<MovingAbroadArticle, "title" | "description" | "category" | "tags" | "readTime"> & {
  href: string
}

const pageSize = 10
const controlClass = "min-h-11 rounded-lg border border-border bg-background text-sm focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40"
const tagClass = "max-w-full rounded-full border px-2.5 py-0.5 text-xs font-medium leading-4 wrap-anywhere"

export function ResourceLibrary({ articles }: { articles: ResourceSummary[] }) {
  const path = usePathname()
  const params = useSearchParams()
  const searchRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLHeadingElement>(null)
  const query = params.get("q") ?? ""
  const topics = useMemo(
    () => [...new Set(articles.flatMap((article) => article.tags))].sort((a, b) => a.localeCompare(b)),
    [articles],
  )
  const requestedTopic = params.get("topic") ?? ""
  const topic = topics.includes(requestedTopic) ? requestedTopic : ""

  const normalizedQuery = query.trim().toLowerCase()
  const filteredArticles = useMemo(
    () => articles.filter((article) =>
      (!topic || article.tags.includes(topic)) &&
      (!normalizedQuery || [article.title, article.description, ...article.tags]
        .join(" ").toLowerCase().includes(normalizedQuery)),
    ),
    [articles, normalizedQuery, topic],
  )

  const total = filteredArticles.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const pageParam = params.get("page") ?? ""
  const requestedPage = /^\d+$/.test(pageParam) ? Number(pageParam) : 1
  const page = Number.isSafeInteger(requestedPage) ? Math.min(pageCount, Math.max(1, requestedPage)) : 1
  const start = (page - 1) * pageSize
  const visibleArticles = filteredArticles.slice(start, start + pageSize)

  function updateFilters(nextQuery: string, nextTopic: string, mode: "pushState" | "replaceState") {
    const next = new URLSearchParams(window.location.search)
    const historyMethod = next.has("page") ? "pushState" : mode
    next.delete("page")
    if (nextQuery) next.set("q", nextQuery)
    else next.delete("q")
    if (nextTopic) next.set("topic", nextTopic)
    else next.delete("topic")
    window.history[historyMethod](null, "", next.size ? `?${next}` : path)
  }

  function pageLink(target: number, label: string, direction?: "previous" | "next") {
    const selected = !direction && target === page
    const className = buttonVariants({
      variant: selected ? "default" : "outline",
      className: "min-h-11 min-w-11 gap-1.5 px-2 font-semibold sm:px-2.5",
    })
    const content = (
      <>
        {direction === "previous" && <ChevronLeft aria-hidden="true" className="max-[360px]:hidden" />}
        {label}
        {direction === "next" && <ChevronRight aria-hidden="true" className="max-[360px]:hidden" />}
      </>
    )
    if (selected) {
      return (
        <span key={target} aria-current="page" className={className}>
          <span className="sr-only">Page </span>{content}
        </span>
      )
    }
    if (target < 1 || target > pageCount) {
      return <button key={direction} type="button" disabled className={className}>{content}</button>
    }

    const next = new URLSearchParams(params)
    next.set("page", String(target))
    const href = `${path}?${next}`

    return (
      <Link
        key={direction ?? target}
        href={href}
        prefetch={false}
        aria-label={direction ? undefined : `Page ${target}`}
        className={className}
        onNavigate={(event) => {
          event.preventDefault()
          window.history.pushState(null, "", href)
          resultsRef.current?.focus({ preventScroll: true })
          resultsRef.current?.scrollIntoView({ block: "start", behavior: "instant" })
        }}
      >
        {content}
      </Link>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted p-3 sm:flex-row sm:items-end sm:p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm font-semibold">
          <label htmlFor="resource-search">Search resources</label>
          <span className={`${controlClass} flex items-center gap-2 px-3`}>
            <Search aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <input
              id="resource-search"
              ref={searchRef}
              value={query}
              onChange={(event) => updateFilters(event.target.value, topic, "replaceState")}
              placeholder="Search by keyword"
              type="search"
              className="min-h-11 min-w-0 flex-1 bg-transparent text-base font-normal outline-none placeholder:text-muted-foreground sm:text-sm"
            />
          </span>
        </div>
        <div className="flex min-w-0 flex-col gap-1.5 text-sm font-semibold sm:w-56">
          <label htmlFor="resource-topic">Topic</label>
          <span className={`${controlClass} relative`}>
            <select
              id="resource-topic"
              value={topic}
              onChange={(event) => updateFilters(query, event.target.value, "pushState")}
              className="min-h-11 w-full appearance-none rounded-lg bg-background py-2 pr-9 pl-3 text-base font-normal outline-none sm:text-sm"
            >
              <option value="">All topics</option>
              {topics.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          </span>
        </div>
      </div>

      <section aria-labelledby="resource-results" className="mt-6">
        <div className="mb-2 flex min-h-11 flex-wrap items-center justify-between gap-x-3">
          <h2
            id="resource-results"
            ref={resultsRef}
            tabIndex={-1}
            className="scroll-mt-24 rounded-sm text-sm font-semibold text-muted-foreground focus:outline-2 focus:outline-offset-4 focus:outline-ring"
          >
            <span role="status">
              {total > 0 ? `Showing ${start + 1}–${start + visibleArticles.length} of ${total} ${total === 1 ? "resource" : "resources"}` : "0 resources"}
            </span>
          </h2>
          {(query || topic) && (
            <Button
              variant="link"
              type="button"
              className="min-h-11 px-2 font-semibold"
              onClick={() => {
                updateFilters("", "", "pushState")
                searchRef.current?.focus()
              }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {visibleArticles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleArticles.map((article) => (
              <article key={article.href} className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-4 transition-colors focus-within:border-primary/40 hover:border-primary/30 sm:p-5">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className={`${tagClass} border-primary/15 bg-primary/5 text-primary`}>{article.category}</span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                <h3 className="font-heading text-lg leading-snug font-bold tracking-tight wrap-anywhere sm:text-xl">
                  <Link
                    href={article.href}
                    prefetch={false}
                    className="flex min-h-11 items-start justify-between gap-3 rounded-sm py-1 text-card-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:text-primary/75"
                  >
                    <span className="min-w-0">{article.title}</span>
                    <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                  </Link>
                </h3>
                <p className="mb-4 text-sm leading-6 text-muted-foreground">{article.description}</p>
                <ul aria-label="Article topics" className="mt-auto flex flex-wrap gap-1.5">
                  {article.tags.filter((tag) => tag !== article.category).map((tag) => (
                    <li key={tag} className={`${tagClass} border-border bg-muted text-muted-foreground`}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-muted px-4 py-10 text-center">
            <h3 className="font-heading text-xl font-bold tracking-tight">No resources found</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Try a different keyword or select another topic.
            </p>
          </div>
        )}

        {pageCount > 1 && (
          <nav aria-label="Resource pagination" className="mt-6 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {pageLink(page - 1, "Previous", "previous")}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
              {Array.from({ length: pageCount }, (_, index) => pageLink(index + 1, String(index + 1)))}
            </div>
            {pageLink(page + 1, "Next", "next")}
          </nav>
        )}
      </section>
    </>
  )
}
