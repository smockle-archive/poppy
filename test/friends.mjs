import fs from 'fs'
import test from 'tape'
import testdouble from 'testdouble'
import Friends from '../lib/friends'
let username

// Override 'Friends.databasePath'
const databasePath = 'data/test.json'
testdouble.replace(Friends, 'databasePath', databasePath)

// Override 'Friends.fetch'
const fakeFriends = {
  previous_cursor: 0,
  ids: [657693, 183709371, 7588892, 38895958, 22891211],
  previous_cursor_str: '0',
  next_cursor: 0,
  next_cursor_str: '0'
}
testdouble.replace(Friends, 'fetch', () => fakeFriends)

function beforeEach () {
  fs.unlinkSync(databasePath)
  fs.writeFileSync(databasePath, '')
  username = Date.now()
}

test('Friends.constructor', t => {
  t.plan(2)

  beforeEach()
  t.deepEqual(
    (new Friends(username), JSON.parse(fs.readFileSync(databasePath, 'utf8'))),
    { [username]: fakeFriends },
    'write to database'
  )

  beforeEach()
  t.deepEqual(
    new Friends(username).valueOf(),
    fakeFriends,
    'read from database'
  )
})
