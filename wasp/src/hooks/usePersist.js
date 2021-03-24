export default function usePersist(target) {
  const setItem = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

  const set = target
    ? (value) => setItem(target, value)
    : (key, value) => setItem(key, value);

  const getItem = (key) => JSON.parse(localStorage.getItem(key));

  const get = target ? getItem(target) : (key) => getItem(key);

  return [get, set];
}
