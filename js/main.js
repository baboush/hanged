const BODY = document.querySelector("body");
const CONTAINER = document.querySelector(".alphaboard");
const GAMEBOARD = document.querySelector(".gameboard");
const INIT_LIST = document.createElement("ul");
CONTAINER.appendChild(INIT_LIST);
const DICO = dictionnaire;

/**
 * @Param
 *
 * Generate word in the random words lists
 *
 * Return word like array
 */
const GetWord = () => {
  /* Generate random Word  */
  let numberIndex = Math.floor(Math.random() * (DICO.length - 1));
  let chooseWord = DICO[numberIndex];
  return chooseWord;
};

/**
 * @Param
 *
 * Generate Alpha button
 *
 * Display buttons alpha in document
 */
const GenerateAlpha = () => {
  const ALPHA = "abcdefghijklmnopqrstuvwxyz";
  const SPLIT_ALPHA = ALPHA.split("");

  // create list ALPHA
  // generate list width button
  for (let item of SPLIT_ALPHA) {
    let item_list = document.createElement("li");
    let btn = document.createElement("button");
    btn.classList.add("btn-alpha");
    btn.innerText = item.toUpperCase();
    INIT_LIST.appendChild(item_list).appendChild(btn);
  }
};

/**
 * @Param word array string
 *
 * build hidde word
 *
 * Return array string with letters hidde
 */
const BuildHiddenWord = (word) => {
  const wordFilter = [...word];
  wordFilter.map((el, index) => {
    const checkChar = index != 0 && index != wordFilter.length - 1 && el != "-";

    if (checkChar) {
      wordFilter[index] = "_";
    }
  });
  return wordFilter;
};

/**
 * @Param
 *
 * Generate word in the random words lists
 *
 * Display  gameboard with letters hidde
 */
const GenerateGameboard = (word) => {
  const wordHiddeTemp = [...word];
  for (const letter of wordHiddeTemp) {
    let letterBlock = document.createElement("span");
    letterBlock.innerText = `${letter}`;
    GAMEBOARD.appendChild(letterBlock);
  }
};

/**
 * @Param goodWord array string
 * @Param health number
 *
 *  Check letter and check win
 *
 * Display letter in gameword and display win modal
 */
const CheckIsWin = (goodWord, health) => {
  const goodWordTemp = [...goodWord];
  const checkWordTemp = [];
  const healthTemp = health;
  const getGameBoard = document.querySelectorAll("span");
  for (const i of getGameBoard) {
    checkWordTemp.push(i.innerText);
  }
  const isWin =
    checkWordTemp.join("") === goodWordTemp.join("") && healthTemp <= 5;
  if (isWin) {
    DisplayModal(
      `BRAVO, vous avez trouver le mot: \n ${checkWordTemp.join("")}`,
      ` avec: ${healthTemp} erreurs`,
    );
  }
};

/**
 * @Param goodWord array string
 * @Param health number
 *
 *  Check letter and check loose
 *
 * Display loose modal
 */
const CheckIsLoose = (goodWord, health) => {
  const goodWordTemp = goodWord;
  const healthTemp = health;
  if (healthTemp >= 6) {
    DisplayModal(
      `DOMMAGE, vous n'avez pas trouve le mot: ${goodWordTemp.join("")}`,
      "",
    );
  }
};

/**
 * @Param message string
 * @Param health number
 *
 *  Check letter and check win
 *
 * Display modal
 */
const DisplayModal = (message, health) => {
  const modal = document.createElement("div");
  const btnQuit = document.createElement("button");
  const btnRestart = document.createElement("button");
  btnRestart.classList.add("btn-restart");
  btnQuit.classList.add("btn-quit");
  modal.classList.add("modal");
  modal.innerText = message + health;
  BODY.appendChild(modal);
  btnQuit.innerText = "Quit Game";
  btnRestart.innerText = "Restart Game";
  modal.appendChild(btnQuit);
  modal.appendChild(btnRestart);
  btnRestart.addEventListener("click", () => location.reload());
};

/**
 * @Param health number
 *
 *  Add img hanggman
 *
 * Display image
 */
const AddImgHanggman = (health) => {
  const healthTemp = health;
  const imgHanggman = document.querySelector(".change-image");
  imgHanggman.src = `./img/p${healthTemp}.gif`;
};

/**
 * @Param health number
 * @Param letter string
 * @Param word array string
 *
 * check is letter is in word
 * check is loose
 * check is win
 */
const CheckIsInWord = (word, letter, health) => {
  const checkWord = [...word];
  const checkLetter = letter;
  let healthTemp = health;

  const isValid = checkWord.includes(checkLetter) && healthTemp <= 6;
  if (isValid) {
    healthTemp--;
    BODY.style.backgroundColor = "green";
    ReplaceLetterInHiddenWord(checkWord, letter);
    CheckIsWin(checkWord, healthTemp);
    return true;
  } else {
    BODY.style.backgroundColor = `red`;
    AddImgHanggman(healthTemp);
    CheckIsLoose(checkWord, healthTemp);
  }
};

/**
 * @Param health number
 * @Param letter string
 *
 *
 * Replace the letter in gameboard
 */
const ReplaceLetterInHiddenWord = (goodWord, letter) => {
  const letterReplace = letter;
  const goodWordTemp = goodWord;
  const getGameBoard = document.querySelectorAll("span");

  for (const i in goodWordTemp) {
    if (letterReplace === goodWordTemp[i])
      getGameBoard[i].innerText = letterReplace;
  }
};

/**
 * @Param word string
 *
 * Play the game
 *
 */
const UserPlay = (word) => {
  const checkWord = word;
  let health = 0;
  const btn = document.querySelectorAll(".btn-alpha");
  btn.forEach((el) => {
    el.addEventListener("click", (e) => {
      const letterValue = el.innerText;
      health++;
      if (CheckIsInWord(checkWord, letterValue, health)) health--;
      el.disabled = true;
      el.style.background = "grey";
    });
  });
};
// main
const word = GetWord();
GenerateAlpha();
const hiddenWord = BuildHiddenWord(word);
GenerateGameboard(hiddenWord);
const Init = () => UserPlay(word);
