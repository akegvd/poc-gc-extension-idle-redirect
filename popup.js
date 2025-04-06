document.addEventListener("DOMContentLoaded", () => {
  const idleTimeoutInput = document.getElementById("idleTimeout");
  const timeoutError = document.getElementById("timeoutError");

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

  // Validate idle timeout input
  idleTimeoutInput.addEventListener("input", () => {
    const value = parseInt(idleTimeoutInput.value);
    if (value < 15) {
      timeoutError.style.display = "block";
      idleTimeoutInput.setCustomValidity("Minimum idle timeout is 15 seconds");
    } else {
      timeoutError.style.display = "none";
      idleTimeoutInput.setCustomValidity("");
    }
  });

  // Save settings
  document.getElementById("save").addEventListener("click", () => {
    const idleTimeout = parseInt(idleTimeoutInput.value);
    const homepageUrl = document.getElementById("homepageUrl").value;
    const enabled = document.getElementById("enabled").checked;

    // Validate idle timeout before saving
    if (idleTimeout < 15) {
      timeoutError.style.display = "block";
      return;
    }

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
