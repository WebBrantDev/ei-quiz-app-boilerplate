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

/********** TEMPLATE GENERATION FUNCTIONS **********/

function createStartCard() {
  return `</div>
    <div class="card beginCard">
      <form id="start-form">
        <h3>Welcome! Click start to begin!</h3>
        <input class="btn" id="start-js" type="submit" value="Start" />
      </form>
      <img
        src="images/jack-anstey-HtUBBdNDxpQ-unsplash.jpg"
        alt="Image of calm river between mountains"
      />
    </div>`;
}

function indexQuestion() {
  const index = STORE.questionNumber - 1;
  console.log(index);
  return index;
}

function generateQuestionCard() {
  return `<div class="scorecard">
  <p>Score: ${STORE.score}/6</p>
  <p>Question: ${STORE.questionNumber}/6</p>
</div>
  <div class="card">
  <form id="quiz-form">
    <h4>${STORE.questions[indexQuestion()].question}</h4>
    <div>
      <input
        type="radio"
        id="question-one"
        name="quizQuestions"
        value="${STORE.questions[indexQuestion()].answers[0]}"
        required
      />
      <label for="question-one">${
        STORE.questions[indexQuestion()].answers[0]
      }</label>
    </div>
    <div>
      <input
        type="radio"
        id="question-two"
        name="quizQuestions"
        value="${STORE.questions[indexQuestion()].answers[1]}"
      />
      <label for="question-two">${
        STORE.questions[indexQuestion()].answers[1]
      }</label>
    </div>
    <div>
      <input
        type="radio"
        id="question-three"
        name="quizQuestions"
        value="${STORE.questions[indexQuestion()].answers[2]}"
      />
      <label for="question-three">${
        STORE.questions[indexQuestion()].answers[2]
      }</label>
    </div>
    <div>
      <input
        type="radio"
        id="answer-four"
        name="quizQuestions"
        value="${STORE.questions[indexQuestion()].answers[3]}"
      />
      <label for="answer-four">${
        STORE.questions[indexQuestion()].answers[3]
      }</label>
    </div>
    <div>
      <input class="btn" id="js-sub-btn" type="submit" value="Submit" />
    </div>
  </form>
</div>`;
}

function generateScoreCard() {
  return `<div class="card">
    <h3>You've completed the quiz!</h3>
    <h4>Here is your score: ${STORE.score}/6</h4>
    <form id="js-try-again">
    <input class="btn" type="submit" value="Try again" />
    </form>
  </div>`;
}

// function generateCorrect (answer) {

// }

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

function render() {
  if (STORE.questionNumber === STORE.questions.length + 1) {
    $("main").html(generateScoreCard());
  } else if (!STORE.quizStarted) {
    $("main").html(createStartCard());
  } else {
    $("main").html(generateQuestionCard());
  }
}

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

function startButtonClick() {
  $("#start-form").submit(function (event) {
    event.preventDefault();
    toggleQuizStarted();
    updateQuestionNumber();
    render();
  });
}

function submitButtonClick() {
  $("main").on("submit", "#quiz-form", function (event) {
    event.preventDefault();

    let selectedChoice = $("input[name=quizQuestions]:checked").val();

    if (selectedChoice === STORE.questions[indexQuestion()].correctAnswer) {
      addToScore();
    }

    updateQuestionNumber();
    render();
  });
}

function addToScore() {
  STORE.score++;
}

function resetScore() {
  STORE.score = 0;
}

function tryAgainButtonClick() {
  $("main").on("submit", "#js-try-again", function (event) {
    event.preventDefault();
    updateQuestionNumber();
    toggleQuizStarted();
    render();
  });
}

function toggleQuizStarted() {
  STORE.quizStarted = !STORE.quizStarted;
  return;
}

function updateQuestionNumber() {
  if (STORE.questionNumber === STORE.questions.length + 1) {
    STORE.questionNumber = 0;
  } else {
    STORE.questionNumber++;
  }
}

// These functions handle events (submit, click, etc)

function handler() {
  render();
  startButtonClick();
  submitButtonClick();
}

$(handler);
