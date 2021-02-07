let state = {
  gameTime: 60,
  score: 0,
  probs: 0,
  scoreTable:[]
};

function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let colorsHex = ["#000000", "#009933", "#0033cc", "#ff0000","#ebeb04","#333300"];
let colorsName = ["Черный", "Зеленый", "Синий", "Красный","Желтый","Коричневый"];
let currentColor;
let variantColor;
let timerId;
let startBoard = document.querySelector(".startBoard");
let game=document.querySelector(".game")
let screenEndGame=document.querySelector(".screenEndGame")
let startBoard__button = document.querySelector(".startBoard__button");
startBoard__button.addEventListener("click", () => {
  startGame();
});

let screenEndGame__button=document.querySelector(".screenEndGame__button");
screenEndGame__button.addEventListener("click", () => {
    restartGame();
  });
function timer() {
  timerId = setInterval(() => {
    if (state.gameTime > 0) {
      state.gameTime -= 1;
      document.querySelector(".score__timer").innerText = `Таймер: ${state.gameTime}`;
    } else {
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  console.log("End");
  clearInterval(timerId);

 game.classList.add("hide");
 screenEndGame.classList.add("show")
  document.querySelector(".screenEndGame__currentGame").innerText=`Очки: ${state.score}`
  screenEndGame.classList.add("show");
  saveScore()
}

function roundGame() {
  currentColor = RandomNumber(0, colorsHex.length-1);



  let v=RandomNumber(0, 1);
  console.log(v)
  if(v===0){
    variantColor = RandomNumber(0, colorsHex.length-1);
  }
  else{
    variantColor = currentColor;
  }
  console.log(variantColor,currentColor)
  let leftCard = document.getElementById("leftCard");
  let rightCard = document.getElementById("rightCard");
  leftCard.style.color = colorsHex[RandomNumber(0, colorsHex.length-1)];
  leftCard.innerText = colorsName[variantColor];
  rightCard.style.color = colorsHex[currentColor];
  rightCard.innerText = colorsName[RandomNumber(0, colorsName.length-1)];
}

function pick(v) {
  state.probs += 1;
  if (v == "yes") {
    if (variantColor === currentColor) {
      updateScore();
      alert(true)
    }
    else{
      alert(false)
    }
  } else {
    if (variantColor !== currentColor) {
      updateScore();
      alert(true)
    }
    else{
      alert(false)
    }
  }
  roundGame();
}

function updateScore() {
  state.score += 1;
  let scoreBoard = document.querySelector(".score__score");
  scoreBoard.innerText = `Очки: ${state.score}`;
}

document.getElementById("YesButton").addEventListener("click", () => {
  pick("yes");
});
document.getElementById("NoButton").addEventListener("click", () => {
  pick("no");
});

function startGame() {
startBoard.classList.add("hide");
  state.gameTime = 30;
  state.score=0;
  state.probs=0;
  timer();
  roundGame();
}

function restartGame(){
    startBoard.classList.remove("hide");
    game.classList.remove("hide");
    screenEndGame.classList.remove("show")
}

function saveScore(){
    let oldScore=localStorage.getItem("score")?JSON.parse(localStorage.getItem("score")):[]
    oldScore.push({score:state.score,date:new Date().toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })})
    oldScore.sort((a,b)=>b.score-a.score)
    oldScore=oldScore.slice(0,10)
    state.scoreTable=[]
    state.scoreTable=oldScore
    let scoreTable=JSON.stringify(oldScore)
    localStorage.setItem("score",scoreTable)
    showScoreTable()
}



document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            pick("yes");
            break;
        case 39:
            pick("no");
            break;
    default:
    break;
    }
};

let alertBlock = document.querySelector(".gameBoard__alert")

function alert(y){

  alertBlock.innerHTML=y?'<i class="far fa-thumbs-up"></i>':'<i class="far fa-thumbs-down"></i>'
  alertBlock.style.color=y?'green':'red'
  alertBlock.style.opacity=1
  setTimeout(()=>{
    alertBlock.style.opacity=0
  },800)
}

function showScoreTable(){

  let screenEndGame__table= document.querySelector('.screenEndGame__table')

  screenEndGame__table.innerHTML=''
  let rHead=document.createElement('tr')
  let a=['#','Очки','Дата']
  a.forEach((x)=>{
    let th=document.createElement('th')
    th.innerHTML=x
    rHead.appendChild(th)
  })

screenEndGame__table.appendChild(rHead)




  state.scoreTable.forEach((x,i)=>{

  let row=document.createElement('tr')
  let tdNum=document.createElement('td')
  tdNum.innerHTML=i+1
  let tdScore=document.createElement('td')
  tdScore.innerHTML=x.score

  let tdDate=document.createElement('td')
  tdDate.innerHTML=x.date
row.appendChild(tdNum)
row.appendChild(tdScore)
row.appendChild(tdDate)
screenEndGame__table.appendChild(row)
})


}