import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
config()

function inputToObject(input: string) {
  const jsonObject = JSON.parse(input);
  // console.log(jsonObject);
  return jsonObject
}

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
)

export function searchJobFields(jobString: string): object{
  return openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You will be provided a job description. Please return the company, position, location, and salary amount. Please return response ONLY in a JS object format with no other text. If data is not available for certain field, return empty string." },
      { role: "user", content: jobString }
    ]
  })
    .then(res => {
      if(res.data.choices[0].message === undefined) return ''
      console.log(res.data.choices[0].message.content) //! Delete after
      return res.data.choices[0].message.content
    })
    .then( (res:string | undefined) => {
      return inputToObject(res!)
    })
    
}