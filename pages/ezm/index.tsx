import CustomSandPack from "@/components/sandPack/CustomSandPack";
import { SandPack_Default_Code } from "@/constants/common";
import useOpenAi from "@/hooks/useOpenAi";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import Container from "@/components/Conatiner";

export default function AiTest() {
  const { getAiCode, aiCode, setAiCode, isLoading } = useOpenAi();

  const [userContent, setUserContent] = useState<string>("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    getAiCode(userContent).then(() => {
      setUserContent("");
    });
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">EZCodeMaker</h1>
      <div className="flex flex-col justify-start gap-4 py-8 md:py-10">
        <form
          className="flex flex-row items-start justify-start w-full"
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

        <CustomSandPack aiCode={aiCode} setAiCode={setAiCode} />
      </div>
    </Container>
  );
}
