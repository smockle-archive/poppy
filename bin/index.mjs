#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import Friends from '../lib/friends'

// TODO: Replace this when `import.meta` is accepted: https://github.com/tc39/proposal-import-meta
// See also: https://github.com/standard-things/esm/issues/52
const dirname = __dirname

const username = process.argv.slice(2)[0]

function getVersion () {
  const filename = path.resolve(dirname, '../package.json')
  const raw = fs.readFileSync(filename, 'utf8')
  if (!raw) {
    return
  }
  const packageInfo = JSON.parse(raw)
  return packageInfo.version
}

if (!username) {
  console.log(`poppy
v${getVersion()}
Discover popular Twitter accounts
Usage:
  $ poppy username
Example:
  $ poppy "smockled"`)
} else {
  const friends = Friends(username)
  console.log(friends)
}
