import { Configuration, OpenAIApi } from "openai";
export const Fetch = async (prompt2) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.MY_APP_AI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: "Cyberpunk City Citizen",
      n: 2,
      size: "1024x1024",
    });
    console.log(response);
    const image = response.data.data[0].url;
    return image;
  } catch (error) {
    console.log(error);
  }
};