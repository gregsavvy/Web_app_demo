const domain_back = 'http://localhost:5000'
const domain_front = 'http://localhost:8080'

// Product class: product object
class Good {
  constructor(param1, param2, param3, filename, date) {
    this.param1 = param1
    this.param2 = param2
    this.param3 = param3
    this.filename = filename
    this.date = date
    }
}

// UI class: UI tasks
class UI {
  //get a product for update page
  static async getGoodUpdate(id) {
      const response = await fetch(`${domain_back}/api/products/${id}`)
      const StoredGood = await response.json()
      UI.fillFormUpdate(StoredGood)
  }

  //fill form for update page
  static async fillFormUpdate(good) {
    const {param1, param2, param3, filename, date} = JSON.parse(JSON.stringify(good))
    document.querySelector('#name').value = good.param1
    document.querySelector('#description').value = good.param2
    if (good.param3===true) {
      document.querySelector('#customSwitch1').checked = true
    }
    else if (good.param3===false) {
      document.querySelector('#customSwitch1').checked = false
    }
    else {
      document.querySelector('#customSwitch1').checked = false
    }
    document.querySelector('#attachment').value = ''
  }

  //alert
  static async showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.main')
    const form = document.querySelector('#product-form') || document.querySelector('#product-form-update')
    container.insertBefore(div, form)

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 5000)
  }

  //clear fields
  static async clearFields() {
    document.querySelector('#name').value = ''
    document.querySelector('#description').value = ''
    document.querySelector('#customSwitch1').unchecked
    document.querySelector('#attachment').value = ''
  }
}

// Events: preloader
var page_preloader = document.getElementById("page")
setTimeout(function() {
  page_preloader.style.display = "none"
}, 500)

// Events: fetch API + display products
document.addEventListener('DOMContentLoaded', (e) => {
  try {
    const access_promise = new Promise ((resolve,reject) => {
      const username = localStorage.getItem('username') || 'none'
      resolve(username)
    }).then((username) => {
        const response = fetch(`${domain_back}/api/users/${username}`, {
          method: 'GET',
          credentials: 'include',
          cache: 'no-cache',
        }).then(response => response.json())
        .then(data => {
          if (data == 'Authorized') {
            // on load logic
            const id = sessionStorage.getItem('id')
            UI.getGoodUpdate(id)
            document.querySelector('#delete-button').name = id
            // on load logic
          } else if (data == 'Not Authorized') {
              window.location.replace(`${domain_front}/admin_login.html`)
              console.log('Not Authorized to view this page. Please, login!')
          } else {
            window.location.replace(`${domain_front}/admin_login.html`)
            console.log('Something went wrong!')
          }
        }).catch(error => console.error(error))
      })
    } catch (error) {
    console.error('Ошибка:', error)
    }
})


// Event: Update a product
document.querySelector('#product-form-update').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault()
  const id = sessionStorage.getItem('id')

  // Get form values
  const param1 = document.querySelector('#name').value
  const param2 = document.querySelector('#description').value
  const param3 = document.querySelector('#customSwitch1').checked
  const filename = document.querySelector('#attachment').value

  const date = Date.now()

  // Validate
  if(param1 === '' || param2 === '' || filename == '') {
    UI.showAlert('Please fill in all fields', 'danger')
  } else {
    // Instatiate product
    const good = new Good(param1, param2, param3, filename, date)
    // Add book to API
    const formData = new FormData()

    for (const key in good) {
    formData.append(key, good[key])
    }

    const files = document.querySelector('#attachment').files[0]
    formData.append('file', files)

    try {
      const response = fetch(`${domain_backend}/api/products/${id}`, {
        method: 'PUT',
        body: formData
      })
      console.log('Успех')
    } catch (error) {
      console.error('Ошибка:', error)
    }

    // Show success message
    UI.showAlert('Product updated', 'success')
  }
})

// Event: Remove a good
document.querySelector('#delete-button').addEventListener('click', (e) => {
  // Remove good from API
  const id = sessionStorage.getItem('id')

  try {
  const response = fetch(`${domain_backend}/api/products/${id}`, {
      method: 'DELETE'
    })
    // Show success message
    UI.showAlert('Product Removed', 'success')
  } catch (error) {
      console.error('Ошибка:', error)
    }
})

// Event: click on logout button
document.querySelector('.sidebar').addEventListener('click', (e) => {
  if (e.target.parentElement.id == 'logout-button' || e.target.id == 'logout-button') {
    try {
      const access_promise = new Promise ((resolve,reject) => {
        const username = {username: localStorage.getItem('username')}
        resolve(username)
      }).then((username) => {
        const response = fetch(`${domain_backend}/api/users`, {
          method: 'DELETE',
          credentials: 'include',
          cache: 'no-cache',
          body: JSON.stringify(username)
        }).then(response => response.json())
        .then(data => {
          if (data == 'User logged out!') {
            window.location.replace(`${domain_frontend}/admin_login.html`)
            localStorage.setItem('username', '')
          } else {
            console.log('Something went wrong')
          }
        })
        .catch(error => console.error(error))
      })
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }
})
