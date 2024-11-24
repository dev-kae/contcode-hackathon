export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const request = req.body;

  console.log(request.message);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Aguarde 2500ms antes de continuar
  await delay(2500);

  // Resposta do assistente
  const assistantMessage = {
    id: "lhygfghjklç5555jhgf",
    role: "assistant",
    content:
      "Claro! Vamos começar definindo os valores da sua marca." +
      request.message,
  };

  res.status(200).json(assistantMessage);
}
