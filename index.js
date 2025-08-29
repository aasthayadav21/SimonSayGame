let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started === false){
        console.log("game is started");
        started = true;
        levelup();
    }
});

function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
      btn.classList.remove("userflash");
    }, 250);
}

function levelup(){
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // random btn choose (fix: include all 4 colors)
  let randidx = Math.floor(Math.random() * btns.length);
  let randclr = btns[randidx];
  let randbtn = document.querySelector(`.${randclr}`);
  gameseq.push(randclr);
  console.log(gameseq);
  gameFlash(randbtn);
}

function checkAns(idx){
  if(userseq[idx] === gameseq[idx]){
    if(userseq.length === gameseq.length){
         setTimeout(levelup,1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start..`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor = "white";
    },150);
    reset();
  }
}

function btnPress(){ 
    let btn = this;
    userFlash(btn);

    let userclr = btn.getAttribute("id"); // fixed
    userseq.push(userclr);

    checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(let btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}


