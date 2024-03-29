const domain_back = 'http://localhost:5000'
const domain_front = 'http://localhost:8081'

// User class: user object
class User {
  constructor(username, email, password, date, session) {
    this.username = username
    this.email = email
    this.password = password
    this.date = date
    this.session = session
    }
}

// UI class: UI tasks
class UI {
  //alert
  static async showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert-login alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('#container-login-div') || document.querySelector('#registration-login-div')
    const form = document.querySelector('#login-form') || document.querySelector('#registration-form')
    container.insertBefore(div, form)

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert-login').remove(), 5000)
  }
}

// Events: fetch API + display products
document.addEventListener('DOMContentLoaded', (e) => {
    console.log('DOM without API request loaded')
})

// Event: Login and return token
document.querySelector('#login-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault()
  // Get form values
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value

  const data = {username, password}

  // Validate
  if(username === '' || password === '') {
    UI.showAlert('Please fill in all fields', 'danger')
  } else {
    try {
      const response = fetch(`${domain_back}/api/users`, {
        method: 'PUT',
        cache: 'no-cache',
        credentials: 'include',
        body: JSON.stringify(data)
      }).then(response => response.json())
      .then(data => {
        if (data == "Not Authorized") {
          UI.showAlert('Incorrect login or password', 'danger')
        } else if (data == username) {
          localStorage.setItem('username', username)
          window.location.replace(`${domain_front}`)
        } else {
          UI.showAlert('Something went wrong', 'danger')
        }
      })
      .catch(error => console.error(error))

    } catch (error) {
      console.error('Ошибка:', error)
      UI.showAlert('Something went wrong', 'danger')
    }
  }
})
