interface NewNote {
  title: string;
  content: string | undefined;
  createdAt: string;
}

export const useLocalStorage = (key: string) => {
  const setItem = (value: NewNote) => {
    try {
      console.log(key, value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  };

  return { setItem, getItem, removeItem };
};
