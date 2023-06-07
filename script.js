// Get the options and input buckets
const options = document.querySelectorAll('.option');
const inputBuckets = document.querySelectorAll('.input-bucket');

// Initialize the array for storing the current order of values
let currentOrder = [];

// Add event listeners to options for dragging and dropping
options.forEach(option => {
  // set option value randomly
  const randomValue = Math.floor(Math.random() * 900);
  option.textContent = randomValue;
  option.addEventListener('dragstart', dragStart);
  option.addEventListener('dragend', dragEnd);
});

// Add event listeners to input buckets for dragging and dropping
inputBuckets.forEach(bucket => {
  bucket.addEventListener('dragover', dragOver);
  bucket.addEventListener('dragenter', dragEnter);
  bucket.addEventListener('dragleave', dragLeave);
  bucket.addEventListener('drop', drop);
});

// Add event listener to check button
const checkButton = document.getElementById('check-button');
checkButton.addEventListener('click', checkAnswers);

// Add event listener to reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

// Drag and drop functions
function dragStart() {
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('highlight');
}

function dragLeave() {
  this.classList.remove('highlight');
}

function drop() {
  console.log(this)
  const optionValue = document.querySelector('.dragging').textContent;
  const inputValue = this.getAttribute('data-value');
  const inputIndex = this.getAttribute('data-index');

  console.log("Option" , optionValue)
  console.log("Input Value",inputValue)
  console.log("Input Index" ,inputIndex)

  if (optionValue && inputValue === '') {
    this.textContent = optionValue;
    this.style.backgroundColor = '#9e9';
    this.setAttribute('data-value', optionValue);
    currentOrder[inputIndex] = Number(optionValue);
    document.querySelector('.dragging').style.display = 'none';
    checkButton.disabled = !isGameComplete();
  }
  console.log(currentOrder)
}
// isArrayEqual function
function isArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr2.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// Check button function
function checkAnswers() {
  const sortedOrder = [...currentOrder].sort((a, b) => a - b);
  console.log(currentOrder, sortedOrder)
  if (isArrayEqual(currentOrder, sortedOrder)) {
    showResult(true, 'Correct!');
  } else {
    showResult(false, 'Incorrect!');
  }
}

// Reset button function
function resetGame() {
  currentOrder = [];
  options.forEach(option => {
    option.style.display = 'inline';
    option.classList.remove('dragging');
  });
  inputBuckets.forEach(bucket => {
    bucket.innerHTML = '<img src="./down.gif" alt="down" width="20" height="20">';
    bucket.setAttribute('data-value', '');
    bucket.style.backgroundColor = '#fff';
  });
  checkButton.disabled = true;
  document.getElementById('result').textContent = '';
}

// Helper function to check if the game is complete
function isGameComplete() {
  for (let i = 0; i < inputBuckets.length; i++) {
    if (inputBuckets[i].getAttribute('data-value') === '') {
      return false;
    }
  }
  return true;
}

// Helper function to display result
function showResult(isCorrect, message) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = message;
  resultDiv.style.color = isCorrect ? 'green' : 'red';
  resultDiv.style.fontWeight = 'bold';
  resultDiv.style.textShadow= !isCorrect ? "0 0 10px rgba(255, 0, 0, 0.4)" : "0 0 10px rgba(0, 255, 0, 0.4)";
}
