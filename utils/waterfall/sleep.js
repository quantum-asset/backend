/**
 * Simulates a sleep by delaying
 * Good for infinite loops
 * @param {number} delay in miliseconds, by default is zero
 * @returns 
 */
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default sleep;
