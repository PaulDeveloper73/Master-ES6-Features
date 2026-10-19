/* Document Object Model (DOM) */

window.addEventListener('load', () => {
  initApp()
})

const initApp = () => {
  const myForm = document.querySelector('#myform001')

  if (!myForm) {
    console.log('Form not found')
    return
  }

  // Array of hobbies
  const hList = ['football', 'volleyball', 'netball']
  const myDiv = document.createElement('div')
  myDiv.textContent = 'Loading data very soon!'
  const hobbiesList = document.createElement('ul')
  hobbiesList.id = 'userHobies'
  const userList = hList.forEach(item => {
    const li = document.createElement('li')
    li.className = 'list-item'
    li.textContent = item
    hobbiesList.appendChild(li)
  })
  hobbiesList.addEventListener('click', e => {
    if (e.target.matches('.list-item')) {
      e.target.style.color = 'green'
      alert('Your clicked on : ' + e.target.textContent.toUpperCase())
    }
  })
  //   Now append
  myForm.append(myDiv, hobbiesList)
}
