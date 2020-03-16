'use strict';

var boadCollection = document.querySelectorAll('div.board');

var boardPoints = {};
for (const board of boadCollection) {
  const titleElement = board.querySelector('span.board-title-text');
  const titleText = titleElement.textContent.trim();
  // init
  boardPoints[titleText] = {
    title: titleText,
    point: 0,
  };

  // count point
  const visibleCardCollection = board.querySelectorAll('li.board-card');
  let pointSum = 0;
  for (const card of visibleCardCollection) {
    const labelCollection = card.querySelectorAll('div.board-card-footer button');
    for (const label of labelCollection) {
      const labelName = label.textContent.trim();

      // NOTE: count only label startsWith 'point:'.
      if (!labelName.startsWith('point:')) {
        continue;
      }
      const point = parseFloat(labelName.substr(6, labelName.length - 6));
      pointSum += point;
    }
  }
  boardPoints[titleText].point = pointSum;
}

chrome.runtime.sendMessage({event: 'scriptEnd', value: boardPoints}, function(_response) {});