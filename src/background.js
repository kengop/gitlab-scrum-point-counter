'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        css: ['div.board', '.board-title-text']
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
