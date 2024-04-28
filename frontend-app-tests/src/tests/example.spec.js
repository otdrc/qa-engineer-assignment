// @ts-check
const { test, expect } = require('@playwright/test');
const { generateQuestionAnswerPair, generateMultipleQuestionAnswerPairs } = require('../../helpers/test-data-generator');
const { QuestionAnswerToolPage } = require ('../../pages/question-answer-tool-page');
const { beforeEach } = require('node:test');

test.beforeEach(async ({ page }) => {
  await page.goto('/')
});

test.describe('Title and Content Verification', () => {
  test.beforeEach(async ({ page }) => {
    const questionAnswerTool = new QuestionAnswerToolPage(page);
    await questionAnswerTool.removeQuestions.click();
  });

  test('title of the page and content titles are correctly displayed', async ({ page }) => {
    const questionAnswerTool = new QuestionAnswerToolPage(page);
    await expect.soft(questionAnswerTool.pageTitle).toBeVisible();
    await expect.soft(questionAnswerTool.questionsListTitle).toBeVisible();
    await expect.soft(questionAnswerTool.createAQuestionFormTitle).toBeVisible();
  });

});

test.describe('List of Questions', () => {
  test.beforeEach(async ({ page }) => {
    const questionAnswerTool = new QuestionAnswerToolPage(page);
    await questionAnswerTool.removeQuestions.click();
  });

  test('validate when clicking on question, the answer is displayed', async ({ page }) => {
    const questionAnswerPair = generateQuestionAnswerPair();
    const questionAnswerTool = new QuestionAnswerToolPage(page);

    await questionAnswerTool.inputQuestion.fill(questionAnswerPair.question);
    await questionAnswerTool.inputAnswer.fill(questionAnswerPair.answer);
    await questionAnswerTool.submitQuestion.click();

    await expect.soft(questionAnswerTool.question).toHaveText(questionAnswerPair.question);
    await expect.soft(questionAnswerTool.answer).toBeHidden();
    await questionAnswerTool.expand(questionAnswerPair.question);

    await expect.soft(questionAnswerTool.answer).toBeVisible();
    await expect.soft(questionAnswerTool.answer).toHaveText(questionAnswerPair.answer);

  });

  test('validate the page is still responsive after creating 100 questions', async ({ page }) => {

    const pairOf100 = generateMultipleQuestionAnswerPairs(100);
    const randomPairNumber = Math.floor(Math.random() * pairOf100.length)
    const randomPair = pairOf100[randomPairNumber]
    const questionAnswerTool = new QuestionAnswerToolPage(page);

    // add 100 new questions on the The awesome Q/A tool one by one
    for (let pair of pairOf100) {
      await questionAnswerTool.add(pair.question, pair.answer)
    }

    await expect.soft(questionAnswerTool.question.nth(randomPairNumber)).toHaveText(randomPair.question);
    await expect.soft(questionAnswerTool.answer.nth(randomPairNumber)).toBeHidden();
    await questionAnswerTool.expand(randomPair.question);

    await expect.soft(questionAnswerTool.answer.nth(randomPairNumber)).toBeVisible();
    await expect.soft(questionAnswerTool.answer.nth(randomPairNumber)).toHaveText(randomPair.answer);

  });
}); 