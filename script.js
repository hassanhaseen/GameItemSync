let $authUrlBox = document.getElementById("link");
let $jsonDownloadButton = document.getElementById("postPurchaseButton");
var globalData = "";
document
  .getElementById("scrapeForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let data = await fetch("https://cyber1337x.alwaysdata.net/getJson", {
      body: JSON.stringify({
        link: $authUrlBox.value,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    globalData = await data.json();
    document.getElementById("content").value = JSON.stringify(globalData, null, 2)
    $jsonDownloadButton.disabled = false
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

$jsonDownloadButton.addEventListener("click", function () {
  const blob = new Blob([JSON.stringify(globalData, null, 2)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  const fileName = `${globalData.ign}-data.json`;
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
});
