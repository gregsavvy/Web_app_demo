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
    if (url == 'http://localhost:5000/api/products') {
      StoredGoods.forEach((good) => UI.addGoodToList(good))
    } else if (url == 'http://localhost:5000/api/products_search/limit=20') {
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

  //get a product for update page
  static async getGoodUpdate(id) {
      const response = await fetch(`http://localhost:5000/api/products/${id}`)
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

// Events: fetch API + display products
document.addEventListener('DOMContentLoaded', (e) => {
  if (e.target.URL == 'http://localhost:8080/admin_list.html') {
    const url = 'http://localhost:5000/api/products'
    UI.getGoods(url)
  }

  else if (e.target.URL == 'http://localhost:8080/index.html' || 'http://localhost:8080') {
    const url = 'http://localhost:5000/api/products_search/limit=20'
    UI.getGoods(url)
  }

  else {
    console.log('DOM without API request loaded')
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
  console.log(e.target)
  if (e.target.parentElement.id == 'logout-button' || e.target.id == 'logout-button') {
    const username = sessionStorage.getItem('username')
//need promise!!!
    try {
      const response = fetch('http://localhost:5000/api/users', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(`username: ${username}`)
      }).then(response => response.json())
      .then(data => {
        if (data == 'User logged out!') {
          window.location.replace('http://localhost:8080/admin_login.html')
          sessionStorage.setItem('username', '')
        } else {
          console.log('Something went wrong')
        }
      })
      .catch(error => console.error(error))

    } catch (error) {
      console.error('Ошибка:', error)
      UI.showAlert('Something went wrong', 'danger')
    }
  }
})
