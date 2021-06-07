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

user.query('SELECT NOW() as now')
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))
  
// [{"username":"admin",
//     "email":"admin@admin.com",
//     "password":"admin",
//     "date":"2021-01-01",
//     "session":""
// }]

exports.user = user
exports.pool = pool