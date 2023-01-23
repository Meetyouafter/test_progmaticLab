/*
Порядок вычислений:
1. Функция getTernaryNumArray. Принимает на вход число, на основании которого будет возпроизведен массив значений
в троичной системе.
2. Функция getMathExpression. Принимает на вход число, которое будет передано для построения массива значений
в троичной системе. Заполняем массив "", так как троичный массив не всегда равен нужной длине
(также начинаем с 1).
3. Далее наполняем пример цифрами и знаками.
4. getSolution. Принимает на вход необходимое число. Так как у нас 9 символов и возможных вариантов 3, то общее количество возможных вариантов
расстановки составляет 3*9 степени. Для каждого варианта строится выражение на основании сформированного массива
от getTernaryNumArray.
5. Получаем все возможные примеры, находим ответ и группируем в объекте по ответу.
6. Далее смотрим число, интересующее нас. Если оно есть, то выводим пример, если нет - сообщаем
об этом пользователю.
*/

const mapNumberToSign = {
  0: '',
  1: '+',
  2: '-'
};

const convertDecimalToTernary = (num) => {
  const value = 3;
  let result = '';
  while (num > 0) {
    result += num % value;
    num = Math.floor(num / value);
  };

  return result;
};

const getTernaryNumArray = (num) => {
  const ternaryString = convertDecimalToTernary(num);
  return ternaryString.split('').map(num => Number(num));
};

const getMathExpression = (num) => {
  const ternaryArray = getTernaryNumArray(num);
  const emptyArray = new Array(9).fill('');

  for (let i = 1; i < ternaryArray.length; i += 1) {
    emptyArray[i] = mapNumberToSign[ternaryArray[i]]
  };

  let mathExpression = '';
  for (let i = 0; i < 9; i++) {
    mathExpression += (9 - i) + emptyArray[i];
  }
  mathExpression += '0';

  return mathExpression;
}

const getNumberSolutions = (number) => {
  const mapNumToSolutions = {};
  const quantity = 3 ** 9;

  for (let i = 0; i < quantity; i++) {
    const expression = getMathExpression(i);
    const calculatedExpression = eval(expression);

    if (calculatedExpression in mapNumToSolutions) {
      mapNumToSolutions[calculatedExpression].push(expression);
    } else {
      mapNumToSolutions[calculatedExpression] = [expression];
    };
  };

  if (number in mapNumToSolutions) {
    return [...new Set(mapNumToSolutions[number])];
  };

  return 'Решений нет';
};

console.log(getNumberSolutions(200))
