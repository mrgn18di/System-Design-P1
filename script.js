const endpointSelect = document.getElementById("endpoint");
const fetchBtn = document.getElementById("fetch-btn");
const apiResponseBox = document.getElementById("api-response");
const apiImage = document.getElementById("api-image");
const apiMessage = document.getElementById("api-message");
const spinner = document.getElementById("spinner");

// Your API token from waifu.it
const API_TOKEN = "NTUzNDU1MzI5NDA1NDM1OTI5.MTc2MDY0Nzc3MQ--.d68fbc6873a2";

async function fetchWaifuApi() {
  const endpoint = endpointSelect.value;

  // show loading spinner
  spinner.style.display = "block";
  apiResponseBox.textContent = "Loading...";
  apiImage.style.display = "none";
  apiImage.classList.remove("show");
  apiMessage.textContent = "";

  try {
    const url = `https://waifu.it/api/v4/${endpoint}`;
    const response = await fetch(url, {
      headers: { Authorization: API_TOKEN },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch API: " + response.status);
    }

    const data = await response.json();
    apiResponseBox.textContent = JSON.stringify(data, null, 2);

    // hide spinner and show image
    spinner.style.display = "none";

    if (data && data.url) {
      apiImage.src = data.url;
      apiImage.style.display = "block";
      setTimeout(() => apiImage.classList.add("show"), 50);
    }

    if (data && data.message) {
      apiMessage.textContent = data.message;
    }
  } catch (error) {
    spinner.style.display = "none";
    apiResponseBox.textContent = "Error: " + error.message;
    apiImage.style.display = "none";
    apiMessage.textContent = "";
  }
}

fetchBtn.addEventListener("click", fetchWaifuApi);
