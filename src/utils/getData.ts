export async function getData<T>(key: string, delay: number): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = localStorage.getItem(key);
      if (data) {
        resolve(JSON.parse(data) as T);
      } else {
        reject(new Error(`No data found for key: ${key}`));
      }
    }, delay);
  });
}
