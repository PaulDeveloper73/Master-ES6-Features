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
  divWrapper.addEventListener('click', e => {
    divWrapper
      .querySelectorAll('div')
      .forEach(element => element.classList.remove('animate-pulse'))
    if (e.target.matches('.item-list')) {
      resultWrapper.style.display = 'block'
      userResult.textContent = e.target.textContent
      e.target.classList.add('animate-pulse')
      setTimeout(() => {
        resultWrapper.style.display = 'none'
      }, 5000)
    }
  })

  //   console.log(divWrapper.children)
}
