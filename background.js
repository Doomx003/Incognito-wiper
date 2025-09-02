chrome.runtime.onInstalled.addListener(() => {
  console.log("Incognito Data Eraser installed.");
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (removeInfo.isIncognito) {
    chrome.browsingData.remove({
      "since": 0
    }, {
      "cache": true,
      "cookies": true,
      "history": true,
      "localStorage": true,
      "sessions": true
    }, () => {
      console.log("Incognito data erased.");
    });
  }
});
