import Username from './username'

export default class Friends {
  constructor (id) {
    this.id = Username(id)
  }
  valueOf () {
    return {
      previous_cursor: 0,
      ids: [657693, 183709371, 7588892, 38895958, 22891211],
      previous_cursor_str: '0',
      next_cursor: 0,
      next_cursor_str: '0'
    }
  }
}
