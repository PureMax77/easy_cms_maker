import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI, { ClientOptions } from "openai";

type Data = {
  summary?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // 요청 본문에서 데이터 추출
    const { content: userContent, aiCode } = req.body;

    const isUpdate = !!aiCode; // 코드 업데이트 요청인지
    const finalContent = isUpdate
      ? `Modify the {code} presented above to suit {request}.
      {code}=${aiCode}
      {request}=${userContent}`
      : userContent;

    const configuration: ClientOptions = {
      apiKey: process.env.OPENAI_API_KEY,
    };
    const client = new OpenAI(configuration);

    try {
      console.log("start Summarize");
      const completion = await client.chat.completions.create({
        model: "gpt-4o", // 사용할 모델을 지정하세요.
        messages: [
          {
            role: "system",
            content:
              "You are an assistant who writes React App.tsx code using TailwindCss. You must provide only code, no additional explanation, in your answer. And you should not import and use external files or variables in your code.",
          },
          {
            role: "user",
            content: finalContent,
          },
        ],
        temperature: 0, // 창의성 표현 0~1
        max_tokens: 4000,
        top_p: 0.7, // 다양한 가능성?을 고려하는 정도 0~1
        frequency_penalty: 0.0, // 자주 반복되는 단어 사용을 줄이기 위해
        presence_penalty: 0.0, // 이미 나온 내용을 반복하는 것을 줄이기 위해
      });
      // console.log(completion.choices[0].message.content);
      console.log("Finished Summarize");
      // console.log(completion.choices[0].message);

      res
        .status(200)
        .json({ summary: completion.choices[0].message.content || "" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "OpenAI 요청 중 에러 발생" });
    }
  } else {
    // POST 요청이 아닐 경우, 405 Method Not Allowed 응답
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
