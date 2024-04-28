const base = require('@playwright/test');
const { QuestionAnswerToolPage } = require ('../pages/question-answer-tool-page');

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({
    questionAnswerTool: async ({ page }, use) => {
        const questionAnswerToolPage = new QuestionAnswerToolPage(page);
        await questionAnswerToolPage.page.goto('')
        await questionAnswerToolPage.removeQuestions.click();
        await use(questionAnswerToolPage);
  }
});
exports.expect = base.expect;