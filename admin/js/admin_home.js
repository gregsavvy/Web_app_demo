const domain_back = 'http://localhost:5000'
const domain_front = 'http://localhost:8081'

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
  // get array of goods
  static async getGoods(url) {
    const response = await fetch(url)
    const StoredGoods = await response.json()
    if (url == `${domain_back}/api/products`) {
      StoredGoods.forEach((good) => UI.addGoodToList(good))
    } else if (url == `${domain_back}/api/products_search/limit=20`) {
      StoredGoods.forEach((good) => UI.addGoodToList_home(good))
    } else {
      console.log('Incorrect GET URL')
    }
  }

  // add products to home page (limit 20)
  static async addGoodToList_home(good) {
    const {param1, param2, param3, filename, date} = JSON.parse(JSON.stringify(good))
    const list = document.querySelector('#products-list-home')
    const row = document.createElement('tr')

    row.innerHTML = `
    <td>${good.param1}</td>
    <td>${good.param2}</td>
    <td>${good.param3}</td>
    <td>${good.filename}</td>
    <td>${good.date.slice(0,10)}</td>
    `
    list.appendChild(row)
  }

  // full list of products (no pagination)
  static async addGoodToList(good) {
    const {param1, param2, param3, filename, date} = JSON.parse(JSON.stringify(good))
    const list = document.querySelector('#products-list')
    const row = document.createElement('tr')

    row.innerHTML = `
    <td>${good.param1}</td>
    <td>${good.param2}</td>
    <td>${good.param3}</td>
    <td>${good.filename}</td>
    <td>${good.date.slice(0,10)}</td>
    <td>
    <a href="/admin_update.html" name=${good._id}><div class="change-button">Change</div></a>
    </td>
    `
    list.appendChild(row)
  }

  //alert
  static async showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
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
    const accessPromise = new Promise ((resolve,reject) => {
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
            if (e.target.URL == `${domain_front}/admin_list.html`) {
              const url = `${domain_back}/api/products`
              UI.getGoods(url)
            }

            else if (e.target.URL == `${domain_front}/index.html` || `${domain_front}`) {
              const url = `${domain_back}/api/products_search/limit=20`
              UI.getGoods(url)
            }

            else {
              console.log('DOM without API request loaded')
            }
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

// Event: click on change button
document.querySelector('#products-list').addEventListener('click', (e) => {
  if (e.target.className == 'change-button') {
    sessionStorage.setItem('id', e.target.parentElement.name)
  }
})

// Event: click on logout button
document.querySelector('.sidebar').addEventListener('click', (e) => {
  if (e.target.parentElement.id == 'logout-button' || e.target.id == 'logout-button') {
    try {
      const accessPromise = new Promise ((resolve,reject) => {
        const username = {username: localStorage.getItem('username')}
        resolve(username)
      }).then((username) => {
        const response = fetch(`${domain_back}/api/users`, {
          method: 'DELETE',
          credentials: 'include',
          cache: 'no-cache',
          body: JSON.stringify(username)
        }).then(response => response.json())
        .then(data => {
          if (data == 'User logged out!') {
            window.location.replace(`${domain_front}/admin_login.html`)
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
