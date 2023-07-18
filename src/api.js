// ================================= Mock Server Start =============================
var FAILURE_COEFF = 10;
var MAX_SERVER_LATENCY = 200;

function getRandomBool(n) {
  var maxRandomCoeff = 1000;
  if (n > maxRandomCoeff) n = maxRandomCoeff;
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}

function processSuggestion(results, text) {
    return results.map(r => {
      let temp = r.split(text)
      return temp[0] + `<b>${text}</b>` + temp[1]
    })
}

export function callApi(text) {
  var pre = 'pre';
  var post = 'post';
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COEFF)) {
        reject();
      } else {
        resolve(processSuggestion(results, text));
      }
    }, randomTimeout);
  });
}
// ================================= Mock Server End =============================