The awesome Q/A tool

Overview
This test plan aims to ensure that all functionalities of the "The awesome Q/A tool" page are working as expected, including interactive elements and content display. This plan includes tests for UI, functionality, usability.Out of scope: security testing, any test scenarios related to backend or integration with backend.It is important to consider, there are no any known or presented acceptance criteria provided for the system under test. Therefore the plan aims to achieve a demonstration of exploratory testing strategy and deliverabals. As a result some behaviour might be falsely considered as defected.System under test: http://[::]:8000/
Test Environment
* Browsers: Chrome, Firefox, Safari
* Devices: out of scope, but mobile and tablets browser viewports will be used to verify the page behaviour when web page is open on different devices
Prerequisites
* The test environment should be up and running locally.
Test Cases
1. Title and Content Verification
	Validate Created Questions title has a helper text
	Validate Create a new question title has a helper text
Objective: Ensure the title and sidebar text are correctly displayed.
* Steps:
    1. Open the page in a web browser.
* Expected Result:
    * The title "The awesome Q/A tool" is visible at the top.
    * Sidebar text "some text here" is displayed under the title.
    * Static form titles are displayed.

2. List of Questions	Validate when clicking on question, the answer is displayed below
	Validate when clicking on other question, the relevant answer is displayed, while the previous is displayed as well	Validate the page is still rendering after creating 100 questions
Objective: Verify the question list is interactive and displays answers upon clicking.
* Steps:
    1. Click on the first question in the list.
    2. Click on the second question in the list.
* Expected Result:
    * Clicking a question reveals its answer directly below it.
    * Previously opened answers can remain open or close based on the functionality decided.

3. Input Fields Validation	Validate input field for a questions could not be remained empty (check when both empty and only this one)
	Validate input field for an answer could not be remained empty (check when both empty and only this one)	Validate possible whitespace is not considered a question	Validate possible whitespace is not considered an answer	Validate possible too long input is acceptable for a question	Validate possible too long input is acceptable for an answer	Validate special characters are acceptable for a question	Validate special characters are acceptable for an answer	Validate non latin characters are acceptable for a question	Validate non latin characters are acceptable for an answer
Objective: Ensure the input fields for questions and answers are accepting text.
* Steps:
    1. Enter a sample question in the question input field.
    2. Enter a sample answer in the answer input field.
* Expected Result:
    * Input fields should accept text without errors.
4. Create Question Functionality	Validate created questions and answers from 3. Input Fields Validation section
Objective: Test the creation of a new question and answer.
* Steps:
    1. Enter a question in the question input field.
    2. Enter an answer in the answer input field.
    3. Click the 'create question' button.
* Expected Result:
    * New question appears in the question list.
    * Answer is linked correctly to the question and viewable on click.

5. Sort Questions Functionality		Check answers visibility before sorting		Check answers visibility after sorting		Check sorting on questions when questions and answers provided would be in opposite sorting 
Objective: Verify that the sort questions functionality is working.
* Steps:
    1. Add multiple questions to the list.
    2. Click the 'sort questions' button.
* Expected Result:
    * Questions are sorted (ascend/descend based on predefined criteria).

6. Remove Questions Functionality		Validate hidden buttons appeared when first questions is added
Objective: Test the remove questions functionality.
* Steps:
    1. Add at least one question.
    2. Click the 'remove questions' button.
* Expected Result:
    * All questions are removed from the list and relevant message is displayed.
    * Remove and sort questions buttons as hidden as well.

7. Sidebar questions counter Functionality	Validate with 0 questions present
	Validate with 2 questions present	Validate with 100 questions present
Objective: Test sidebar text with number of questions reflects actual number of created questions
* Steps:
    1. Click the 'remove questions' button.
    2. Add at least one question.
* Expected Result:
    * Sidebar text questions count is equal to actual questions list count

8. Responsiveness and Cross-browser Testing
Objective: Ensure the page displays and functions correctly across different devices and browsers.
* Steps:
    1. Open the page on different devices and browsers.
    2. Test all functionalities listed above.
* Expected Result:
    * Consistent look and functionality across different platforms.
Post-Test Review
* Review all test cases for passed/failed status.
* Document any discrepancies or issues found.
* Recommend improvements or fixes.
Automation: 
All test scenarios provided above are covered in test automation framework using playwright, javascript.Defect1 : Questions sorting with open answers leaves open answers by the position in the Dom rather than by questions which answers were open before sorting.
Defect2 : Question with whitespace only could be created which results in empty questions
Defect3 : Duplicated questions with duplicated answers could be created
