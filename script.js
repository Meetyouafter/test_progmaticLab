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

const getTernaryNumArray = (integer) => {
    const value = 3;
    let result = '';
    while (integer > 0) {
      result += integer % value;
      integer = Math.floor(integer / value);
    }
    return result.split('');
  };
  
  const getMathExpression = (num) => {
    let ternaryArray = getTernaryNumArray(num);
    let emptyArray = new Array(9).fill('');
  
    for (let i = 1; i <= 10; i += 1) {
      if (i <= ternaryArray.length) {
        if (Number(ternaryArray[i]) === 1) emptyArray[i] = '+';
        if (Number(ternaryArray[i]) === 2) emptyArray[i] = '-';
      } else {
        emptyArray[i] = '';
      };
    };
  
    let mathExpression = '';
    for (let i = 0; i < 9; i++) {
      mathExpression += (9 - i) + emptyArray[i];
    }
    mathExpression += '0';
    return mathExpression;
  }
  
  const  getSolution = (number) => {
    const results = {};
    let result = [];
    const quantity = Math.pow(3, 9);
  
    for (let i = 0; i < quantity; i++) {
      const expression = getMathExpression(i);
      const result = eval(expression);
      
      if (result in results) {
        results[result].push(expression);
      } else {
        results[result] = [expression];
      }
    }
  
    if (number in results) {
      return results[number]
    }
    return 'Решений нет';
  };
  
  const contentEl = document.querySelector('.content');
  const pEl = document.createElement('p');
  pEl.textContent = getSolution(200);
  contentEl.append(pEl);
  