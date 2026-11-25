import { fetchJson, HttpError } from './api.js'
import { User } from './User.js'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

const searchInput = document.querySelector('#search')
const reloadButton = document.querySelector('#reload')
const statusMessage = document.querySelector('#status')
const errorMessage = document.querySelector('#error')
const emptyState = document.querySelector('#empty-state')
const userList = document.querySelector('#user-list')

let users = []

function setLoading (isLoading) {
  reloadButton.disabled = isLoading
  reloadButton.textContent = isLoading
    ? 'Loading contacts...'
    : 'Reload contacts'
}

function getFriendlyErrorMessage (error) {
  if (error instanceof HttpError) {
    if (error.status === 404) {
      return 'The contacts endpoint could not be found.'
    }

    if (error.status === 401 || error.status === 403) {
      return 'You are not permitted to access these contacts.'
    }

    if (error.status === 429) {
      return 'Too many requests. Please try again later.'
    }

    if (error.status >= 500) {
      return 'The server is temporarily unavailable.'
    }

    return `The request failed with HTTP ${error.status}.`
  }

  return error.message || 'An unexpected error occurred while loading contacts.'
}

function createUserCard (user) {
  const card = document.createElement('article')
  card.className = 'user-card'

  const avatar = document.createElement('div')
  avatar.className = 'avatar'
  avatar.textContent = user.initials
  avatar.setAttribute('aria-hidden', 'true')

  const name = document.createElement('h2')
  name.textContent = user.name

  const username = document.createElement('p')
  username.className = 'username'
  username.textContent = user.username
    ? `@${user.username}`
    : 'Username unavailable'

  const email = document.createElement('p')
  email.textContent = user.email

  const city = document.createElement('p')
  city.textContent = user.city

  card.append(avatar, name, username, email, city)

  return card
}

function renderUsers () {
  const query = searchInput.value.trim().toLowerCase()

  const filteredUsers = users.filter(user => {
    const searchableText = [user.name, user.email, user.username, user.city]
      .join(' ')
      .toLowerCase()

    return searchableText.includes(query)
  })

  userList.replaceChildren(...filteredUsers.map(createUserCard))

  emptyState.hidden = filteredUsers.length > 0

  if (filteredUsers.length === 0) {
    emptyState.textContent =
      users.length === 0
        ? 'No contacts are available.'
        : 'No contacts match your search.'
  }

  statusMessage.textContent = query
    ? `Showing ${filteredUsers.length} of ${users.length} contacts.`
    : `Loaded ${users.length} contacts.`
}

async function loadUsers () {
  setLoading(true)
  errorMessage.hidden = true
  emptyState.hidden = true
  userList.replaceChildren()
  statusMessage.textContent = 'Loading contacts...'

  try {
    const data = await fetchJson(API_URL)

    if (!Array.isArray(data)) {
      throw new Error('The server returned an unexpected data format.')
    }

    // Convert plain API objects into User instances.
    const loadedUsers = data.map(record => User.fromJSON(record))

    users = loadedUsers
    renderUsers()
  } catch (error) {
    console.error('Unable to load contacts:', error)

    users = []
    userList.replaceChildren()

    statusMessage.textContent = 'Contacts could not be loaded.'
    errorMessage.textContent = getFriendlyErrorMessage(error)
    errorMessage.hidden = false
  } finally {
    setLoading(false)
  }
}

searchInput.addEventListener('input', renderUsers)
reloadButton.addEventListener('click', loadUsers)

loadUsers()
