// Placeholder JavaScript code for handling quiz interactions.
const quizzes = {
    easy: [
      { question: "What is the capital of the Philippines?", options: ["Cebu", "Davao", "Manila", "Quezon City"], answer: "Manila" },
      { question: "What is the national bird of the Philippines?", options: ["Maya", "Eagle", "Parrot", "Hawk"], answer: "Eagle" },
    ],
    medium: [
      { question: "Which volcano erupted in 1991?", options: ["Mayon", "Taal", "Pinatubo", "Kanlaon"], answer: "Pinatubo" },
      { question: "What is the smallest province in the Philippines?", options: ["Siquijor", "Batanes", "Camiguin", "Marinduque"], answer: "Batanes" },
    ],
    hard: [
      { question: "Who designed the Philippine flag?", options: ["Aguinaldo", "Marcela Agoncillo", "Rizal", "Bonifacio"], answer: "Marcela Agoncillo" },
      { question: "What is the oldest university in Asia?", options: ["UST", "UP", "La Salle", "Ateneo"], answer: "UST" },
    ],
    expert: [
      { question: "Which treaty ended Spanish rule?", options: ["Paris", "Tordesillas", "Manila", "Cebu"], answer: "Paris" },
      { question: "What is the deepest trench in the Philippines?", options: ["Emden", "Challenger", "Galathea", "Mindoro"], answer: "Emden" },
    ],
  };
  
  let currentDifficulty, currentQuestionIndex, score, cash, hintsUsed;
  
  function startGame(difficulty) {
    currentDifficulty = difficulty;
    currentQuestionIndex = 0;
    score = 0;
    cash = 0;
    hintsUsed = { fiftyFifty: false, switch: false };
    document.getElementById("quizForm").style.display = "block";
    loadQuestion();
  }
  
  function loadQuestion() {
    const quiz = quizzes[currentDifficulty];
    const question = quiz[currentQuestionIndex];
    const questionContainer = document.getElementById("quizQuestions");
    questionContainer.innerHTML = `
      <div class="question">${question.question}</div>
      <div class="options">
        ${question.options.map((opt, i) => `
          <label><input type="radio" name="answer" value="${opt}"> ${opt}</label>
        `).join("")}
      </div>
    `;
  }
  
  function useHint(type) {
    const quiz = quizzes[currentDifficulty][currentQuestionIndex];
    const options = document.querySelectorAll('input[name="answer"]');
    if (type === "50:50" && !hintsUsed.fiftyFifty) {
      let incorrectAnswers = quiz.options.filter(opt => opt !== quiz.answer);
      incorrectAnswers = incorrectAnswers.slice(0, 2); // Remove 2 incorrect options
      options.forEach(input => {
        if (incorrectAnswers.includes(input.value)) input.parentNode.style.display = "none";
      });
      hintsUsed.fiftyFifty = true;
      document.getElementById("fiftyFiftyBtn").disabled = true;
    }
    if (type === "switch" && !hintsUsed.switch) {
      currentQuestionIndex = (currentQuestionIndex + 1) % quizzes[currentDifficulty].length;
      loadQuestion();
      hintsUsed.switch = true;
      document.getElementById("switchBtn").disabled = true;
    }
  }
  
  function checkAnswer() {
    const quiz = quizzes[currentDifficulty];
    const question = quiz[currentQuestionIndex];
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return alert("Please select an answer!");
    const isCorrect = selected.value === question.answer;
    document.getElementById(isCorrect ? "correctSound" : "wrongSound").play();
  
    if (isCorrect) {
      const prizes = { easy: 5000, medium: 10000, hard: 20000, expert: 50000 };
      cash += prizes[currentDifficulty];
      score++;
      document.getElementById("result").textContent = `Correct! You have ₱${cash}.`;
      document.getElementById("nextButtons").style.display = "block";
      document.getElementById("quizForm").style.display = "none";
    } else {
      document.getElementById("result").textContent = "Wrong answer! Game Over.";
      resetGame();
    }
  }
  
  function proceed() {
    const quiz = quizzes[currentDifficulty];
    currentQuestionIndex++;
    if (currentQuestionIndex >= quiz.length) {
      document.getElementById("result").textContent = `Congratulations! You won ₱${cash}!`;
      resetGame();
    } else {
      loadQuestion();
      document.getElementById("quizForm").style.display = "block";
      document.getElementById("nextButtons").style.display = "none
  