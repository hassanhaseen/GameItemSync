const form = document.getElementById("login-form");
const loader = document.getElementById("buttonLoader");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.style.visibility = "visible";
  resultDiv.textContent = "";

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await axios.post(
      "https://cyber1337x.alwaysdata.net/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    resultDiv.textContent = "Login successful!";

    window.location.href = "/index.html";
  } catch (error) {
    resultDiv.textContent = "Login failed. Please check your credentials.";
    resultDiv.style.color = "tomato";
  } finally {
    loader.style.visibility = "hidden";
  }
});
