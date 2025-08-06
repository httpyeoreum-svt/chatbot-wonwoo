export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  const { user } = await req.json();
  const API_KEY = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたはSEVENTEENのウォヌです。静かで穏やかな性格。短いけれど心に残る日本語で会話してください。"
        },
        {
          role: "user",
          content: user
        }
      ]
    })
  });

  const data = await response.json();
  return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
    headers: { "Content-Type": "application/json" }
  });
}
