function TakeATest(exams) {
  function changeQuestion(order, rule) {
    if (rule.check(order)) {
      const card = container.querySelector(rule.cardSelector);
      const spacer = container.querySelector(rule.spacerSelector);

      card.classList.add(rule.changingClass);
      card.style.animationIterationCount = "1";
      spacer.classList.add(rule.changingClass);
      spacer.style.animationIterationCount = "1";

      setTimeout(() => {
        container.querySelector(rule.contentSelector).innerHTML =
          rule.target(order);
        container.querySelector(rule.orderSelector).innerHTML =
          order + 1 + " of " + rule.question.length;
      }, 1700 / 2);

      setTimeout(() => {
        card.classList.remove(rule.changingClass);
        card.style.animationIterationCount = "0";
        spacer.classList.remove(rule.changingClass);
        spacer.style.animationIterationCount = "0";
      }, 1700);
    }
  }

  function goNextQuestion(choice, rule) {
    if (rule.check(choose.count + 1)) {
      choose.count++;
      if (choice.matches(rule.chooseYesSelector)) choose.yesCount++;
      changeQuestion(choose.count, rule);
    }
  }

  function goHome(rule) {
    let windowClose = document.querySelector(rule.windowCloseSelector);
    windowClose.classList.add("close");
    windowClose.style.animationIterationCount = "1";

    setTimeout(() => {
      location.href = "../index.html";
    }, 500);
  }

  var container = document.querySelector(exams.containerSelector);
  // var cardImage = container.querySelector(exams.cardImageSelector);

  var choose = { count: 0, yesCount: 0 };

  if (container) {
    let rule = exams.rules[0];
    container.querySelector(rule.contentSelector).innerHTML = rule.target(0);
    container.querySelector(rule.orderSelector).innerHTML =
      1 + " of " + rule.question.length;

    exams.rules.forEach((rule) => {
      const choices = container.querySelectorAll(exams.buttonsSelector);
      if (choices) {
        const backButton = container.querySelector(exams.backButtonSelector);
        backButton.addEventListener("click", function () {
          goHome(rule);
        });

        choices.forEach((choice) => {
          choice.addEventListener("click", function () {
            goNextQuestion(choice, rule);
          });
        });
      }
    });
  }
}

TakeATest.changeQuestion = function (
  windowClose,
  card,
  changingClass,
  spacer,
  order,
  content,
  yes,
  question
) {
  return {
    windowCloseSelector: windowClose,
    cardSelector: card,
    changingClass: changingClass,
    spacerSelector: spacer,
    orderSelector: order,
    contentSelector: content,
    question: question,
    chooseYesSelector: yes,
    check: function (order) {
      return order >= 0 && order < question.length;
    },
    target: function (order) {
      return question[order];
    },
  };
};
