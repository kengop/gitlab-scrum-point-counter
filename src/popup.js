'use strict';

const countPoint = document.getElementById('countPoint');
const result = document.getElementById('result');

countPoint.onclick = function(_element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(_tabs) {
    chrome.tabs.executeScript({
        file: 'src/contentScript.js'
    });
  });
  result.textContent = 'now counting...';
};

chrome.runtime.onMessage.addListener(
  function(message, _sender, sendResponse) {
    if (message.event == 'scriptEnd'){
      let resultText = '';
      for (const boardKey of Object.keys(message.value)) {
        const board = message.value[boardKey];
        resultText += board.title + ': ' + board.point + '\n';
      }
      result.textContent = resultText;
    }
    sendResponse({result: "ok"});
  }
);