'use strict';

const countPoint = document.getElementById('countPoint');
const resultTable = document.getElementById('resultTable');
const result = document.getElementById('result');

resultTable.setAttribute('hidden', true);

countPoint.onclick = function(_element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(_tabs) {
    chrome.tabs.executeScript({
        file: 'src/contentScript.js'
    });
  });
  countPoint.textContent = 'now counting...';
  while (result.firstChild) result.removeChild(result.firstChild);
};

chrome.runtime.onMessage.addListener(
  function(message, _sender, sendResponse) {
    if (message.event == 'scriptEnd'){
      for (const boardKey of Object.keys(message.value)) {
        const board = message.value[boardKey];
        var row = document.createElement('tr');
        var status = document.createElement('td');
        status.textContent = board.status;
        var point = document.createElement('td');
        point.textContent = board.point;
        row.appendChild(status);
        row.appendChild(point);
        result.appendChild(row);
      }
      if (resultTable.hasAttribute('hidden')) resultTable.removeAttribute('hidden');
    }
    countPoint.textContent = 'Count again！';
    sendResponse({result: "ok"});
  }
);