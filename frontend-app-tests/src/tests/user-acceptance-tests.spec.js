// @ts-check
const { test, expect } = require('../fixtures/question-answer-tool.fixture');
const { generateQuestionAnswerPair, generateMultipleQuestionAnswerPairs } = require('../helpers/test-data-generator');
const inputFieldsValidation = require('../test-data/input-fields-validation.json');

test.describe('Title and Content Verification', () => {
  test('should display title of the page and content titles', async ({ questionAnswerTool }) => {
    await expect.soft(questionAnswerTool.pageTitle).toBeVisible();
    await expect.soft(questionAnswerTool.questionsListTitle).toBeVisible();
    await expect.soft(questionAnswerTool.createAQuestionFormTitle).toBeVisible();
  });

  test('should display [Created questions] title and its helper text', async ({ questionAnswerTool }) => {
    await expect.soft(questionAnswerTool.questionsTooltip).not.toBeVisible();
    await questionAnswerTool.hover('Created questions');

    await expect.soft(questionAnswerTool.questionsTooltip).toBeVisible();
    await expect.soft(questionAnswerTool.questionsTooltip).toHaveText('Here you can find the created questions and their answers.');
  });

  test('should display [Create a new question] title and its helper text', async ({ questionAnswerTool }) => {
    await expect.soft(questionAnswerTool.createAQuestionTooltip).not.toBeVisible();
    await questionAnswerTool.hover('Create a new question');

    await expect.soft(questionAnswerTool.createAQuestionTooltip).toBeVisible();
    await expect.soft(questionAnswerTool.createAQuestionTooltip).toHaveText('Here you can create new questions and their answers.');
  });

});

test.describe('List of Questions', () => {

  test('should display answer upon clicking on question', async ({ questionAnswerTool }) => {
    const questionAnswerPair = generateQuestionAnswerPair();

    await questionAnswerTool.inputQuestion.fill(questionAnswerPair.question);
    await questionAnswerTool.inputAnswer.fill(questionAnswerPair.answer);
    await questionAnswerTool.submitQuestion.click();

    await expect.soft(questionAnswerTool.question).toHaveText(questionAnswerPair.question);
    await expect.soft(questionAnswerTool.answer).toBeHidden();
    await questionAnswerTool.expand(questionAnswerPair.question);

    await expect.soft(questionAnswerTool.answer).toBeVisible();
    await expect.soft(questionAnswerTool.answer).toHaveText(questionAnswerPair.answer);

  });

  test('should display relevant answer when clicking on other question, while the previous is displayed as well', async ({ questionAnswerTool }) => {

    const firstPair = generateQuestionAnswerPair();
    const secondPair = generateQuestionAnswerPair();

    await questionAnswerTool.add(firstPair.question, firstPair.answer);
    await questionAnswerTool.add(secondPair.question, secondPair.answer);

    await expect.soft(questionAnswerTool.question.nth(0)).toHaveText(firstPair.question);
    await expect.soft(questionAnswerTool.answer.nth(0)).toBeHidden();
    await expect.soft(questionAnswerTool.question.nth(1)).toHaveText(secondPair.question);
    await expect.soft(questionAnswerTool.answer.nth(1)).toBeHidden();
    await questionAnswerTool.expand(firstPair.question);
    await questionAnswerTool.expand(secondPair.question);

    await expect.soft(questionAnswerTool.answer.nth(0)).toBeVisible();
    await expect.soft(questionAnswerTool.answer.nth(0)).toHaveText(firstPair.answer);
    await expect.soft(questionAnswerTool.answer.nth(1)).toBeVisible();
    await expect.soft(questionAnswerTool.answer.nth(1)).toHaveText(secondPair.answer);

  });

  test('should display relevant answer on click even with 100 questions present', async ({ questionAnswerTool }) => {

    const pairOf100 = generateMultipleQuestionAnswerPairs(100);
    const randomPairNumber = Math.floor(Math.random() * pairOf100.length)
    const randomPair = pairOf100[randomPairNumber]

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

test.describe('Create Question Functionality', () => {

  test('should add new question at the bottom of existing list', async ({ questionAnswerTool }) => {

    const pairOf2 = generateMultipleQuestionAnswerPairs(2);

    // add new questions on the The awesome Q/A tool one by one
    for (let pair of pairOf2) {
      await questionAnswerTool.add(pair.question, pair.answer)
    }

    await expect.soft(questionAnswerTool.question.nth(0)).toHaveText(pairOf2[0].question);
    await expect.soft(questionAnswerTool.question.nth(1)).toHaveText(pairOf2[1].question);

  });

  test('should not allow to create duplicated questions', async ({ questionAnswerTool }) => {
    const questionAnswerPair = generateQuestionAnswerPair();

    await questionAnswerTool.add(questionAnswerPair.question, questionAnswerPair.answer);
    await questionAnswerTool.add(questionAnswerPair.question, questionAnswerPair.answer);

    await expect.soft(questionAnswerTool.question).toHaveCount(1);
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find 1 question. Feel free to create your own questions!');
  });
});

test.describe('Input Fields Validation', () => {

  test('should not allow empty field when adding new question or answer', async ({ questionAnswerTool }) => {

    const pair = generateQuestionAnswerPair();

    await expect.soft(questionAnswerTool.inputQuestion).toHaveAttribute('required');
    await expect.soft(questionAnswerTool.inputAnswer).toHaveAttribute('required');

    //input field for question gets focused on submit button if question input is empty
    await questionAnswerTool.submitQuestion.click();
    await expect.soft(questionAnswerTool.inputQuestion).toBeFocused();

    //input field for answer gets focused on submit button if answer input is empty
    await questionAnswerTool.inputQuestion.fill(pair.question);
    await questionAnswerTool.submitQuestion.click();
    await expect.soft(questionAnswerTool.inputAnswer).toBeFocused();

    await questionAnswerTool.noQuestionsAlert.isVisible();
    await expect.soft(questionAnswerTool.noQuestionsAlert).toHaveText('No questions yet :-(');
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find no questions. Feel free to create your own questions!');

  });

  test('should not allow whitespace only in question or answer field when adding new question', async ({ questionAnswerTool }) => {

    await questionAnswerTool.add(inputFieldsValidation.whiteSpaceOnlyInput, inputFieldsValidation.whiteSpaceOnlyInput);
    await expect.soft(questionAnswerTool.inputQuestion).toBeFocused();

    await questionAnswerTool.noQuestionsAlert.isVisible();
    await expect.soft(questionAnswerTool.noQuestionsAlert).toHaveText('No questions yet :-(');
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find no questions. Feel free to create your own questions!');

  });

  test('should allow 4k characters long input for a question or answer', async ({ questionAnswerTool }) => {

    await questionAnswerTool.add(inputFieldsValidation.long4kCharactersInput, inputFieldsValidation.long4kCharactersInput);

    await expect.soft(questionAnswerTool.question).toHaveCount(1);
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find 1 question. Feel free to create your own questions!');

    await expect.soft(questionAnswerTool.question).toHaveText(inputFieldsValidation.long4kCharactersInput);
    await questionAnswerTool.expand(inputFieldsValidation.long4kCharactersInput);
    await expect.soft(questionAnswerTool.answer).toHaveText(inputFieldsValidation.long4kCharactersInput);

  });

  test('should allow ACHII characters input for a question or answer', async ({ questionAnswerTool }) => {

    await questionAnswerTool.add(inputFieldsValidation.achiiCharactersInput, inputFieldsValidation.achiiCharactersInput);

    await expect.soft(questionAnswerTool.question).toHaveCount(1);
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find 1 question. Feel free to create your own questions!');

    await expect.soft(questionAnswerTool.question).toHaveText(inputFieldsValidation.achiiCharactersInput);
    await questionAnswerTool.expand(inputFieldsValidation.achiiCharactersInput);
    await expect.soft(questionAnswerTool.answer).toHaveText(inputFieldsValidation.achiiCharactersInput);

  });

  test('should allow Unicode 14.0 characters as input for a question or answer', async ({ questionAnswerTool }) => {

    await questionAnswerTool.add(inputFieldsValidation.unicodeSpecialCharactersInput, inputFieldsValidation.unicodeSpecialCharactersInput);

    await expect.soft(questionAnswerTool.question).toHaveCount(1);
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find 1 question. Feel free to create your own questions!');

    await expect.soft(questionAnswerTool.question).toHaveText(inputFieldsValidation.unicodeSpecialCharactersInput);
    await questionAnswerTool.expand(inputFieldsValidation.unicodeSpecialCharactersInput);
    await expect.soft(questionAnswerTool.answer).toHaveText(inputFieldsValidation.unicodeSpecialCharactersInput);

  });

});

test.describe('Sort Questions Functionality', () => {

  test('should sort questions in ascending order', async ({ questionAnswerTool }) => {

    const pairOf8 = generateMultipleQuestionAnswerPairs(8);
    const questionsInAscOrder = pairOf8.map(pair => pair.question).sort();

    // add 8 new questions on the The awesome Q/A tool one by one
    for (let pair of pairOf8) {
      await questionAnswerTool.add(pair.question, pair.answer)
    }
    await questionAnswerTool.sortQuestions.click();
    expect.soft(await questionAnswerTool.question.allTextContents()).toStrictEqual(questionsInAscOrder)
  })

  test('should keep expanded answers visibility after sorting questions', async ({ questionAnswerTool }) => {

    const pairOf7 = generateMultipleQuestionAnswerPairs(7);
    const randomPairNumber = Math.floor(Math.random() * pairOf7.length)
    const randomPair = pairOf7[randomPairNumber]

    // add 7 new questions on the The awesome Q/A tool one by one
    for (let pair of pairOf7) {
      await questionAnswerTool.add(pair.question, pair.answer)
    }

    await expect.soft(questionAnswerTool.question.nth(randomPairNumber)).toHaveText(randomPair.question);
    await expect.soft(questionAnswerTool.answer.nth(randomPairNumber)).toBeHidden();
    await questionAnswerTool.expand(randomPair.question);

    await questionAnswerTool.sortQuestions.click();

    await expect.soft(questionAnswerTool.answer.nth(randomPairNumber)).toBeVisible();
    await expect.soft(questionAnswerTool.answer.nth(randomPairNumber)).toHaveText(randomPair.answer);
  })
})

test.describe('Remove Questions Functionality', () => {
  test('should update page elements accordingly when questions are removed', async ({ questionAnswerTool }) => {

    const questionAnswerPair = generateQuestionAnswerPair();

    await questionAnswerTool.add(questionAnswerPair.question, questionAnswerPair.answer);

    await expect.soft(questionAnswerTool.question).toHaveCount(1);
    await expect.soft(questionAnswerTool.noQuestionsAlert).not.toBeAttached();

    await questionAnswerTool.removeQuestions.click();

    await expect.soft(questionAnswerTool.noQuestionsAlert).toHaveText('No questions yet :-(');
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find no questions. Feel free to create your own questions!');
    await expect.soft(questionAnswerTool.sortQuestions).not.toBeAttached();
    await expect.soft(questionAnswerTool.removeQuestions).not.toBeAttached();

  });

  test('should hide alert messages and corresponding elements when there is at least one question added', async ({ questionAnswerTool }) => {

    const questionAnswerPair = generateQuestionAnswerPair();

    await questionAnswerTool.add(questionAnswerPair.question, questionAnswerPair.answer);
    await expect.soft(questionAnswerTool.question).toHaveCount(1);

    await expect.soft(questionAnswerTool.noQuestionsAlert).not.toBeAttached();
    await expect.soft(questionAnswerTool.sidebarMessage).not.toHaveText('no questions');
    await expect.soft(questionAnswerTool.sortQuestions).toBeEnabled();
    await expect.soft(questionAnswerTool.removeQuestions).toBeEnabled();
  })
})

test.describe('Sidebar questions counter Functionality', () => {

  test('should update sidebar text to reflect no questions present', async ({ questionAnswerTool }) => {
    
    await expect.soft(questionAnswerTool.noQuestionsAlert).toHaveText('No questions yet :-(');
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find no questions. Feel free to create your own questions!');
  
  });

  test('should update sidebar to reflect only 1 qestions present', async ({ questionAnswerTool }) => {

    const questionAnswerPair = generateQuestionAnswerPair();

    await questionAnswerTool.add(questionAnswerPair.question, questionAnswerPair.answer);

    await expect.soft(questionAnswerTool.question).toHaveCount(1);
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find 1 question. Feel free to create your own questions!');

  });

  test('should update sidebar to reflect more than 100 qestions present', async ({ questionAnswerTool }) => {

    const pairOf101 = generateMultipleQuestionAnswerPairs(101);
    const randomPairNumber = Math.floor(Math.random() * pairOf101.length)
    const randomPair = pairOf101[randomPairNumber]

    // add 100 new questions on the The awesome Q/A tool one by one
    for (let pair of pairOf101) {
      await questionAnswerTool.add(pair.question, pair.answer)
    }

    await expect.soft(questionAnswerTool.question).toHaveCount(101);
    await expect.soft(questionAnswerTool.sidebarMessage).toHaveText('Here you can find 101 questions. Feel free to create your own questions!');

  });
});