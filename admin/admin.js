// Product class: product object
class Good {
  constructor(id, title, desc, active_toggle, filename, date) {
    this.id = id
    this.title = title
    this.desc = desc
    this.active_toggle = active_toggle
    this.filename = filename
    this.date = date
    }
}

// UI class: UI tasks
class UI {
  //top 20 for the home page
  static async displayGoods_home() {
    const response = await fetch('http://localhost:5000/api/products_search/limit=20')
    const StoredGoods = await response.json()
    StoredGoods.forEach((good) => UI.addGoodToList_home(good))
  }

  static async addGoodToList_home(good) {
    const {param1, param2, param3, filename, date} = JSON.parse(JSON.stringify(good))
    const list = document.querySelector('#goods-list-home')
    const row = document.createElement('tr')
    if (good.param3 == 'true') {
      const param3 = 'Active'
    }
    else {
      const param3 = 'Non-Active'
    }
    row.innerHTML = `
    <td>${good.param1}</td>
    <td>${good.param2}</td>
    <td>${param3}</td>
    <td>${good.filename}</td>
    <td>${good.date}</td>
    `
    list.appendChild(row)
  }

  //full list
  static async displayGoods() {
    const response = await fetch('http://localhost:5000/api/products')
    const StoredGoods = await response.json()
    StoredGoods.forEach((good) => UI.addGoodToList(good))
  }

  static async addGoodToList(good) {
    const {param1, param2, param3, filename, date} = JSON.parse(JSON.stringify(good))
    const list = document.querySelector('#goods-list')
    const row = document.createElement('tr')

    if (good.param3=='true') {
      const param3 = 'Active'
    }
    else {
      const param3 = 'Non-Active'
    }
    row.innerHTML = `
    <td>${good.param1}</td>
    <td>${good.param2}</td>
    <td>${param3}</td>
    <td>${good.filename}</td>
    <td>${good.date}</td>
    <td>
    <a href="/admin_update.html" name=${good._id}><div id="change-button">Change</div></a>
    </td>
    `
    list.appendChild(row)
  }

  //get a product
  static async displayGood(id) {
    const response = await fetch(`http://localhost:5000/api/products/${id}`)
    const StoredGoods = await response.json()
    await fillForm(StoredGoods)
  }

  //fill form
  static async fillForm(good) {
    const form = document.querySelector('#product-form-update')
    document.querySelector('#name').value = good.param1
    document.querySelector('#description').value = good.param2
    if (good.param3=='true') {
      document.querySelector('#active').checked
    }
    else {
      document.querySelector('#active').unchecked
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
    setTimeout(() => document.querySelector('.alert').remove(), 3000)
  }

  //clear fields
  static async clearFields() {
    document.querySelector('#name').value = ''
    document.querySelector('#description').value = ''
    document.querySelector('#active').unchecked
    document.querySelector('#attachment').value = ''
  }
}

// Events: Display products
document.addEventListener('DOMContentLoaded', (e) => {
  if (e.target.URL == 'http://localhost:8080/index.html') {
    UI.displayGoods_home()
  }
  else if (e.target.URL == 'http://localhost:8080/admin_list.html') {
    UI.displayGoods()
  }
})

// Event: Add a product
document.querySelector('#product-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault()

  // Get form values
  const name = document.querySelector('#name').value
  const description = document.querySelector('#description').value
  if (document.querySelector('#active').checked) {
    const active = 'true'
  } else {
    const active = 'false'
  }
  const attachment = document.querySelector('#attachment').value

  const date = Date.now()

  // Validate
  if(name === '' || description === '' || active == '' || attachment == '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate product
    const good = new Good(name, description, active, attachment, date)

    // Add product to API
    const formData = new FormData(good)
    const fileField = document.querySelector('input[type="file"]')
    formData.append(fileField.files[0])

    try {
      const response = fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
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

// Event: Getting update data
document.querySelector('#change-button').addEventListener('click', (e) => {
  const id = e.parentElement.name
  displayGood(id)

  delete_button = document.querySelector('#delete-button')
  delete_button.name = id
  })

// Event: Update a product
document.querySelector('#product-form-update').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault()

  // Get form values
  const name = document.querySelector('#name').value
  const description = document.querySelector('#description').value
  if (document.querySelector('#active').checked) {
    const active = 'true'
  } else {
    const active = 'false'
  }
  const attachment = document.querySelector('#attachment').value

  const date = Date.now()

  // Validate
  if(name === '' || description === '' || active == '' || attachment == '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate product
    const good = new Good(name, description, active, attachment, date)

    // Add book to API
    const formData = new FormData(good)
    const fileField = document.querySelector('input[type="file"]')
    formData.append(fileField.files[0])

    try {
      const response = fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
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
document.getElementById('delete_button').onclick((e) => {
  // Remove good from API
  const response = fetch(`http://localhost:5000/api/products/${e.name}`, {
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
