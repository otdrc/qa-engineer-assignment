const base = require('@playwright/test');
const { QuestionAnswerToolPage } = require ('../pages/question-answer-tool-page');

exports.test = base.test.extend({
    questionAnswerTool: async ({ page }, use) => {
        const questionAnswerToolPage = new QuestionAnswerToolPage(page);
        await questionAnswerToolPage.page.goto('')
        await questionAnswerToolPage.removeQuestions.click();
        await use(questionAnswerToolPage);
  }
});
exports.expect = base.expect;