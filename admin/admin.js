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
    <td>${good.date}</td>
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
    <td>${good.date}</td>
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
    const form = document.querySelector('#product-form')
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

  else if (e.target.URL == 'http://localhost:8080/index.html') {
    const url = 'http://localhost:5000/api/products_search/limit=20'
    UI.getGoods(url)
  }
  else if (e.target.URL == 'http://localhost:8080/admin_update.html') {
    const id = sessionStorage.getItem('id')
    UI.getGoodUpdate(id)
    document.querySelector('#delete-button').name = id
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
  else {
    console.log('Click change button')
  }
})

// Event: Add a product from create page
document.querySelector('#product-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault()
  // Get form values
  const param1 = document.querySelector('#name').value
  const param2 = document.querySelector('#description').value
  const param3 = document.querySelector('#customSwitch1').checked
  const filename = document.querySelector('#attachment').value

  const date = Date.now()

  // Validate
  if(param1 === '' || param2 === '' || param3 == '' || filename == '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate product
    const good = new Good(param1, param2, param3, filename, date)

    // Add product to API
    const formData = new FormData()

    for (const key in good) {
    formData.append(key, good[key])
    }

    const files = document.querySelector('#attachment').files[0]
    formData.append('file', files)

    try {
      const response = fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData
      })
      const result = response.json()
      console.log('Успех:', JSON.stringify(result))
    } catch (error) {
      console.error('Ошибка:', error)
    }

    // Show success message
    UI.showAlert('Product added', 'success')

    // Clear fields
    UI.clearFields()
  }
})



// Event: Update a product
document.querySelector('#product-form-update').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault()

  // Get form values
  const param1 = document.querySelector('#name').value
  const param2 = document.querySelector('#description').value
  const param3 = document.querySelector('#customSwitch1').checked
  const filename = document.querySelector('#attachment').value

  const date = Date.now()

  const id = sessionStorage.getItem('id')

  // Validate
  if(param1 === '' || param2 === '' || param3 == '' || filename == '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate product
    const good = new Good(param1, param2, param3, filename, date)

    // Add book to API
    const formData = new FormData(good)
    const files = document.querySelector('#attachment').files[0]
    formData.append(files)

    try {
      const response = fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        body: formData
      })
      const result = response.json()
      console.log('Успех:', JSON.stringify(result))
    } catch (error) {
      console.error('Ошибка:', error)
    }

    // Show success message
    UI.showAlert('Product updated', 'success')
  }
})

// Event: Remove a good
document.getElementById('delete-button').onclick((e) => {
  // Remove good from API
  const id = sessionStorage.getItem('id')
  const response = fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE'
    })
    const result = response.json()
    console.log('Успех:', JSON.stringify(result))
    // Show success message
    UI.showAlert('Product Removed', 'success')
  if (error) {
    console.error('Ошибка:', error)
  }
})
