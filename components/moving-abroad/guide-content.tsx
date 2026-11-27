import Link from 'next/link'

import { paragraphs, type GuideBody, type GuideSource, type GuideTable } from '../../content/student-guides/model'

export const guideSectionHeading = 'scroll-mt-24 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl'
const sourceLink = 'rounded-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

function SourceLink({ source }: { source: GuideSource }) {
  return source.href.startsWith('/')
    ? <Link href={source.href} className={sourceLink}>{source.label}</Link>
    : <a href={source.href} className={sourceLink}>{source.label}</a>
}

function References({ sources, ids }: { sources: GuideSource[]; ids: string[] }) {
  return (
    <ul aria-label="References for this section" className="space-y-1 border-l-2 border-primary/25 pl-4 text-sm leading-6">
      {ids.map((id) => {
        const source = sources.find((item) => item.id === id)
        return source ? <li key={id}><SourceLink source={source} /></li> : null
      })}
    </ul>
  )
}

function ComparisonTable({ table, id }: { table: GuideTable; id: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground sm:hidden">Scroll the table to see all columns.</p>
      <div
        role="region"
        aria-labelledby={id}
        tabIndex={0}
        className="max-w-full overflow-x-auto rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm leading-6">
          <caption id={id} className="bg-muted p-4 text-left text-base font-bold">{table.caption}</caption>
          <thead className="border-y border-border bg-muted/60">
            <tr>{table.columns.map((column) => <th key={column} scope="col" className="min-w-32 px-4 py-3 align-top">{column}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map(([label, ...cells]) => (
              <tr key={label} className="border-border even:bg-muted/40 [&+tr]:border-t">
                <th scope="row" className="px-4 py-3 align-top font-semibold">{label}</th>
                {cells.map((cell, index) => <td key={table.columns[index + 1]} className="px-4 py-3 align-top">{cell}</td>)}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function GuideContents({ body, id }: { body: GuideBody; id: string }) {
  const links = [
    ...body.sections.map(({ id, title }) => ({ id, title })),
    { id: 'checklist', title: 'Checklist' },
    { id: 'frequently-asked-questions', title: 'Frequently asked questions' },
    { id: 'sources', title: 'Sources' },
  ]
  return (
    <nav aria-labelledby={id} className="rounded-xl border border-border px-5 py-4">
      <h2 id={id} className="font-bold text-foreground">In this guide</h2>
      <ul className="mt-2">
        {links.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} className={`block rounded-sm py-2 text-sm leading-snug ${sourceLink}`}>{link.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function GuideContent({ body }: { body: GuideBody }) {
  return (
    <>
      <div className="space-y-4 text-lg leading-8 text-foreground">
        {paragraphs(body.introduction).map((part) => <p key={part}>{part}</p>)}
      </div>

      <section className="rounded-2xl border border-border bg-muted px-5 py-6 sm:px-7">
        <h2 className="text-xl font-extrabold">Key takeaways</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
          {body.takeaways.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <div className="lg:hidden"><GuideContents body={body} id="guide-contents-mobile" /></div>

      {body.sections.map((section) => (
        <section key={section.id} className="min-w-0 space-y-4">
          <h2 id={section.id} tabIndex={-1} className={guideSectionHeading}>{section.title}</h2>
          {paragraphs(section.prose).map((part) => <p key={part} className="leading-8">{part}</p>)}
          {section.points?.length ? <ul className="list-disc space-y-2 pl-5 leading-7">{section.points.map((item) => <li key={item}>{item}</li>)}</ul> : null}
          {section.steps?.length ? <ol className="list-decimal space-y-2 pl-5 leading-7">{section.steps.map((item) => <li key={item}>{item}</li>)}</ol> : null}
          {section.worksheet ? (
            <a
              download={section.worksheet.filename}
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(section.worksheet.text)}`}
              className={`inline-flex min-h-11 items-center ${sourceLink}`}
            >
              {section.worksheet.label}
            </a>
          ) : null}
          {section.table ? <ComparisonTable table={section.table} id={`${section.id}-table`} /> : null}
          {section.sources?.length ? <References sources={body.sources} ids={section.sources} /> : null}
        </section>
      ))}

      <section className="space-y-4 rounded-2xl border border-border bg-muted px-5 py-6 sm:px-7">
        <h2 id="checklist" tabIndex={-1} className={guideSectionHeading}>Checklist</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7">
          {body.checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="space-y-5">
        <h2 id="frequently-asked-questions" tabIndex={-1} className={guideSectionHeading}>Frequently asked questions</h2>
        {body.faq.map(({ question, answer, sources }) => (
          <div key={question} className="space-y-2 border-t border-border pt-4">
            <h3 className="text-lg font-bold leading-snug">{question}</h3>
            <p className="leading-8">{answer}</p>
            {sources?.length ? <References sources={body.sources} ids={sources} /> : null}
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 id="sources" tabIndex={-1} className={guideSectionHeading}>Sources</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7">
          {body.sources.map((source) => <li key={source.id}><SourceLink source={source} /></li>)}
        </ul>
      </section>
    </>
  )
}
