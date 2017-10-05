import test from 'tape'
import util from 'util'
import Username from '../lib/username'

test('Username.constructor', t => {
  t.plan(8)
  t.equal(Username('smockled').valueOf(), 'smockled', 'valid')
  t.throws(Username.bind(''), TypeError, 'invalid id: empty string')
  t.throws(Username.bind(), TypeError, 'invalid id: undefined')
  t.throws(Username.bind(undefined), TypeError, 'invalid id: undefined')
  t.throws(Username.bind(null), TypeError, 'invalid id: null')
  t.throws(
    Username.bind('aaaaaaaaaaaaaaaa'),
    TypeError,
    'invalid id: >15 characters'
  )
  t.throws(Username.bind(' '), TypeError, 'invalid id: space')
  t.throws(Username.bind('.'), TypeError, 'invalid id: period')
})

test('Username.inspect', t => {
  t.plan(1)
  t.equal(util.inspect(Username('smockled')), 'smockled', 'valid')
})
