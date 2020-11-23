// получение даты из локального хранилища по ключу
const getData = (key) => {
  const data = JSON.parse(window.localStorage.getItem(key));
  return data;
};

// получение даты в локальное хранилище по ключу
const setData = (key, item) => {
  console.log('set localStorage item on key:', key, item);
  const prevData = getData(key);
  const data = prevData ? [...prevData, item] : [item];
  window.localStorage.setItem(key, JSON.stringify(data));
};

export { getData, setData };
