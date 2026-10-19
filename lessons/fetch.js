// 8 Fetching User comments,posts,users,photos,albums,todos
// API to use: https://jsonplaceholder.typicode.com/comments
const requestURL = () => 'https://jsonplaceholder.typicode.com'

const fetchData = async dataSource => {
  try {
    const response = await fetch(`${requestURL()}/${dataSource}`)
    // const response = await fetch('./api/users.json')
    const data = await response.json()
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    console.log(`HTTP error: ${response.status}`)
    console.log(response.ok)
    console.log(response.statusText)
    console.log(response.headers)
    console.log(response.url)
    return data
  } catch (err) {
    console.log(`An error occurred` + err.message)
    return []
  } finally {
    console.log(`Loading data soon!`)
  }
}
const userQuery = `posts` //comments,posts,users,photos,albums,todos
const userComments = await fetchData(userQuery)
if (userComments.length > 0) {
  console.log(`Data Loading Now...`)
  console.log(userComments)
  console.log('Below are the ten(10) first results of ' + userQuery)
  const first10_results = userComments.filter(comment => comment.id < 11)
  console.log(first10_results)
} else {
  console.log(`No ${userQuery} available!,Try Again !!!`)
}

const newCustomer = {
  name: 'Paul',
  email: 'paul@example.com',
  phone: '+256700000000'
}
