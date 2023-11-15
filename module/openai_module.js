// This code is for v4 of the openai package: npmjs.com/package/openai
//import OpenAI from "openai";

const OpenAI = require('openai');
const secretConfig = require('../config/secret_config.json');

const openai = new OpenAI({
  apiKey: secretConfig.openAI,
});



module.exports = {
  create: async (text) => {

    const response = await openai.chat.completions.create({
      //model: "text-davinci-003",
      model:"gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": "너의 이름은 무엇이니"
        },
        {
          "role": "assistant",
          "content": "저는 OpenAI의 인공지능 비서, GPT-3입니다."
        },
        {
            "role" : "user",
            "content":text
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response;

  }
}


