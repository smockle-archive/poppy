import Username from './username'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

function unimplemented (name) {
  return new Error(
    `${name} has not been implemented yet! PRs welcome: https://github.com/smockle/poppy`
  )
}

export default function Account (usernameOrId) {
  const _this = Object.create(Account.prototype)
  const self = Account.fetchSelf(Username(usernameOrId).valueOf())
  const friends = Account.fetchFriends(usernameOrId).ids
  _this.id = self.id
  _this.db = lowdb(new FileSync(Account.databasePath))
  _this.db.set(_this.id, { username: self.screen_name, friends }).write()
  return _this
}
// GET users/lookup
Account.fetchSelf = function (usernameOrId) {
  throw unimplemented(Account.fetchSelf)
  // return [
  //   {
  //     name: 'Twitter API',
  //     id_str: '6253282',
  //     id: 6253282,
  //     friends_count: 31,
  //     screen_name: 'twitterapi'
  //   }
  // ][0]
}
// GET friends/ids
Account.fetchFriends = function (usernameOrId) {
  throw unimplemented(Account.fetchFriends)
  // return {
  //   previous_cursor: 0,
  //   ids: [657693, 183709371, 7588892, 38895958, 22891211],
  //   previous_cursor_str: '0',
  //   next_cursor: 0,
  //   next_cursor_str: '0'
  // }
}
Account.databasePath = 'data/db.json'
Account.prototype.valueOf = function () {
  return this.db.get(this.id).value()
}
Account.prototype.inspect = function () {
  return JSON.stringify({ [this.id]: this.db.get(this.id).value() })
}
