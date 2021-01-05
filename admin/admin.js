// Product class: product object
class Good {
  constructor(title, desc, active_toggle, filename, date) {
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
    const list = document.querySelector('#goods-list-home')
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${good.title}</td>
    <td>${good.desc}</td>
    <td>${good.active_toggle}</td>
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
    const list = document.querySelector('#goods-list')
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${good.title}</td>
    <td>${good.desc}</td>
    <td>${good.active_toggle}</td>
    <td>${good.filename}</td>
    <td>${good.date}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `
    list.appendChild(row)
  }

  static async deleteGood(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  }

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

  static async clearFields() {
    document.querySelector('#name').value = ''
    document.querySelector('#description').value = ''
    document.querySelector('#active').value = ''
    document.querySelector('#attachment').value = ''
  }
}

// Events: Display Books
var eventSource_home = new EventSource('http://localhost:5000/api/products_search/limit=20')

eventSource_home.onopen = function(e) {
  UI.displayGoods_home
}

var eventSource_list = new EventSource('http://localhost:5000/api/products')

eventSource_list.onopen = function(e) {
  UI.displayGoods
}

// Event: Add a product
document.querySelector('#product-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault()

  // Get form values
  const name = document.querySelector('#name').value
  const description = document.querySelector('#description').value
  const active = document.querySelector('#active').value
  const attachment = document.querySelector('#attachment').value

  const date = Date.now()

  // Validate
  if(name === '' || description === '' || active === '' || attachment === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate product
    const good = new Good(name, description, active, attachment, date)

    // Add book to API
    const formData = new FormData(good);
    const fileField = document.querySelector('input[type="file"]')
    formData.append(fileField.files[0])

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
      })
      const result = await response.json()
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

// Event: Remove a Book
document.querySelector('#goods-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteGood(e.target)

  // Remove book from API !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const response = await fetch(`http://localhost:5000/api/products/${e.target.id}`, {
      method: 'DELETE'
    })
    const result = await response.json()
    console.log('Успех:', JSON.stringify(result))
  } catch (error) {
    console.error('Ошибка:', error)
  }
  // Show success message
  UI.showAlert('Product Removed', 'success')
})
