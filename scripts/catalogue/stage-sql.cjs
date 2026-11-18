/* eslint-disable @typescript-eslint/no-require-imports -- Node command-line tool. */
const fs = require('node:fs')
const { execFileSync } = require('node:child_process')
const { createHash } = require('node:crypto')

const path = process.argv[2]
if (!path) throw new Error('Usage: node scripts/catalogue/stage-sql.cjs SNAPSHOT')
execFileSync(process.execPath, ['scripts/catalogue/verify-snapshot.cjs', path], { stdio: ['ignore', 'ignore', 'inherit'] })
const snapshot = JSON.parse(fs.readFileSync(path, 'utf8'))
const commit = snapshot.report.commit
if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('Invalid source commit')
const sections = {}
for (const [name, size] of Object.entries({
  rawAdapterOutput: 10, publishedOutput: 10, sourceRoomMappings: 100, mediaReferences: 160,
})) {
  for (let offset = 0; offset < snapshot[name].length; offset += size) {
    sections[name + '_' + offset] = snapshot[name].slice(offset, offset + size)
  }
}
for (const [key, value] of Object.entries(snapshot.source)) sections['source_' + key] = value
sections.report_all = snapshot.report
sections.researchEvidence_all = snapshot.researchEvidence
sections.sourceFiles = snapshot.sourceFiles
sections.trackedAssets = snapshot.trackedAssets
const digest = createHash('sha256').update(JSON.stringify(sections)).digest('hex')
sections.digest = digest
const literal = JSON.stringify(sections).replaceAll("'", "''")
console.log("set standard_conforming_strings = on;")
console.log("begin;")
console.log("select pg_advisory_xact_lock(hashtext('hearthaway catalogue import'));")
console.log("insert into catalogue_staging.source_snapshots(source_commit,snapshot) values ('" + commit + "', '" + literal + "'::jsonb) on conflict do nothing;")
console.log("do $$ begin if not exists(select from catalogue_staging.source_snapshots where source_commit='" + commit +
  "' and snapshot->>'digest'='" + digest + "') then raise exception 'Snapshot differs from the existing version'; end if; end $$;")
console.log("commit;")
