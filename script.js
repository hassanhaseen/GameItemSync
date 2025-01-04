let $authUrlBox = document.getElementById("authurl");

document
  .getElementById("dataForm")
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

    data = await data.json();

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");

    // Use IGN for the file name, fallback to "data" if IGN is not available
    const fileName = `${data.ign}-data.json`;

    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
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
