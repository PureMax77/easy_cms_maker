import EzSelect from "@/components/EzSelect";
import CustomSandPack from "@/components/sandPack/CustomSandPack";
import useOpenAi from "@/hooks/useOpenAi";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Button, Input, Textarea } from "@nextui-org/react";
import Container from "@/components/Conatiner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAtom, useSetAtom } from "jotai";
import { chartAddPromptAtom, promptAtom, templateAddPromptAtom } from "@/store";

export default function Home() {
  const { getAiCode, aiCode, setAiCode, isLoading, onReset } = useOpenAi();

  const [promptContent, setPromptContent] = useAtom(promptAtom);
  const setAddPrompt = useSetAtom(templateAddPromptAtom);
  const setChartAddPrompt = useSetAtom(chartAddPromptAtom);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    getAiCode(promptContent).then(() => {
      setPromptContent("");
      setAddPrompt("");
      setChartAddPrompt([]);
    });
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">EZCodeMaker</h1>
      <div>
        <EzSelect />

        <form
          className="flex flex-row justify-start items-end w-full mb-6 mt-6"
          onSubmit={onSubmit}
        >
          <div
            className="relative flex flex-row items-end max-w-screen-md w-full mr-3"
            style={{ background: "#f4f4f5", borderRadius: "25px" }}
          >
            <Textarea
              className="w-full rounded-2xl pl-2 pt-1 pb-1 pr-10 bg-transparent promptBox"
              placeholder="Please enter your request."
              value={promptContent}
              size="lg"
              maxRows={100}
              onChange={(e) => setPromptContent(e.target.value)}
            />
            {/* <Input
            className="mr-3 max-w-screen-md w-full"
            placeholder="요청사항을 입력하세요."
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
          /> */}
            <Button
              size="sm"
              isIconOnly
              className="absolute bottom-2 right-2 rounded-full border-3 border-black"
              type="submit"
              isLoading={isLoading}
              style={{ width: "38px", height: "38px", background: "#2F88FF" }}
            >
              <FontAwesomeIcon
                icon={aiCode ? faPlus : faChevronDown}
                className="text-white"
                style={{ fontSize: "25px" }}
              ></FontAwesomeIcon>
              {/* {aiCode ? "추가 요청" : "요청"} */}
            </Button>
          </div>
          <Button
            radius="full"
            isIconOnly
            disabled={!aiCode}
            onClick={onReset}
            className="bg-gray-200"
            style={{
              width: "45px",
              height: "45px",
              marginBottom: "4px",
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              style={{
                fontSize: "26px",
                color: aiCode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)",
              }}
            ></FontAwesomeIcon>
          </Button>
        </form>

        <CustomSandPack aiCode={aiCode} setAiCode={setAiCode} />
      </div>
    </Container>
  );
}
