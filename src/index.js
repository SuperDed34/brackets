module.exports = function check(str, bracketsConfig) {
  const openBrackets = [];
  const closeBrackets = [];
  const specialBrackets = [];
  const bracketsPair = {};

  // Перебираем конфигурацию скобок и заполняем соответствующие массивы
  bracketsConfig.forEach(([open, close]) => {
    if (open === '|' || open === '7' || open === '8') {
      specialBrackets.push(open);
    } else {
      openBrackets.push(open);
    }
    if (close === '|' || close === '7' || close === '8') {
      specialBrackets.push(close);
    } else {
      closeBrackets.push(close);
    }
    bracketsPair[close] = open;
  });

  let stack = [];
  let count = 0;
  let lastSpecialBracket = null;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (specialBrackets.includes(char)) {
      if (lastSpecialBracket === char) {
        lastSpecialBracket = null;
        count--;
      } else {
        lastSpecialBracket = char;
        count++;
      }
    } else if (openBrackets.includes(char)) {
      stack.push(char);
    } else if (closeBrackets.includes(char)) {
      if (stack.length === 0) {
        return false;
      }
      let topChar = stack[stack.length - 1];
      if (bracketsPair[char] === topChar) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0 && count % 2 === 0;
}
