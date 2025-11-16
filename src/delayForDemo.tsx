export function delayForDemo(promise: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  }).then(() => promise);
}
