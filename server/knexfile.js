'use strict'

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/haunter'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/hauntertest'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
