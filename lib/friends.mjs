import Username from './username'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

export default class Friends {
  static fetch (id) {
    throw new Error(
      'Friends.fetch has not been implemented yet! PRs welcome: https://github.com/smockle/poppy'
    )
  }

  constructor (id) {
    this.id = Username(id)
    this.db = lowdb(new FileSync(Friends.databasePath))
    this.db.set(this.id, Friends.fetch(this.id)).write()
  }
  valueOf () {
    return this.db.get(this.id).value()
  }
}
Friends.databasePath = 'data/db.json'
