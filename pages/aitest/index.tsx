import { SandPack_Default_Code } from "@/constants/common";
import useOpenAi from "@/hooks/useOpenAi";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function AiTest() {
  const { getAiCode, aiCode, isLoading } = useOpenAi();

  const [userContent, setUserContent] = useState<string>("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    getAiCode(userContent).then(() => {
      setUserContent("");
    });
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
        <Button type="submit" isLoading={isLoading}>
          {aiCode ? "추가 요청" : "요청"}
        </Button>
      </form>

      <div className="w-full">
        <Sandpack
          template="react-ts"
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            editorHeight: 600,
          }}
          files={{
            "/App.tsx": {
              code: aiCode ? `${aiCode}` : SandPack_Default_Code,
            },
          }}
        />
      </div>
    </div>
  );
}
