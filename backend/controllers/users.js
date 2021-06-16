const fs = require('fs')
const os = require('os')
const path = require('path')

require('dotenv').config({path: path.resolve(__dirname,'../','./.env')})

const domain = process.env.DOMAINFRONT

var {user, pool} = require('../models/users_model')

// forming JSON body - utility function for JSON parsing
  function readyJSON(req) {
      return new Promise((resolve, reject) => {
          try {
              let body = ''

              req.on('data', (chunk) => {
                  body += chunk.toString()
              })

              req.on('end', () => {
                  resolve(body)
              })
          } catch (err) {
              reject(err)
          }
      })
}

// random integer - utility function for hashing
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// 1 Gets a user and checks against a session cookie (cookie session token)
async function getUser(req,res, username) {
  try {
  const sessionCookie = req.headers.cookie || 'SessionID Not authorized'

  user.query(`SELECT * FROM users WHERE username='${username}'`)
    .then(result => {

      if (result.rows[0] === undefined) {
        res.write(JSON.stringify("Not Authorized"))
        res.end()

      } else {
      const dbUser = JSON.parse(JSON.stringify(result.rows[0]))

      let accessToggle = "Not Authorized"
      let accessPromise = new Promise((resolve,reject) => {

        if (dbUser.username == username && dbUser.session == sessionCookie.match('(^|;)\\s*' + 'sessionId' + '\\s*=\\s*([^;]+)')?.pop()) {


          let accessToggle = "Authorized"
          resolve(accessToggle)
        }
        resolve(accessToggle)

        }).then((accessToggle) => {
        res.write(JSON.stringify(accessToggle))
        res.end()
        })
        .catch(e => console.error(e.stack))
      }
      
    })
    .catch(e => console.error(e.stack)) 
  }
  catch (error) {
    console.log(error)
  }
}

// 2 Gets all users
async function getUsers(req,res) {
  user.query('SELECT * from users')
    .then(result => {
      res.write(JSON.stringify(result.rows[0]))
      res.end()
    })
    .catch(e => console.error(e.stack))

}

// 3 Create a user
async function createUser(req, res) {
    try {
        const body = await readyJSON(req)
        let { username, email, password, date } = JSON.parse(body)

        user.query(`SELECT * FROM users WHERE username='${username}' OR email='${email}'`)
          .then(result => {

            if (result.rows[0] === undefined) {
              sqlText = 'INSERT INTO users(username, email, password, date, session) VALUES ($1, $2, $3, $4, $5) RETURNING *'
              sqlValues = [username, email, password, date, 'NULL']

              user.query(sqlText, sqlValues)
                .then(result => {
                  res.write(JSON.stringify("Done!"))
                  res.end()
                })
                .catch(e => console.error(e.stack))

            } else {
              res.end(JSON.stringify("User already exists!"))
            }
          })
          .catch(e => console.error(e.stack))

    } catch (error) {
        console.log(error)
    }
}

// 4 Login user and send session cookie
async function loginUser(req,res) {
  try {
    const body = await readyJSON(req)
    let { username, password } = JSON.parse(body)

    user.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`)
      .then(result => {
        const dbUser = JSON.parse(JSON.stringify(result.rows[0]))

        const accessPromise = new Promise((resolve,reject) => {
          let sessionUser = JSON.stringify("Not Authorized")
          let sessionCookie = 'null'

          if (dbUser.username == username && dbUser.password == password) {
            sessionCookie = JSON.stringify(randomInteger(100000000, 999999999999999))
  
            let sessionData = `${JSON.stringify(dbUser.username)}/${sessionCookie}`
            resolve(sessionData)
          }
          let sessionData = `${sessionUser}/${sessionCookie}`
          resolve(sessionData)

        }).then((sessionData) => {
            let sessionUser = sessionData.split('/')[0].replace(/^"|"$/g, "")
            let sessionCookie = sessionData.split('/')[1]

            user.query(`UPDATE users SET session = ${sessionCookie} WHERE username = '${sessionUser}' RETURNING *`)
              .then(result => {
                const dbUser = JSON.parse(JSON.stringify(result.rows[0]))

                if (dbUser.session == sessionCookie) {
                  res.writeHead(200, {'Access-Control-Allow-Origin': `${domain}`,
                  'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Allow-Credentials': 'true',
                  'Set-Cookie': `sessionId=${sessionCookie}; SameSite=Lax; path=/; HttpOnly`})
                  // No "Secure" param on cookie (https implementation required on server)

                  res.write(JSON.stringify(sessionUser))
                  res.end()
                } else {
                  res.write(JSON.stringify("Something went wrong with writing to db!"))
                  res.end()
                }
              })

          })
          .catch(e => console.error(e.stack))

      })
    .catch(e => console.error(e.stack))
      
  } catch (error) {
      console.log(error)
  }
}

// 5 Logout user and delete session cookie
async function logoutUser(req,res) {
  try {
    const body = await readyJSON(req)
    let { username } = JSON.parse(body)

    user.query(`SELECT * FROM users WHERE username='${username}'`)
      .then(result => {
        let dbUser = JSON.parse(JSON.stringify(result.rows[0]))

        if (dbUser.username == username) {
          let sessionCookie = 'null'

          user.query(`UPDATE users SET session = ${sessionCookie} WHERE username = '${username}' RETURNING *`)
          .then(result => {
            let dbUser = JSON.parse(JSON.stringify(result.rows[0]))

            if (dbUser.session === null) {
              res.writeHead(200, {'Access-Control-Allow-Origin': `${domain}`,
              'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Credentials': 'true',
              'Set-Cookie': `sessionId=${sessionCookie}; SameSite=Lax; path=/; HttpOnly`})
              // No "Secure" param on cookie (https implementation required on server)

              res.write(JSON.stringify("User logged out!"))
              res.end()
            } else {
              res.write(JSON.stringify("Something went wrong with writing to db!"))
              res.end()
            }
          })
        }
        
      })
      .catch(e => console.error(e.stack))

  }  catch (error) {
      console.log(error)
  }
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  loginUser,
  logoutUser
}
