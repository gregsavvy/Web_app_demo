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
  const session = req.headers.cookie || 'SessionID Not authorized'

  user.query('SELECT * from users')
    .then(result => {
      const usersRaw = JSON.stringify(result.rows[0])
      const usersClean = JSON.parse(usersRaw)

      const access_toggle = 'Not Authorized'
      const access_promise = new Promise((resolve,reject) => {
        usersClean.filter((user) => {
          if (user.username == username && user.session == session.slice(session.indexOf('sessionId=')+10)) {
            const access_toggle = 'Authorized'
            resolve(access_toggle)
          }
        })
        resolve(access_toggle)

        }).then((access_toggle) => {
        res.write(JSON.stringify(access_toggle))
        res.end()
      })
      
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
        const { username, email, password, date } = JSON.parse(body)

        user.query('SELECT * from users(username, email)')
          .then(result => {
            // to be tested
            const dbInfo = JSON.stringify(result.rows[0])
          })
          .catch(e => console.error(e.stack))

        // to be tested
        const usersExist = users.filter(user => user.username == newUser.username || user.email == newUser.email)

        if (usersExist.length > 0) {
          res.end(JSON.stringify('User already exists!'))
        } else {
            text = 'INSERT INTO users(username, email, password, date, session) VALUES($1, $2, $3, $4, $5) RETURNING *'
            values = [username, email, password, date, 'NULL']

            user.query(text, values)
              .then(result => {
                res.write(JSON.stringify(result.rows[0]))
                res.end()
              })
              .catch(e => console.error(e.stack))
            res.end(JSON.stringify('Done!'))
          }

    } catch (error) {
        console.log(error)
    }
}

// 4 Login user and send session cookie
async function loginUser(req,res) {
  try {
    const body = await readyJSON(req)
    const { username, password } = JSON.parse(body)

    user.query('SELECT * from users')
    .then(result => {
      const usersRaw = JSON.stringify(result.rows[0])
      const usersClean = JSON.parse(usersRaw)

      const access_promise = new Promise((resolve,reject) => {
        const access_user = JSON.stringify('Not Authorized')
        const cookie_session = 'none'

        // to be tested
        usersClean.forEach((user) => {
        if (user.username == username && user.password == password) {
          user.session = JSON.stringify(randomInteger(1000000, 9999999))
          const cookie_session = user.session
          const access_user = JSON.stringify(user.username)
          const session_data = `${access_user}/${cookie_session}`
          resolve(session_data)
        }
      })

      const session_data = `${access_user}/${cookie_session}`
      resolve(session_data)
    }).then((session_data) => {
        const access_user = session_data.split('/')[0]
        const cookie_session = session_data.split('/')[1]
        res.writeHead(200, {'Access-Control-Allow-Origin': `${domain}`,
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
        'Set-Cookie': `sessionId=${cookie_session}; SameSite=Lax; path=/; HttpOnly`})
        // No "Secure" param on cookie (https implementation required on server)
        res.write(access_user)
        res.end()
      })

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
  const { username } = JSON.parse(body)

  user.query('SELECT * from users')
    .then(result => {
      const usersRaw = JSON.stringify(result.rows[0])
      const usersClean = JSON.parse(usersRaw)

      // to be tested
      usersClean.forEach((user) => {
        if (user.username == username) {
          user.session = ''
          res.writeHead(200, {'Access-Control-Allow-Origin': `${domain}`,
          'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
          'Set-Cookie': `sessionId=none; SameSite=Lax; path=/; HttpOnly`})
          // No "Secure" param on cookie (https implementation required on server)
          res.end(JSON.stringify('User logged out!'))
        }
      })

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
