import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Método não permitido" });
    }

    const request = req.body;

    const response = await axios.post(
      process.env.backend + "/agent-collector/send-message", // Substitua pela URL do endpoint
      { message: request.message, sessionSlug: request.sessionSlug }, // Corpo da requisição
      {
        headers: {
          Authorization: `Bearer ${request.token}`, // Adiciona o token no cabeçalho
          "Content-Type": "application/json", // Opcional, define o tipo do conteúdo
        },
      }
    );

    // console.log(response.data);

    // Resposta do assistente
    const assistantMessage = {
      id: Math.random()
        .toString(36)
        .substring(2, 2 + 10),
      role: "assistant",
      content: response.data.message,
    };

    res.status(200).json({
      message: assistantMessage,
      collected: response.data.data_collected,
    });
  } catch (error) {
    console.log(error);
  }
}
