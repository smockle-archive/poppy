import fs from 'fs'
import test from 'tape'
import td from 'testdouble'
import util from 'util'
import Account from '../lib/account'

// Dynamic database key
let id

// Override 'Account.databasePath'
const databasePath = 'data/test.json'
td.replace(Account, 'databasePath', databasePath)

// Override 'Account.fetchSelf'
const fakeSelf = {
  name: 'Twitter API',
  id_str: '6253282',
  id: 6253282,
  friends_count: 31,
  screen_name: 'twitterapi'
}
td.replace(Account, 'fetchSelf', () => fakeSelf)

// Override 'Account.fetchFriends'
const fakeFriends = {
  previous_cursor: 0,
  ids: [657693, 183709371, 7588892, 38895958, 22891211],
  previous_cursor_str: '0',
  next_cursor: 0,
  next_cursor_str: '0'
}
td.replace(Account, 'fetchFriends', () => fakeFriends)

test('Account.constructor', t => {
  t.plan(2)
  function beforeEach () {
    fs.unlinkSync(databasePath)
    fs.writeFileSync(databasePath, '')
    id = Date.now()
  }
  beforeEach()
  t.deepEqual(
    (Account(id), JSON.parse(fs.readFileSync(databasePath, 'utf8'))),
    {
      [fakeSelf.id]: {
        username: fakeSelf.screen_name,
        friends: fakeFriends.ids
      }
    },
    'write to database'
  )
  beforeEach()
  t.deepEqual(
    Account(id).valueOf(),
    { username: fakeSelf.screen_name, friends: fakeFriends.ids },
    'read from database'
  )
})

test('Account.inspect', t => {
  t.plan(1)
  t.equal(
    util.inspect(Account(id)),
    JSON.stringify({
      [fakeSelf.id]: {
        username: fakeSelf.screen_name,
        friends: fakeFriends.ids
      }
    }),
    'valid'
  )
})
