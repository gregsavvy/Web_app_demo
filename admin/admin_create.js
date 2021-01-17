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
    console.log('DOM without API request loaded')
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
  if(param1 === '' || param2 === '' || filename == '') {
    UI.showAlert('Please fill in all fields', 'danger')
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
