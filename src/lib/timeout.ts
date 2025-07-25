export const timeout = <T>(ms: number, promise: Promise<T>): Promise<T> => {
   return Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
   ])
}
