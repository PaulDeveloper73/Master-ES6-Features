// 8 Fetching User comments,posts,users,photos,albums,todos
// API to use: https://jsonplaceholder.typicode.com/comments
const requestURL = () => 'https://jsonplaceholder.typicode.com'

const fetchData = async dataSource => {
  try {
    const response = await fetch(`${requestURL()}/${dataSource}`)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(`Request failed`)
    }
    return data
  } catch (err) {
    console.log(`An error occurred` + err.message)
    return []
  } finally {
    console.log(`Loading data soon!`)
  }
}
const userQuery = `users` //comments,posts,users,photos,albums,todos
const userComments = await fetchData(userQuery)
if (userComments.length > 0) {
  console.log(`Data Loading Now...`)
  console.log(userComments)
  console.log('Below are the ten(10) first results')
  const first10_results = userComments.filter(comment => comment.id < 11)
  console.log(first10_results)
} else {
  console.log(`No ${userQuery} available!,Try Again !!!`)
}
