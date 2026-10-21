// Master dom
// function to handle the div creation

window.addEventListener('load', () => {
  initApp()
})
const initApp = () => {
  const handleNewDivs = (parent, content) => {
    const myDiv = document.createElement('div')
    myDiv.textContent = content
    myDiv.className = 'item-list'
    parent.classList.add('all-divs')
    parent.append(myDiv)
  }

  const myParent = document.querySelector('#gamedetails')
  for (let i = 0; i < 30; i++) {
    handleNewDivs(myParent, i + 1)
  }

  //   capture the targeted areas

  const resultWrapper = document.querySelector('#user-result')
  const userResult = document.querySelector('#result')
  const divWrapper = document.querySelector('#gamedetails')
  let hideResultTimeOut // initialise clear timeout
  divWrapper.addEventListener('click', e => {
    divWrapper
      .querySelectorAll('div')
      .forEach(element => element.classList.remove('animate-pulse'))
    if (!e.target.matches('.item-list')) return
    clearTimeout(hideResultTimeOut)
    if (e.target.matches('.item-list')) {
      resultWrapper.style.display = 'block'
      userResult.textContent = e.target.textContent
      e.target.classList.add('animate-pulse')
      hideResultTimeOut = setTimeout(() => {
        resultWrapper.style.display = 'none'
      }, 5000)
    }
  })
  // Hadle sublings and children
  const mainParent = divWrapper.children
  console.log(mainParent)
  console.log(mainParent[6])
  console.log(mainParent[6].textContent)
  console.log(mainParent[6].parentElement)
  console.log(mainParent[6].parentNode)
  console.log(mainParent[6].parentNode)
  console.log(mainParent[6].hasChildNodes())
  console.log(mainParent[6].lastChild)
  console.log(mainParent[6].firstChild)
  console.log(mainParent[6].previousElementSibling)
  console.log(mainParent[6].previousSibling)
  console.log(mainParent[6].nextElementSibling)
  console.log(mainParent[6].nextSibling)
  console.log(divWrapper.firstElementChild)
  console.log(divWrapper.lastElementChild)
  console.log(divWrapper.lastElementChild.previousElementSibling)
  console.log(divWrapper.innerHTML)
  console.log(divWrapper.childElementCount)
  console.log(divWrapper.children)
}
