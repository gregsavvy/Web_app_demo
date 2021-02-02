const domain_back = 'http://localhost:5000'
const domain_front = 'http://localhost:8080'

// Events: preloader
var page_preloader = document.getElementById("page")
setTimeout(function() {
  page_preloader.style.display = "none"
}, 500)

// Event: click on logout button
document.querySelector('.sidebar').addEventListener('click', (e) => {
  console.log(e.target)
  if (e.target.parentElement.id == 'logout-button' || e.target.id == 'logout-button') {
    try {
      const access_promise = new Promise ((resolve,reject) => {
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
