import Username from './username'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

export default function Friends (id) {
  const _this = Object.create(Friends.prototype)
  _this.id = Username(id)
  _this.db = lowdb(new FileSync(Friends.databasePath))
  _this.db.set(_this.id, Friends.fetch(_this.id)).write()
  return _this
}
Friends.fetch = function (id) {
  throw new Error(
    'Friends.fetch has not been implemented yet! PRs welcome: https://github.com/smockle/poppy'
  )
}
Friends.databasePath = 'data/db.json'
Friends.prototype.valueOf = function () {
  return this.db.get(this.id).value()
}
