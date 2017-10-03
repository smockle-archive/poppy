export default function Username (username) {
  if (!username) {
    throw new TypeError('Invalid username. Username cannot be blank.')
  } else if (username.length > 15) {
    throw new TypeError(
      'Invalid username. Username must be under 16 characters.'
    )
  }
  const _this = Object.create(Username.prototype)
  _this.value = username
  return _this
}
Username.prototype.valueOf = function () {
  return this.value
}
Username.prototype.inspect = function () {
  return this.value
}
