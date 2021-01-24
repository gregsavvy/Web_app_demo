const fs = require('fs')
const os = require('os')
const path = require('path')

// forming JSON body - utility function for JSON parsing
  function readyJSON(req) {
      return new Promise((resolve, reject) => {
          try {
              let body = ''
              // var form = new formidable.IncomingForm()

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
// end utility

// 1 Gets a user and checks against a session cookie
async function getUser(req,res, username, clientcookie) {
  fs.readFile(path.resolve('./', './models/users.json'), 'utf8', function (err, data) {
    if (err) throw err

    const users = JSON.parse(data)
    const user = users.filter(user => user.username == username && user.session == clientcookie)
    return res.end(JSON.stringify(user))
    })
  }

// 2 Gets all users
async function getUsers(req,res) {
  fs.readFile(path.resolve('./', './models/users.json'), 'utf8', function (err, data) {
    if (err) throw err

    const users = JSON.parse(data)
    return res.end(JSON.stringify(users))
    })
  }

// 3 Create a user
async function createUser(req, res) {
    try {
        const body = await readyJSON(req)

        const { username, email, password, date } = JSON.parse(body)

        const newUser = {
            username,
            email,
            password,
            date
        }

        fs.readFile(path.resolve('./', './models/users.json'), 'utf8', function (err, data) {
          if (err) throw err
          const users = JSON.parse(data)
          const usersExist = users.filter(user => user.username == newUser.username || user.email == newUser.email)

          if (usersExist.length > 0) {
            res.end(JSON.stringify('User already exists!'))
          } else {
            users.push(newUser)
            fs.writeFile(path.resolve('./', './models/users.json'), JSON.stringify(users), 'utf8', function (err) {
              if (err) throw err
              })
              res.end(JSON.stringify('Done!'))
            }
          })
    } catch (error) {
        console.log(error)
    }
}

// 4 Login user and send session cookie
async function loginUser(req,res, username) {
  fs.readFile(path.resolve('./', './models/users.json'), 'utf8', function (err, data) {
    if (err) throw err

    const users = JSON.parse(data)
    users.forEach((user) => {
      if (user.username == username) {
        const returnUser = user
        user.session = '3'
      } else {
        console.log('Session facilitation not required!')
      }
    })
    fs.writeFile(path.resolve('./', './models/users.json'), JSON.stringify(users), 'utf8', function (err) {
      if (err) throw err
      })

    return res.end(JSON.stringify(returnUser))
    })
  }

module.exports = {
  getUser,
  getUsers,
  createUser,
  loginUser
}
