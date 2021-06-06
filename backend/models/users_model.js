const { Client } = require('pg')

const client = new Client({
    user: 'admin',
    host: 'localhost:',
    database: 'default',
    password: 'admin',
    port: 6000,
  })
  client.connect()
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  })


  
// [{"username":"admin",
//     "email":"admin@admin.com",
//     "password":"admin",
//     "date":"2021-01-01",
//     "session":""
// }]