

const apiTokenInput = document.getElementById("api-token");
const endpointSelect = document.getElementById("endpoint");
const fetchBtn = document.getElementById("fetch-btn");
const apiResponseBox = document.getElementById("api-response");
const apiImage = document.getElementById("api-image");
const apiMessage = document.getElementById("api-message");

async function fetchWaifuApi() {
  const token = apiTokenInput.value.trim();
  const endpoint = endpointSelect.value;
  if (!token) {
    apiResponseBox.textContent = "Please enter your API token.";
    apiImage.style.display = "none";
    apiMessage.textContent = "";
    return;
  }
  apiResponseBox.textContent = "Loading...";
  apiImage.style.display = "none";
  apiImage.src = "";
  apiMessage.textContent = "";
  try {
    const url = `https://waifu.it/api/v4/${endpoint}`;
    const response = await fetch(url, {
      headers: {
        Authorization: token
      }
    });
    const data = await response.json();
    apiResponseBox.textContent = JSON.stringify(data, null, 2);

    // Try to display image and message if present
    if (data && data.url) {
      apiImage.src = data.url;
      apiImage.style.display = "block";
    } else {
      apiImage.style.display = "none";
    }
    if (data && data.message) {
      apiMessage.textContent = data.message;
    } else {
      apiMessage.textContent = "";
    }
  } catch (error) {
    apiResponseBox.textContent = "Error: " + error.message;
    apiImage.style.display = "none";
    apiMessage.textContent = "";
  }
}

fetchBtn.addEventListener("click", fetchWaifuApi);
