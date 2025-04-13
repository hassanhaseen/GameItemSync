let $authUrlBox = document.getElementById("auth-url");
let $jsonDownloadButton = document.getElementById("download-btn");
let $copyButton = document.getElementById("copyButton");
let $btnLoader = document.getElementById("buttonLoader");
let $submitButton = document.getElementById("submit-btn");
let $skinInfoCopybutton = document.getElementById("skinInfoButton");
var globalData = {};
var gbInfo = {};
var skinsInfo = {};


document
  .getElementById("submit-btn")
  .addEventListener("click", async function (event) {
    $submitButton.disabled = true;
    $btnLoader.classList.remove("hiddenButton");

    try {
      let data = await fetch("https://cyber1337x.alwaysdata.net/getJson", {
        body: JSON.stringify({
          link: $authUrlBox.value,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data.status)
      console.log(data.statusText)
      if (data.status != 200) {
        console.log(data.status + "->" + data.statusText)
        let text = await data.json();
        alert("ERROR: " + JSON.stringify(text));
        return;
      }
      $btnLoader.classList.add("hiddenButton");
      globalData = await data.json();
      gbInfo = globalData["format"]
      skinsInfo = globalData["info"]
      alert(`${gbInfo[0].ign} Information Fetched`);
      document.getElementById("content").value = JSON.stringify(
        globalData,
        null,
        2
      );
      $jsonDownloadButton.disabled = false;
      $copyButton.disabled = false;
      $submitButton.disabled = false;
      $skinInfoCopybutton.disabled = false;
    } catch {
      alert("ERROR: Invalid Token!");
      $submitButton.disabled = false;
      $btnLoader.classList.add("hiddenButton");
    }
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

$copyButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(JSON.stringify(gbInfo));
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
});

$skinInfoCopybutton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(JSON.stringify(skinsInfo));
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
});

$jsonDownloadButton.addEventListener("click", function () {
  const blob = new Blob([JSON.stringify(gbInfo, null, 2)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  const fileName = `${gbInfo[0].ign}-data.json`;
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
});
