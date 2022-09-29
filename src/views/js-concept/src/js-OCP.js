/**
 * 开闭原则
 * 对扩展开放，对修改关闭
 * 
 * 案例中运用了许多技术点，所有的技术点都是为了达成
 * 对扩展开放，对修改关闭的原则，不用局促这些技术点
 * 其他技术可以达成一样可以使用。在实际开发中，要依照
 * 实际情况来进行实现
 */

// --------------
/**
 * 以下实现一个动态展示question列表
 * 没有采用开闭原则，在view中，有两个对 questType的判断
 * 即是 AnswerType.Choice 和 AnswerType.Input
 * 如果 AnswerType 新增 类型，则需要对view进行修改
 *（
 *  这类问题，在开发中常出现，即是原来没有这个需求，后面新增，
 *  如果采用该展示例子的方法，后续出现新需求就需要经常修改和
 *  多处修改，非常不便
 * ）
 * 
 */
// 问题类型
let AnswerType = {
  Choice: 0,
  Input: 1
};

// 问题实体
function question(label, answerType, choices) {
  return {
      label: label,
      answerType: answerType,
      choices: choices // 这里的choices是可选参数
  };
}

let view = (function () {
  // render一个问题
  function renderQuestion(target, question) {
      let questionWrapper = document.createElement('div');
      questionWrapper.className = 'question';

      let questionLabel = document.createElement('div');
      questionLabel.className = 'question-label';
      let label = document.createTextNode(question.label);
      questionLabel.appendChild(label);

      let answer = document.createElement('div');
      answer.className = 'question-input';

      // 根据不同的类型展示不同的代码：分别是下拉菜单和输入框两种
      if (question.answerType === AnswerType.Choice) {
          let input = document.createElement('select');
          let len = question.choices.length;
          for (let i = 0; i < len; i++) {
              let option = document.createElement('option');
              option.text = question.choices[i];
              option.value = question.choices[i];
              input.appendChild(option);
          }
      }
      else if (question.answerType === AnswerType.Input) {
          let input = document.createElement('input');
          input.type = 'text';
      }

      answer.appendChild(input);
      questionWrapper.appendChild(questionLabel);
      questionWrapper.appendChild(answer);
      target.appendChild(questionWrapper);
  }

  return {
      // 遍历所有的问题列表进行展示
      render: function (target, questions) {
          for (let i = 0; i < questions.length; i++) {
              renderQuestion(target, questions[i]);
          };
      }
  };
})();

let questions = [
              question('Have you used tobacco products within the last 30 days?', AnswerType.Choice, ['Yes', 'No']),
              question('What medications are you currently using?', AnswerType.Input)
              ];

let questionRegion = document.getElementById('questions');
view.render(questionRegion, questions);

// --------------

/**
 * 改造后
 * 首先，questionCreator方法的创建，可以让我们使用模板方法模式将处理问题的功能delegat给针对每个问题类型的扩展代码renderInput上。
 * 其次，我们用一个私有的spec属性替换掉了前面question方法的构造函数属性，因为我们封装了render行为进行操作，不再需要把这些属性暴露给外部代码了。
 * 第三，我们为每个问题类型创建一个对象进行各自的代码实现，但每个实现里都必须包含renderInput方法以便覆盖questionCreator方法里的renderInput代码，这就是我们常说的策略模式。
 * 通过重构，我们可以去除不必要的问题类型的枚举AnswerType，而且可以让choices作为choiceQuestionCreator函数的必选参数（之前的版本是一个可选参数
 */
 function questionCreator(spec, my) {
  let that = {};

  my = my || {};
  my.label = spec.label;

  my.renderInput = function() {
      throw "not implemented";
      // 这里renderInput没有实现，主要目的是让各自问题类型的实现代码去覆盖整个方法
  };

  that.render = function(target) {
      let questionWrapper = document.createElement('div');
      questionWrapper.className = 'question';

      let questionLabel = document.createElement('div');
      questionLabel.className = 'question-label';
      let label = document.createTextNode(spec.label);
      questionLabel.appendChild(label);

      let answer = my.renderInput();
      /**
       * 在这里例子里，主要是因为my的renderInput是
       * 引用类型，所以在实现choiceQuestionCreator和
       * inputQuestionCreator的时候，可以先传递创建完
       * 实例，然后修改传递的my.renderInput来覆盖
       * questionCreator中的初始化的renderInput，然后
       * 返回的实例就具备了各自的renderInput。使用各自的
       * Creator创建的实例调用render就能达到各自想要的效果。
       * 同时，传递进去的my，可以赋值questionCreator的私有变量
       * 这样，通过questionCreator(spec,my)后，再次使用my，
       * my就具备了questionCreator的私有变量
       */


      questionWrapper.appendChild(questionLabel);
      questionWrapper.appendChild(answer);
      return questionWrapper;
  };

  return that;
}

function choiceQuestionCreator(spec) {

  let my = {},
      that = questionCreator(spec, my);

  my.renderInput = function() {
      let input = document.createElement('select');
      let len = spec.choices.length;
      for (let i = 0; i < len; i++) {
          let option = document.createElement('option');
          option.text = spec.choices[i];
          option.value = spec.choices[i];
          input.appendChild(option);
      }

      return input;
  };

  return that;
}

function inputQuestionCreator(spec) {

  let my = {},
      that = questionCreator(spec, my);

  my.renderInput = function() {
      let input = document.createElement('input');
      input.type = 'text';
      return input;
  };

  return that;
}

let viewAfter = {
  render: function(target, questions) {
      for (let i = 0; i < questions.length; i++) {
          target.appendChild(questions[i].render());
      }
  }
};

let questionsAfter = [
  choiceQuestionCreator({
  label: 'Have you used tobacco products within the last 30 days?',
  choices: ['Yes', 'No']
}),
  inputQuestionCreator({
  label: 'What medications are you currently using?'
})
  ];

let questionRegionAfter = document.getElementById('questions');

view.render(questionRegion, questions);