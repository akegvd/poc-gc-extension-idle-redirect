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
          redirectToHomepage(settings.homepageUrl);
        }
      });
    }
  });
}

// Redirect all tabs to homepage
function redirectToHomepage(homepageUrl) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      // Skip chrome:// and edge:// URLs
      if (!tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
        chrome.tabs.update(tab.id, { url: homepageUrl });
      }
    });
  });
}

// Listen for settings changes
chrome.storage.onChanged.addListener((changes) => {
  setupIdleDetection();
});

// Initial setup
setupIdleDetection();
