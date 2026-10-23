// const requestURL = () => 'https://jsonplaceholder.typicode.com'  //comments,posts,users,photos,albums,todos

export const requestURL = () => 'https://jsonplaceholder.typicode.com'
export default handleUserPhotos = async () => {
  try {
    const response = await fetch(`${requestURL()}/photos`)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(`Failed to load the data:  ${response.statusText}`)
    }
    if (!Array.isArray(data)) {
      throw new Error(
        `Expected array  format for the data:  ${response.statusText}`
      )
    }
    return data
  } catch (err) {
    console.log(`An error has ocurred: ${err.stack}`)
    return []
  } finally {
    console.log(`Processing the data...`)
  }
}
