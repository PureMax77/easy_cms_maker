import EzSelect from "@/components/EzSelect";
import CustomSandPack from "@/components/sandPack/CustomSandPack";
import useOpenAi from "@/hooks/useOpenAi";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import Container from "@/components/Conatiner";

export default function AiTest() {
  const { getAiCode, aiCode, setAiCode, isLoading, onReset } = useOpenAi();

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
      <div>
        <EzSelect />

        <form
          className="flex flex-row justify-start items-end w-full mb-10 mt-20"
          onSubmit={onSubmit}
        >
          <Textarea
            className="mr-3 max-w-screen-md w-full rounded-full"
            placeholder="요청사항을 입력하세요."
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
          />
          {/* <Input
            className="mr-3 max-w-screen-md w-full"
            placeholder="요청사항을 입력하세요."
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
          /> */}
          <Button
            className="mr-2"
            color="primary"
            type="submit"
            isLoading={isLoading}
          >
            {aiCode ? "추가 요청" : "요청"}
          </Button>
          <Button color="danger" disabled={isLoading} onClick={onReset}>
            초기화
          </Button>
        </form>

        <CustomSandPack aiCode={aiCode} setAiCode={setAiCode} />
      </div>
    </Container>
  );
}
