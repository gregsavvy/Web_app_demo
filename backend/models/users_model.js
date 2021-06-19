const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'default',
  password: 'admin',
  port: 6000,
  pool: { 
    min: 0,
    max: 10,
    createTimeoutMillis: 8000,
    acquireTimeoutMillis: 8000,
    idleTimeoutMillis: 8000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false
  },
})

const user = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'default',
  password: 'admin',
  port: 6000,
})

async function dbConnect(pool, user) {
  await pool.connect()
  .then(() => {
    console.log('Connected to Postgres db pool')

    pool.query('SELECT NOW() as now')
      .then(() => {

        user.connect()
          .then(() => {
            console.log('Connected to Postgres db client')

            user.query(`CREATE TABLE users (
              username varchar,
              email varchar,
              password varchar,
              date varchar,
              session varchar
              );`
              )
              .then(() => {
                // initial admin user for testing purposes
                sqlText = 'INSERT INTO users(username, email, password, date, session) VALUES ($1, $2, $3, $4, $5) RETURNING *'
                sqlValues = ['admin', 'admin@admin.com', 'admin', '2021-01-01', 'NULL']

                user.query('SELECT * from users')
                    .then(result => {
                      if (result.rows[0] === undefined) {
                        user.query(sqlText, sqlValues)
                          .catch(e => console.error(e.stack))
                      }
                  })
                    .catch(e => console.error(e.stack))
              })
              .catch(e => console.error(e.stack))
            })
        .catch(e => {
          console.error(e.stack)
        })
        
      })
      .catch(e => console.error(e.stack))
  })
  .catch(e => {
    console.error(e.stack)
  })
}

dbConnect(pool, user)

// default user
// [{"username":"admin",
//     "email":"admin@admin.com",
//     "password":"admin",
//     "date":"2021-01-01",
//     "session":""
// }]


exports.user = user
exports.pool = pool