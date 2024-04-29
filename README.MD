# StuDocu Quality Assurance Engineer Assignment

##### Creating user acceptance tests that can cover frontend app.
###### Assignment requirements and tips:
- This test consists of two parts: a coding part as an Automation Testing Assignment an a written part as a Documentation.
- For the documentation, we would like to receive preferably an MD file (readme) with your insights.
- Explore this opportunity beyond the scope of this simple challenge by explaining how you proceed with the analysis of this project, planning of your tasks, technical solution selection, design pattern choice, implementation, execution, etc.
- You can think about documentation part both as the presentation of the project to a stakeholder and as the technical documentation for the team who could join you for maintaining or extending the project with instructions about how to use it.
- Show your knowledge not only regarding coding but also regarding integrating different features to an automation project as reporting, parallel execution, retries, screenshots and logging when failing, etc.
- The technical solution choices regarding language and framework are up to you, however we would prefer to see something on JS, TS or PY and possibly Playwright framework.

## Overview
This test plan aims to ensure that all functionalities of the "The awesome Q/A tool" page are working as expected, including interactive elements and content display. Test cases provided include tests for UI and functional interactions.
As a part of future updates and test coverage improvments, it might be relevant to add visual testing and accessibility checks. 
Out of scope: security testing, any test scenarios related to backend or integration with backend.
In case the product will be updated, extened, backend part added, it would be required to build up and support a healthy test pyramid(unit, integration, system testing).  
It is important to consider, there are no any known or presented acceptance criteria provided for the system under test. Therefore the plan aims to achieve a demonstration of exploratory testing strategy and deliverabals. As a result some behaviour might be falsely considered as defected or vice versa(which would be clairified in future discussions about the product). System under test: "The awesome Q/A tool" frontend page.

### Test Environment
* Browsers: Chrome, Firefox, Safari
* Devices: out of scope, but mobile and tablet browser viewports will be used to verify web page opened on different devices 
For further browser or device coverage modifications, it is important to determine what type of devices represent target audience of the app from business perspective.


## Test Cases
I managed to come up with 7 groups of user acceptance test cases
- _Title and Content Verification_ --- Testing the titles and sidebar text are correctly displayed
- _List of Questions_ --- Testing the question list is interactive and displays answers upon clicking.
- _Input Fields Validation_ --- Testing the input fields for questions and answers are accepting text and different kinds of special characters
- _Create Question Functionality_ --- Testing the creation of a new question and answer
- _Sort Questions Functionality_ --- Testing the sort questions behaviour
- _Remove Questions Functionality_ --- Testing the remove questions behaviour, impact on different page elements
- _Sidebar questions counter_ --- Testing sidebar text reflects actual number of created questions


```
Title and Content Verification | Should display title of the page and content titles
Title and Content Verification | Should display 'Created questions' title and its helper text
Title and Content Verification | Should display 'Create a new question' title and its helper text
```

```
List of Questions | Should display answer upon clicking on question
List of Questions | Should display relevant answer when clicking on other question, while the previous is displayed as well
List of Questions | Should display relevant answer on click even with 100 questions present
```

```
Input Fields Validation | Should not allow empty question field when adding new question
Input Fields Validation | Should not allow empty answer field when adding new question
Input Fields Validation | Should not allow whitespace only in question field when adding new question
Input Fields Validation | Should not allow whitespace only in answer field when adding new question
Input Fields Validation | Should allow 4k characters long input for a question
Input Fields Validation | Should allow 4k characters long input for an answer
Input Fields Validation | Should allow ACHII characters as input for a question
Input Fields Validation | Should allow ACHII characters input for an answer
Input Fields Validation | Should allow Unicode characters as input for a question
Input Fields Validation | Should allow Unicode characters as input for an answer
```

```
Create Question Functionality | Should add new question at the bottom of existing list
Create Question Functionality | Should not allow to create duplicated questions
```

```
Sort Questions Functionality | Should sort questions in ascending order
Sort Questions Functionality | Should keep expanded answers visibility after sorting questions
```

```
Remove Questions Functionality | Should update page elements accordingly when questions are removed
Remove Questions Functionality | Should hide alert messages and corresponding elements when there is at least one question added
```

```
Sidebar questions counter | Should update sidebar text to reflect no questions present
Sidebar questions counter | Should update sidebar to reflect only 1 qestions present
Sidebar questions counter | Should update sidebar to reflect more than 100 qestions present
```


## Test Automation
To implement test automation of the test cases above a following tech stack was used:
- [NodeJs] --- runtime
- [Javascript] --- programming language
- [Playwright](https://playwright.dev/) --- web browser automation library
- [Faker](https://www.npmjs.com/package/faker) --- random data generator library

### How to

Before proceeding with the runing tests you should make sure you have [Git](https://git-scm.com/downloads) and [NodeJs](https://nodejs.org/en/) installed on your machine
Once ready run the following code snippet line by line using your favorite terminal
```sh
git clone https://github.com/otdrc/qa-engineer-assignment.git
cd qa-engineer-assignment
npm i
npx playwright install
```
#### Out of the box test cases are configured to run headless meaning no browser will open it's interface. To change this behavior please modify `playwright.config.js` in accordance to your needs.

>To proceed with tests run
```
npm run test
```

###### For additional ways of running tests please consult the [Playwrigth test-cli](https://playwright.dev/docs/test-cli/) documentation

After the test run the test results are produced in accordance to `playwright.config.js` setup. You can find test results under `playwright-report` folder. 

### Test runner configuration
Playwright uses it's own config to define a behavior of the test run. You can find it within the `playwright.config.js` file in the `frontend-app-tests` folder. For more details on how it works please visit [Playwright Configuration](https://playwright.dev/docs/test-configuration) page



### Known issues and things to improve
- Potenial defect: question with whitespace input only could be created which results in empty questions
- Potenial defect: questions sorting with open answers keeps open answers by the position in the Dom rather, questions which answers were open before sorting are closed instead.
- Potenial defect: duplicated questions with duplicated answers could be created, even though there are no any acceptance criteria or requirements to invalidate the behaviour, in might worth looking into and redefine the expected behaviour
- Code smeels: Locator.hover() over element in webkit didn't provide expected behaviour, so, as a result a workaround has been implemented to cover all devices. Might require further investigation in playwright known issues or behaviour specifics in webkit broswer type. 