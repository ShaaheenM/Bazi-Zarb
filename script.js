let digits = [1,2,3,4,5,6,7,8,9];
  const zarbOutput = document.getElementById("zarb-output");
  const answerInput = document.getElementById("answer-input");
  const answerOutput = document.getElementById("answer-output");
  const digitsEls = Array.from(document.querySelectorAll("input[type='checkbox']"));
  
  digitsEls.forEach(el => {
    el.onchange = function() {
      digits = digits.filter(digit => {
       return el.value != digit;
      });
      digitsEls.forEach(element => {
        if(element.checked && !digits.includes(Number(element.value))){
          digits.push(Number(element.value));
          digits.sort();
        }
      });
      showRanNums()
    }
  });
  
  let ranNum1;
  let ranNum2;
  function makeRanNums(){
    const digitsCount = digits.length - 1;
    const ran1 = Math.round(Math.random() * digitsCount);
    ranNum1 = digits[ran1];
    ranNum2 = Math.round(Math.random() * 9);
    return [ranNum1, ranNum2];
  }
  function showRanNums(){
    const [ran1, ran2] = makeRanNums();
    if(!ran1){
      zarbOutput.innerText = "حد اقل یک عدد انتخاب کنید";
      return;
    }
    zarbOutput.innerText = ran1 + " × " + ran2;
  }
  window.onload = () => {
    showRanNums()
  }
  function checkAnswer(){
    if(ranNum1 * ranNum2 == answerInput.value){
      answerOutput.innerText = ("عالیییی!");
      answerOutput.classList.toggle("highlight");
      answerInput.value = "";
      showRanNums();
      highlightAnswer();
      //setTimeout(()=>{answerOutput.classList.toggle("highlight");}, 1000);
    }
  }
  answerInput.oninput = function() {
    checkAnswer()
  }
 
  
//const answerOutput = document.getElementById("answer-output");

function highlightAnswer() {
  // Restart animation if it is already running
  answerOutput.classList.remove("highlight");

  // Force browser to recognize the removal
  void answerOutput.offsetWidth;

  // Apply highlight
  answerOutput.classList.add("highlight");

  // Return to original appearance
  setTimeout(() => {
    answerOutput.classList.remove("highlight");
  }, 700);
}

