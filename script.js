let clickAttempts = 0;
let canClickButton = false;
let moveCount = 0; // Track number of movements

function moveButton() {
  const button = document.getElementById("clear-data-btn");

  if (moveCount >= 3) {
    return; // Stop moving after three times
  }

  // Change position three times on hover
  const randomX = Math.random() * (window.innerWidth - button.offsetWidth);
  const randomY = Math.random() * (window.innerHeight - button.offsetHeight);

  button.style.left = randomX + "px";
  button.style.top = randomY + "px";

  moveCount++; // Increment movement count
}

// Make the button clickable on the 5th attempt
function handleButtonClick() {
  clickAttempts++;

  if (clickAttempts < 5) {
    alert("Try again! You're not quite there yet!");
  } else {
    // After the 5th click, show the annoying question
    askAnnoyingQuestion();
  }
}

// Ask an annoying question after the 5th click
function askAnnoyingQuestion() {
  const annoyingQuestions = [
    "Do you like this website?",
    "Why did you click the button?",
    "Are you sure you want to clear all your data?",
    "Why do you want to annoy yourself?",
    "Did you expect a reward for clicking this button?"
  ];

  const randomIndex = Math.floor(Math.random() * annoyingQuestions.length);
  const question = annoyingQuestions[randomIndex];

  setTimeout(() => {
    const answer = prompt(question);

    // After answering, allow the button to be clickable again
    if (answer !== null) {
      alert("Great! You can now clear your data.");
      canClickButton = true;
      clickAttempts = 0;
    } else {
      alert("You didn't answer, but okay, let's continue...");
    }
  }, 500); // Delay annoying question for added suspense
}

// Reset button click attempts when data is cleared
function resetButton() {
  clickAttempts = 0;
  alert("Data cleared!");
  localStorage.clear();
  sessionStorage.clear();
  document.cookie = "footerBannerClosed=; path=/; max-age=0"; // Clear cookies
}

// Add event listener for the button hover
document.getElementById("clear-data-btn").addEventListener("mouseover", moveButton);

// Add event listener for the button click
document.getElementById("clear-data-btn").addEventListener("click", function () {
  if (clickAttempts >= 5) {
    resetButton();
  } else {
    handleButtonClick();
  }
});
