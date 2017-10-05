import Username from './username'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

export default function Friends (id) {
  const _this = Object.create(Friends.prototype)
  _this.id = Username(id).valueOf()
  _this.db = lowdb(new FileSync(Friends.databasePath))
  _this.db.set(_this.id, Friends.fetch(_this.id)).write()
  return _this
}
Friends.fetch = function (id) {
  // throw new Error(
  //   'Friends.fetch has not been implemented yet! PRs welcome: https://github.com/smockle/poppy'
  // )
  return {
    previous_cursor: 0,
    ids: [657693, 183709371, 7588892, 38895958, 22891211],
    previous_cursor_str: '0',
    next_cursor: 0,
    next_cursor_str: '0'
  }
}
Friends.databasePath = 'data/db.json'
Friends.prototype.valueOf = function () {
  return this.db.get(this.id).value()
}
Friends.prototype.inspect = function () {
  return JSON.stringify({ [this.id]: this.db.get(this.id).value() })
}
