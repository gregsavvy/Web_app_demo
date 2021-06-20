const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'default',
  password: 'admin',
  port: 6000,
  min: 0,
  max: 50,
  createTimeoutMillis: 0,
  acquireTimeoutMillis: 0,
  idleTimeoutMillis: 0,
  reapIntervalMillis: 0,
  createRetryIntervalMillis: 100,
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