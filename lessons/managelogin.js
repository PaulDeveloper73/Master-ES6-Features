//Manage login form

window.addEventListener('load', () => {
  initApp()
})
const myloginform = document.querySelector('#loginform')
const initApp = () => {
  //   alert('Loading data')
  if (!myloginform) {
    console.log('Form not found')
    return
  }
  myloginform.addEventListener('submit', handleSubmit)
}
const handleSubmit = e => {
  e.preventDefault()
  let username = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  const submitBtn = document.querySelector('#submitBtn')
  const userconfirmation = document.querySelector('#alertuser')
  username = username.trim()
  if (!username === null || !password === null) {
    console.log('Username and password is required')
    return
  }
  sessionStorage.setItem('isLoggedIn', 'true')
  sessionStorage.setItem('username', username)

  const isLoggedin = sessionStorage.getItem('isLoggedIn')

  if (isLoggedin) {
    //   Redirecting user
    myloginform.reset()
    myloginform
      .querySelectorAll('*')
      .forEach(element => (element.disabled = true))
    userconfirmation.style.display = 'block'
    submitBtn.textContent = 'Loading...'
    submitBtn.style.backgroundColor = 'green'
    submitBtn.style.opacity = '0.5'
    submitBtn.style.disabled = true
    setTimeout(() => {
      window.location.href = './welcome.html'
    }, 3000)
  } else {
    alert('User not logged In')
  }

  console.log(password, username)
}

// Create acustom event
// 1. Listen for the custom event
myloginform.addEventListener('userLogin', event => {
  const { username, userId } = event.detail

  console.log('Username:', username)
  console.log('User ID:', userId)
})

// 2. Create the custom event
const myCustomEvent = new CustomEvent('userLogin', {
  detail: {
    username: 'mukisa@gmail.com',
    userId: '001'
  }
})

// 3. Dispatch the event
myloginform.dispatchEvent(myCustomEvent)
