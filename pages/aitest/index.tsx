import { Sandpack } from "@codesandbox/sandpack-react";
import { Button, Input } from "@nextui-org/react";
import OpenAI, { ClientOptions } from "openai";
import { useState } from "react";

export default function AiTest() {
  const [aiCode, setAiCode] = useState<string>(`export default function App() {
  return <h1>Hello Sandpack</h1>
}`);
  const [userContent, setUserContent] = useState<string>("");

  const getCode = async (content: string) => {
    const response = await fetch("/api/summarizer", {
      method: "POST", // HTTP 메소드를 POST로 설정
      headers: {
        "Content-Type": "application/json", // 콘텐츠 타입을 JSON으로 지정
      },
      body: JSON.stringify({
        content, // 전송할 데이터
      }),
    });

    const result = await response.json();
    const cleanCode = result.summary.replace(/```typescript|```tsx|```/g, "");
    console.log(cleanCode);
    setAiCode(cleanCode);
    // return completion;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    getCode(userContent);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <form
        className="flex flex-row justify-center w-full mx-auto"
        onSubmit={onSubmit}
      >
        <Input
          className="mr-2 max-w-screen-md w-full"
          placeholder="요청사항을 입력하세요."
          value={userContent}
          onChange={(e) => setUserContent(e.target.value)}
        />
        <Button type="submit">요청</Button>
      </form>

      <Sandpack
        template="react-ts"
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        files={{
          "/App.tsx": {
            code: `${aiCode}`,
          },
        }}
      />
    </div>
  );
}
