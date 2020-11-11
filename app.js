/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: "How long is the Nile River?",
      answers: ["4132 miles", "4978 miles", "3122 miles", "3763 miles"],
      correctAnswer: "4132 miles",
    },
    {
      question: "What is a tributary?",
      answers: [
        "A river that feeds into an ocean.",
        "A river that is less than 500 miles long.",
        "A river that contains both salt water and fresh water.",
        "A river that feeds into another river.",
      ],
      correctAnswer: "A river that feeds into another river.",
    },
    {
      question: "Which country is known as 'The land of rivers'?",
      answers: ["India", "Bangladesh", "Russia", "Zimbabwe"],
      correctAnswer: "Bangladesh",
    },
    {
      question: "What percentage of the world's water is contained in rivers?",
      answers: ["3.5%", "8.9%", "less than 1%", "1.8%"],
      correctAnswer: "less than 1%",
    },
    {
      question: "Which river is the deepest in the world?",
      answers: [
        "Nile River",
        "Amazon River",
        "Congo River",
        "Mississippi River",
      ],
      correctAnswer: "Congo River",
    },
    {
      question: "Which country has the biggest hydroelectric dam?",
      answers: ["Brazil", "Venezuela", "China", "USA"],
      correctAnswer: "China",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

// ****************** Controllers and Reference Functions *********************

// Resets the questionNumber if the quiz is completed, increments it if it is incomplete
function updateQuestionNumber() {
  if (STORE.questionNumber === STORE.questions.length + 1) {
    STORE.questionNumber = 0;
  } else {
    STORE.questionNumber++;
  }
}

// Retrieves and store the users current choice
function getUserChoice() {
  let selectedChoice = $("input[name=quizQuestions]:checked").val();
  return selectedChoice;
}

// Used for indexing based on the current question number
function indexQuestion() {
  const index = STORE.questionNumber - 1;
  return index;
}

// Adds the disabled attribute after the submit button is clicked
function disableBtnAfterSub() {
  for (let i = 0; i < STORE.questions.length; i++) {
    $(`input[id=answer-${i}]`).attr("disabled", "disabled");
  }
}

// Removes the disabled attribute after the next button is clicked
function reenableBtnAfterNext() {
  for (let i = 0; i < STORE.questions.length; i++) {
    $(`input[id=answer-${i}]`).removeAttr("disabled");
  }
}

// Checks the user's answer against the correct answer and returns a boolean
function checkAnswer() {
  if (getUserChoice() === STORE.questions[indexQuestion()].correctAnswer) {
    return true;
  } else {
    return false;
  }
}

// Increments the score in STORE
function addToScore() {
  STORE.score++;
}

// Controls the state of the quizStarted boolean
function toggleQuizStarted() {
  STORE.quizStarted = !STORE.quizStarted;
}

/********** TEMPLATE GENERATION FUNCTIONS **********/

// Generates the landing page and prompts the user to start
function createStartCard() {
  return `</div>
    <div class="card beginCard">
      <form id="start-form">
        <h2>Welcome! Click start to begin!</h2>
        <input class="btn" id="start-js" type="submit" value="Start" />
      </form>
      <img
        src="images/jack-anstey-HtUBBdNDxpQ-unsplash.jpg"
        alt="Image of calm river between mountains"
      />
    </div>`;
}

// Generates and returns each question card
function generateQuestionCard() {
  return `<div class="scorecard">
  <p>Score: ${STORE.score}/6</p>
  <p>Question: ${STORE.questionNumber}/6</p>
</div>
  <div class="card">
  <form id="quiz-form">
    <h3>${STORE.questions[indexQuestion()].question}</h3>
    <div>
      <input
        type="radio"
        id="answer-0"
        name="quizQuestions"
        value="${STORE.questions[indexQuestion()].answers[0]}"
        required
      />
      <label for="answer-0">${
        STORE.questions[indexQuestion()].answers[0]
      }</label>
    </div>
    <div>
      <input
        type="radio"
        id="answer-1"
        name="quizQuestions"
        value="${STORE.questions[indexQuestion()].answers[1]}"
      />
      <label for="answer-1">${
        STORE.questions[indexQuestion()].answers[1]
      }</label>
    </div>
    <div>
      <input
        type="radio"
        id="answer-2"
        name="quizQuestions"
        value="${STORE.questions[indexQuestion()].answers[2]}"  
      />
      <label for="answer-2">${
        STORE.questions[indexQuestion()].answers[2]
      }</label>
    </div>
    <div>
      <input
        type="radio"
        id="answer-3"
        name="quizQuestions"
        value="${STORE.questions[indexQuestion()].answers[3]}"
      />
      <label for="answer-3">${
        STORE.questions[indexQuestion()].answers[3]
      }</label>
    </div>
    <div id="js-sub-div">
      <input class="btn" id="js-sub-btn" type="submit" value="Submit" />
    </div>
  </form>
</div>`;
}

// Generates and returns the final score card
function generateScoreCard() {
  return `<div class="card">
    <h2>You've completed the quiz!</h2>
    <h3>Here is your score: ${STORE.score}/6</h3>
    <form id="js-try-again">
    <input class="btn" type="submit" value="Try again" />
    </form>
  </div>`;
}

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// Primary rendering function that renders each card to the screen
function render() {
  if (STORE.questionNumber === STORE.questions.length + 1) {
    $("main").html(generateScoreCard());
  } else if (!STORE.quizStarted) {
    $("main").html(createStartCard());
  } else {
    $("main").html(generateQuestionCard());
  }
}

// Renders the transitional phase of answer verification
function transition() {
  $("#js-sub-btn").remove();
  $("#quiz-form").after(
    '<form id="next-form"><input class="btn" id="js-next-btn" type="submit" value="Next Question" /></form>'
  );
  if (checkAnswer()) {
    $(
      `label[for=answer-${STORE.questions[indexQuestion()].answers.indexOf(
        getUserChoice()
      )}`
    ).after("<div id='correct'><p>That is correct!</p></div>");
    updateQuestionNumber();
    addToScore();
  } else {
    $(
      `label[for=answer-${STORE.questions[indexQuestion()].answers.indexOf(
        getUserChoice()
      )}`
    ).after(
      `<div id='incorrect'><p>That is incorrect! The correct answer is: ${
        STORE.questions[indexQuestion()].correctAnswer
      }</p></div>`
    );
    updateQuestionNumber();
  }
}

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// Event handler for user pressing the start button on the first card
function startButtonClick() {
  $("#start-form").submit(function (event) {
    event.preventDefault();
    toggleQuizStarted();
    updateQuestionNumber();
    render();
  });
}

// Event handler for user pressing the submit button on the question cards
function submitButtonClick() {
  $("main").on("submit", "#quiz-form", function (event) {
    event.preventDefault();
    transition();
    disableBtnAfterSub();
  });
}

// Event handler for the user pressing the next button
function nextBtnClick() {
  $("main").on("submit", "#next-form", function (event) {
    event.preventDefault();
    reenableBtnAfterNext();
    render();
  });
}

// Event handler for restarting the quiz
function tryAgainButtonClick() {
  $("main").on("submit", "#js-try-again", function (event) {
    event.preventDefault();
    updateQuestionNumber();
    toggleQuizStarted();
    render();
  });
}

// These functions handle events (submit, click, etc)

// Overall handler responsible for calling event listeners and render(initially)
function handler() {
  render();
  startButtonClick();
  submitButtonClick();
  tryAgainButtonClick();
  nextBtnClick();
}

// Calls the handler function once the page has loaded
$(handler);
