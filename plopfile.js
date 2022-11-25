
// // in nodejs inside ESM
// export default function(plop) {
//   // create your generators here
//   plop.setGenerator('basics', {
//     description: 'this is a skeleton plopfile',
//     prompts: [], // array of inquirer prompts
//     actions: [], // array of actions
//   })
// }
let componentGenerator = require('./plop-templates/component/prompt')
let viewGenerator = require('./plop-templates/view/prompt')


module.exports = function(plop){
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('view', viewGenerator)

}