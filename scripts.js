function EnrollTest(options) {
  var container = document.querySelector(options.containerSelector);
  console.log("oke 1");
  if (container) {
    var cardElements = container.querySelectorAll(options.cardsSelector);

    if (!cardElements) return null;
    options.rules.forEach((rule) => {
      console.log("oke 2");
      cardElements.forEach((cardElement) => {
        var buttonsElement = cardElement.querySelectorAll(rule.buttonsSelector);
        console.log("oke 3");
        buttonsElement.forEach((button) => {
          button.addEventListener("click", function () {
            if (button.matches(rule.testsSelector)) return rule.testsSelector;
            return rule.solutionsSelector;
          });
        });
      });
    });
  }
}

EnrollTest.activate = function (buttons, testSelector, solutionsSelector) {
  return {
    buttonsSelector: buttons,
    testsSelector: testSelector,
    solutionsSelector: solutionsSelector,
  };
};
