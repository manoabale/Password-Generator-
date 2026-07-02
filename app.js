const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strength");
const base64Result = document.getElementById("base64Result");
const shaResult = document.getElementById("shaResult");

document.getElementById("convertBase64").addEventListener("click", () => {
  const password = passwordInput.value;
  if (!password) return;

  const base64 = btoa(password);
  base64Result.textContent = base64;

  checkStrength(password);
});

document.getElementById("convertSHA").addEventListener("click", async () => {
  const password = passwordInput.value;
  if (!password) return;

  const sha = await sha256(password);
  shaResult.textContent = sha;

  checkStrength(password);
});

function checkStrength(password) {
  let strength = "Weak";

  if (password.length > 6) strength = "Medium";
  if (password.length > 10 && /[A-Z]/.test(password) && /\d/.test(password)) {
    strength = "Strong";
  }

  strengthText.textContent = strength;
}

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
