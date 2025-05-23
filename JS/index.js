const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:39%; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#538D4E";
        block.classList.add("bounce");
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#b59f3c";
        block.classList.add("shake");
      } else {
        block.style.background = "#3A3A3C";
        block.classList.add("shake");
      }

      block.style.color = "white";

      block.addEventListener(
        "animationend",
        () => {
          block.classList.remove("shake", "bounce");
        },
        { once: true }
      );
    }
    if (맞은_갯수 === 5) gameover();
    nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKey = (key) => {
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (key === "BACK") {
      handleBackspace();
    } else if (key === "ENTER") {
      if (index === 5) handleEnterKey();
    } else if (/^[A-Z]$/.test(key)) {
      if (index < 5) {
        thisBlock.innerText = key;
        index += 1;
      }
    }
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timerDiv = document.querySelector("#timer");
      timerDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const keyboardKeys = document.querySelectorAll(".keyboard-column");
  keyboardKeys.forEach((keyDiv) => {
    keyDiv.addEventListener("click", () => {
      const key = keyDiv.dataset.key;
      handleKey(key);
    });
  });

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
