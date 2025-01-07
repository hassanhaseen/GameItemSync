let $authUrlBox = document.getElementById("auth-url");
let $jsonDownloadButton = document.getElementById("download-btn");
let $btnLoader = document.getElementById("buttonLoader");
let $submitButton = document.getElementById("submit-btn")
var globalData = "";
document
  .getElementById("submit-btn")
  .addEventListener("click", async function (event) {
    $submitButton.disabled = true
    $btnLoader.classList.remove("hiddenButton")

    let data = await fetch("https://cyber1337x.alwaysdata.net/getJson", {
      body: JSON.stringify({
        link: $authUrlBox.value,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.status != 200) {
      let text = await data.json();
      alert("ERROR: " + JSON.stringify(text))
      return;
    }
    $btnLoader.classList.add("hiddenButton")
    globalData = await data.json();
    alert(`${globalData[0].ign} Information Fetched`)
    document.getElementById("content").value = JSON.stringify(globalData, null, 2)
    $jsonDownloadButton.disabled = false
    $submitButton.disabled = false
  });

function pasteText(elementId) {
  navigator.clipboard
    .readText()
    .then((text) => {
      document.getElementById(elementId).value = text;
    })
    .catch(() => {
      alert("Failed to paste. Please allow clipboard permissions.");
    });
}


document.getElementById("copyButton").addEventListener("click", function () {
  let content = document.getElementById("content");
  content.select();
  content.setSelectionRange(0, 99999); // For mobile devices

  try {
    document.execCommand("copy");
    alert("Account Info to clipboard!");
  } catch (err) {
    alert("Failed to copy content.");
  }
});
$jsonDownloadButton.addEventListener("click", function () {
  const blob = new Blob([JSON.stringify(globalData, null, 2)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  const fileName = `${globalData[0].ign}-data.json`;
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
});
