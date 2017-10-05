import Username from './username'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

export default function Account (id) {
  const _this = Object.create(Account.prototype)
  _this.id = Username(id).valueOf()
  _this.db = lowdb(new FileSync(Account.databasePath))
  _this.db
    .set(_this.id, { friends: Account.fetchFriends(_this.id).ids })
    .write()
  return _this
}
Account.fetchFriends = function (id) {
  // throw new Error(
  //   'Account.fetchFriends has not been implemented yet! PRs welcome: https://github.com/smockle/poppy'
  // )
  return {
    previous_cursor: 0,
    ids: [657693, 183709371, 7588892, 38895958, 22891211],
    previous_cursor_str: '0',
    next_cursor: 0,
    next_cursor_str: '0'
  }
}
Account.databasePath = 'data/db.json'
Account.prototype.valueOf = function () {
  return this.db.get(this.id).value()
}
Account.prototype.inspect = function () {
  return JSON.stringify({ [this.id]: this.db.get(this.id).value() })
}
