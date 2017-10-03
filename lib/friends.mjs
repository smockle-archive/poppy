import Username from './username'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
const db = lowdb(new FileSync('data/db.json'))

export default class Friends {
  static fetch (id) {
    return {
      previous_cursor: 0,
      ids: [657693, 183709371, 7588892, 38895958, 22891211],
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0'
    }
  }

  constructor (id) {
    this.id = Username(id)
    db.set(this.id, Friends.fetch(this.id)).write()
  }
  valueOf () {
    return db.get(this.id).value()
  }
}
