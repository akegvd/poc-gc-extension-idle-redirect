// Default settings
const DEFAULT_SETTINGS = {
  idleTimeout: 300, // 5 minutes in seconds
  homepageUrl: "https://www.google.com", // Default homepage
  enabled: true,
};

// Initialize settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
    chrome.storage.sync.set(items);
  });
});

// Setup idle detection
function setupIdleDetection() {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
    if (settings.enabled) {
      chrome.idle.setDetectionInterval(settings.idleTimeout);
      chrome.idle.onStateChanged.addListener((state) => {
        if (state === "idle") {
          redirectCurrentTab(settings.homepageUrl);
        }
      });
    }
  });
}

// Redirect only the current tab to homepage
function redirectCurrentTab(homepageUrl) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      const currentTab = tabs[0];
      // Skip chrome:// and edge:// URLs
      if (
        !currentTab.url.startsWith("chrome://") &&
        !currentTab.url.startsWith("edge://")
      ) {
        chrome.tabs.update(currentTab.id, { url: homepageUrl });
      }
    }
  });
}

// Listen for settings changes
chrome.storage.onChanged.addListener((changes) => {
  setupIdleDetection();
});

// Initial setup
setupIdleDetection();
