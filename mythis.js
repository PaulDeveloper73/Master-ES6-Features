const video = {
  title: 'ES6 Features',
  description: 'Master ES6 features in React JS v18.0.0',
  tags: ['ES6', 'React JS', 'JavaScript'],
  duration: 120,
  getVideoDetails: function () {
    return `Title: ${this.title}, Description: ${this.description}, Duration: ${this.duration} seconds`
  },
  myObject: function () {
    console.log(this)
  }
}
video.stop = function () {
  console.log(`Stopping video: ${this}`)
}
console.log('<------------ Extract video Details from function ------------> ')
console.log(video.getVideoDetails())
console.log('Other way')
console.log('Video title is: ' + video.title)
console.log('My entire object')
console.log(video.myObject())
console.log('Data loading..')

export default video
