const { expect } = require('@playwright/test');

exports.QuestionAnswerToolPage = class QuestionAnswerToolPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('h1', { hasText: 'The awesome Q/A tool' });
    this.sidebarMessage = page.locator('[class = "sidebar"]');
    this.questionsListTitle = page.locator('h2', { hasText: 'Created questions' });
    this.createAQuestionFormTitle = page.locator('h2', { hasText: 'Create a new question' });
    this.questionsTooltip = page.locator('div.questions span');
    this.createAQuestionTooltip = page.locator('div.question-maker span');
    this.inputQuestion = page.getByLabel('question');
    this.inputAnswer = page.getByLabel('answer');
    this.submitQuestion = page.getByRole('button', { name: 'Create question' });
    this.listOfQuestions = page.locator('[class = "card"]');
    this.question = page.locator('li div.question__question')
    this.answer = page.locator('li p.question__answer');
    this.sortQuestions = page.getByRole('button', { name: 'Sort questions' })
    this.removeQuestions = page.getByRole('button', { name: 'Remove questions' })
    this.noQuestionsAlert = page.locator('div.alert-danger');
  }

  async expand(question) {
    if (question === undefined) {
      throw new Error('Question text not provided.');
    }
    await this.page.getByText(question).nth(0).click();
  }

  async add(question, answer) {
    if (question === undefined || answer === undefined) {
      throw new Error('Question or answer text not provided.');
    }
    await this.inputQuestion.fill(question);
    await this.inputAnswer.fill(answer);
    await this.submitQuestion.click();
  }
}