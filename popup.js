document.addEventListener("DOMContentLoaded", () => {
  // Load current settings
  chrome.storage.sync.get(
    {
      idleTimeout: 300,
      homepageUrl: "https://www.google.com",
      enabled: true,
    },
    (items) => {
      document.getElementById("idleTimeout").value = items.idleTimeout;
      document.getElementById("homepageUrl").value = items.homepageUrl;
      document.getElementById("enabled").checked = items.enabled;
    }
  );

  // Save settings
  document.getElementById("save").addEventListener("click", () => {
    const idleTimeout = parseInt(document.getElementById("idleTimeout").value);
    const homepageUrl = document.getElementById("homepageUrl").value;
    const enabled = document.getElementById("enabled").checked;

    chrome.storage.sync.set(
      {
        idleTimeout: idleTimeout,
        homepageUrl: homepageUrl,
        enabled: enabled,
      },
      () => {
        // Show saved message
        const status = document.createElement("div");
        status.textContent = "Settings saved!";
        status.style.color = "green";
        document.body.appendChild(status);
        setTimeout(() => status.remove(), 2000);
      }
    );
  });
});
