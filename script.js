const numeroSenhaElement = document.querySelector(".parametro-senha__texto");
const campoSenha = document.querySelector("#campo-senha");
const UPPER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVXYWZ";
const LOWER_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@%?";
const forcaSenha = document.querySelector(".forca");
let SELECT = UPPER_LETTERS;

let numeroSenha = Number(numeroSenhaElement.textContent);
let passwordData = {
  upperLetters: document.querySelector("input[name=maiusculo]").checked,
  lowerLetters: document.querySelector("input[name=minusculo]").checked,
  numbers: document.querySelector("input[name=numero]").checked,
  symbols: document.querySelector("input[name=simbolo]").checked,
};

function updatePassword() {
  passwordData = {
    upperLetters: document.querySelector("input[name=maiusculo]").checked,
    lowerLetters: document.querySelector("input[name=minusculo]").checked,
    numbers: document.querySelector("input[name=numero]").checked,
    symbols: document.querySelector("input[name=simbolo]").checked,
  };
  SELECT = "";
  if (passwordData.upperLetters) SELECT += UPPER_LETTERS;
  if (passwordData.lowerLetters) SELECT += LOWER_LETTERS;
  if (passwordData.numbers) SELECT += NUMBERS;
  if (passwordData.symbols) SELECT += SYMBOLS;

  generatePassword(numeroSenha);
}

function incrementLength() {
  if (numeroSenha < 20) numeroSenha += 1;
  numeroSenhaElement.textContent = numeroSenha;
  generatePassword(numeroSenha);
}

function decrementLength() {
  if (numeroSenha > 1) numeroSenha -= 1;
  numeroSenhaElement.textContent = numeroSenha;
  generatePassword(numeroSenha);
}

function generatePassword(length) {
  if (!SELECT) return (campoSenha.value = "SELECIONE ALGUMA CARACTERÍSTICA!");
  let randomPassword = "";
  for (let i = 0; i < length; i++) {
    randomPassword += SELECT[Math.floor(Math.random() * SELECT.length)];
  }
  console.log(randomPassword);
  campoSenha.value = randomPassword;
  classificaSenha();
}

function classificaSenha() {
  let entropia = numeroSenha * Math.log2(numeroSenha);
  console.log(entropia);
  forcaSenha.classList.remove("fraca", "media", "forte");
  if (entropia > 57) {
    forcaSenha.classList.add("forte");
  } else if (entropia > 35 && entropia < 57) {
    forcaSenha.classList.add("media");
  } else if (entropia <= 35) {
    forcaSenha.classList.add("fraca");
  }
  const valorEntropia = document.querySelector(".entropia");
  valorEntropia.textContent =
    "Um computador pode levar até " +
    Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) +
    " dias para descobrir essa senha.";
}

generatePassword(numeroSenha);
