import fs from 'fs'
import test from 'tape'
import testdouble from 'testdouble'
import util from 'util'
import Account from '../lib/account'

// Dynamic database key
let username

// Override 'Account.databasePath'
const databasePath = 'data/test.json'
testdouble.replace(Account, 'databasePath', databasePath)

// Override 'Account.fetchFriends'
const fakeFriends = {
  previous_cursor: 0,
  ids: [657693, 183709371, 7588892, 38895958, 22891211],
  previous_cursor_str: '0',
  next_cursor: 0,
  next_cursor_str: '0'
}
testdouble.replace(Account, 'fetchFriends', () => fakeFriends)

test('Account.constructor', t => {
  t.plan(2)
  function beforeEach () {
    fs.unlinkSync(databasePath)
    fs.writeFileSync(databasePath, '')
    username = Date.now()
  }
  beforeEach()
  t.deepEqual(
    (Account(username), JSON.parse(fs.readFileSync(databasePath, 'utf8'))),
    { [username]: { friends: fakeFriends.ids } },
    'write to database'
  )
  beforeEach()
  t.deepEqual(
    Account(username).valueOf(),
    { friends: fakeFriends.ids },
    'read from database'
  )
})

test('Account.inspect', t => {
  t.plan(1)
  t.equal(
    util.inspect(Account(username)),
    JSON.stringify({ [username]: { friends: fakeFriends.ids } }),
    'valid'
  )
})
