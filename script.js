let digits = [1,2,3,4,5,6,7,8,9];
  const zarbOutput = document.getElementById("zarb-output");
  const answerInput = document.getElementById("answer-input");
  const answerOutput = document.getElementById("answer-output");
  const digitsEls = Array.from(document.querySelectorAll("input[type='checkbox']"));
  //const questionTime = document.querySelector("#question-time");

  // time
  const questionTime = document.querySelector("#question-time");
  const timeValue = document.querySelector("#time-value");
  
  //score
  const scoreOutput = document.querySelector("#modal-score");
  const correctsOutput = document.querySelector("#modal-correct");
  const wrongsOutput = document.querySelector("#modal-wrong");

  let score = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  
  digitsEls.forEach(el => {
    el.onchange = function() {
     if(this.checked){
      digits.push(Number(this.value));
      digits.sort();
      //checkedNums++;
     }
     else {
      digits = digits.filter(digit => Number(this.value) != digit);
      //checkedNums--;
     }
     clearTimeout(answerTimeout);
      showRanNums()
    }
  });
  
  let ranNum1;
  let ranNum2;
  let isFirstTime = true;
let answerTimeout;

  const recentNums = [];

function makeRanNums() {
    let nums;

    while (true) {
        const digitsCount = digits.length;

        const ran1 = Math.floor(Math.random() * digitsCount);
        ranNum1 = digits[ran1];

        ranNum2 = Math.floor(Math.random() * 9);

        nums = [ranNum1, ranNum2];

        const isRepeated = recentNums.some(([a, b]) =>
            a === nums[0] && b === nums[1]
        );

        if (!isRepeated) {
            break;
        }
     
    }
 
    if (recentNums.length >= 7) {
        recentNums.shift();
    }
 
    recentNums.push(nums);
    return nums;
}
  function showRanNums(){
   
    const [ran1, ran2] = makeRanNums();
    if(!ran1){
      zarbOutput.innerText = "حد اقل یک عدد انتخاب کنید";
      return;
    }
    zarbOutput.innerText = ran1 + " × " + ran2;
   if(!isFirstTime){
    answerTimeout = setTimeout(function(){
      answerOutput.innerText = " جواب میشد: " + ranNum1 * ranNum2;
    highlightAnswer("highlight-false");
    answerInput.value = "";
    showRanNums();
    playWrongSound();
     score--;
    return;
     
    }, (Number(questionTime.value) * 1000) || 3000);
   }
  }
 
  function checkAnswer(){
   if(answerInput.value.length == 2 && ranNum1 * ranNum2 != answerInput.value){
    answerOutput.innerText = "خیر جواب میشد: " + ranNum1 * ranNum2;
    highlightAnswer("highlight-false");
    answerInput.value = "";
    isFirstTime = false;
    clearTimeout(answerTimeout);
    showRanNums();
    playWrongSound();
    wrongAnswers++;
    score--;
    return;
   }
    if(ranNum1 * ranNum2 == answerInput.value){
      answerOutput.innerText = ("عالیییی!");
      answerInput.value = "";
     isFirstTime = false;
     clearTimeout(answerTimeout);
      showRanNums();
      highlightAnswer("highlight-true");
     playCorrectSound();
     correctAnswers++;
     score++;
    }
  }
  answerInput.oninput = function() {
   if(this.value){
    checkAnswer()
    if (audioContext.state === "suspended") {
    audioContext.resume();
  }
   }
  }

//AI help****************

function highlightAnswer(highlightClass) {
  // Restart animation if it is already running
  answerOutput.classList.remove(highlightClass);

  // Force browser to recognize the removal
  void answerOutput.offsetWidth;

  // Apply highlight
  answerOutput.classList.add(highlightClass);

  // Return to original appearance
  setTimeout(() => {
    answerOutput.classList.remove(highlightClass);
  }, 700);
}

//more AI***************

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playCorrectSound() {
  const now = audioContext.currentTime;

  [523.25, 783.99].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.3 + index * 0.15
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now + index * 0.12);
    oscillator.stop(now + 0.5);
  });
}

function playWrongSound() {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    90,
    audioContext.currentTime + 0.3
  );

  gain.gain.setValueAtTime(0.2, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.35
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.35);
}

//AI************

const stopButton = document.getElementById("stop-button");
const stopModal = document.getElementById("stop-modal");
const playButton = document.getElementById("play-button");

stopButton.addEventListener("click", () => {
  stopModal.showModal();
 scoreOutput.innerText = score;
 correctsOutput.innerText = correctAnswers;
 wrongsOutput.innerText = wrongAnswers;
  clearTimeout(answerTimeout);

  stopModal.classList.remove("hide");
  stopModal.classList.add("show");
});

playButton.addEventListener("click", () => {
  stopModal.classList.remove("show");
  stopModal.classList.add("hide");
});

// Close only after the closing animation finishes
stopModal.addEventListener("animationend", (event) => {
  if (event.animationName === "modal-close") {
    stopModal.close();
   showRanNums();
    stopModal.classList.remove("hide");
  }
});


window.onload = () => {
 stopModal.showModal();
 stopModal.classList.remove("hide");
  stopModal.classList.add("show");
  }

//AI fir time setting

questionTime.addEventListener("input", () => {
    timeValue.textContent = questionTime.value;
});