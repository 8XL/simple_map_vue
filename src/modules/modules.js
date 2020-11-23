// простой модуль уменьшения длины даты.
// аргументами получаем массив и нужную длину
// если длина массива превышает заданную длину
// вызываем метод сплайс, удаляет из разницу
// между длиной массива и заданной длиной
const splicedDataOfLength = (data, length) => {
  if (data.length > length) {
    console.log(`localStorage data ${data} is so big`);
    const cloneOfData = data.splice(0);
    cloneOfData.splice(0, cloneOfData.length - length);
    return cloneOfData;
  }
  return data;
};

export default splicedDataOfLength;
