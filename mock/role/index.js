
module.exports = [
  {
    url: 'usemock/firstexample',
    type: 'get',
    response: () => {
      return {
        status: 200,
        data: {
          message: 'this is first example',
          name: 'tony'
        }
      }
    }
  },

  {
    url: 'usemock/secondexample',
    type: 'get',
    response: () => {
      return {
        status: 200,
        data: {
          message: 'this is second example',
          name: 'kity'
        }
      }
    }
  },
]