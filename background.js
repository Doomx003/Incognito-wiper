const incognitoTabs = new Set();

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.incognito) {
    incognitoTabs.add(tab.id);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (incognitoTabs.has(tabId)) {
    incognitoTabs.delete(tabId);
    chrome.browsingData.remove({
      since: 0
    }, {
      cache: true,
      cookies: true,
      history: true,
      localStorage: true,
      sessions: true
    }, () => {
      console.log("Incognito data erased.");
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Incognito Data Eraser installed.");
});
