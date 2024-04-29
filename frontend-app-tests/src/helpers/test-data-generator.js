const { faker } = require('@faker-js/faker');


export function generateQuestionAnswerPair() {
    return {
      question: faker.string.uuid() + ' - To be or not to be?',
      answer: faker.string.uuid() + ' answer to the Ultimate Question of Life, the Universe, and Everything',
    };
  }

export function generateMultipleQuestionAnswerPairs(count) {
    return faker.helpers.multiple(generateQuestionAnswerPair, {
        count: count,
      });  
  };