async function sendMessage() {
  const input = document.getElementById("userInput").value;
  document.getElementById("chatLog").innerText += "\nあなた: " + input;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: input })
  });
  const data = await res.json();
  document.getElementById("chatLog").innerText += "\nウォヌ: " + data.reply;
  document.getElementById("userInput").value = "";
}
