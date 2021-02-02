const domain_back = 'http://localhost:5000'
const domain_front = 'http://localhost:8080'

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
    div.className = `alert-register alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('#container-login-div') || document.querySelector('#registration-login-div')
    const form = document.querySelector('#login-form') || document.querySelector('#registration-form')
    container.insertBefore(div, form)

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert-register').remove(), 5000)
  }

  //clear fields
  static async clearFields() {
    document.querySelector('#username').value = ''
    document.querySelector('#password').value = ''
    document.querySelector('#password2').value = ''
    document.querySelector('#email').value = ''
  }
}

// Events: fetch API + display products
document.addEventListener('DOMContentLoaded', (e) => {
    console.log('DOM without API request loaded')
})

// Event: Create a user
document.querySelector('#registration-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault()
  // Get form values
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  const password2 = document.querySelector('#password2').value
  const email = document.querySelector('#email').value
  const date = Date.now()

  const data = {username, password, email, date}

  // Validate
  if(username === '' || password === '' || password2 === ''|| email === '') {
    UI.showAlert('Please fill in all fields', 'danger')
  } else if (password !== password2) {
    UI.showAlert('Passwords not matching', 'danger')
  } else {
    try {
      const response = fetch(`${domain_back}/api/users`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(data)
      }).then(response => response.json())
      .then(data => {
        if (data == 'Done!') {
          UI.showAlert('You can now login', 'success')
          UI.clearFields()
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
