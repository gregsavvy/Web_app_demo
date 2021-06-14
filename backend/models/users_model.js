const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'default',
  password: 'admin',
  port: 6000,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
})

pool.query('SELECT NOW() as now')
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))

const user = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'default',
  password: 'admin',
  port: 6000,
})

user.on('error', e => {
  console.error('Database error', e);
  user = null;
});

user.connect()
  .then(() => console.log('Connected to Postgres'))
  .catch(e => console.error(e.stack))

user.query(`CREATE TABLE users (
  username varchar,
  email varchar,
  password varchar,
  date varchar,
  session varchar
  );`
  )
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))

// default user
// [{"username":"admin",
//     "email":"admin@admin.com",
//     "password":"admin",
//     "date":"2021-01-01",
//     "session":""
// }]

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



exports.user = user
exports.pool = pool