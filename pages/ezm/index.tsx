import EzSelect from "@/components/EzSelect";
import CustomSandPack from "@/components/sandPack/CustomSandPack";
import useOpenAi from "@/hooks/useOpenAi";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import Container from "@/components/Conatiner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight, faChevronDown, faPlus
} from "@fortawesome/free-solid-svg-icons";

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
          className="flex flex-row justify-start items-end w-full mb-9 mt-8"
          onSubmit={onSubmit}
        >
          <div
            className="relative flex flex-row items-end rounded-2xl max-w-screen-md w-full mr-3"
            style={{ background: "#f4f4f5" }}
          >
            <Textarea
              className="w-full rounded-2xl pl-1 pr-10 bg-transparent promptBox"
              placeholder="Please enter your request."
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
              size="md"
              color="primary"
              isIconOnly
              className="absolute bottom-1 right-1 rounded-full border-4 border-sky-800"
              type="submit"
              isLoading={isLoading}
            >
              <FontAwesomeIcon
                icon={aiCode ? faPlus : faChevronDown}
                className="text-white text-2xl"
              ></FontAwesomeIcon>
              {/* {aiCode ? "추가 요청" : "요청"} */}
            </Button>
          </div>
          <Button
            radius="full"
            isIconOnly
            disabled={isLoading}
            onClick={onReset}
            style={{ width: "45px", height: "45px", background: "#EFEFEF" }}
          >
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              className={`text-2xl ${isLoading ? "" : ""}`}
              style={{ color: "rgba(0,0,0,0.2)" }}
            ></FontAwesomeIcon>
          </Button>
        </form>

        <CustomSandPack aiCode={aiCode} setAiCode={setAiCode} />
      </div>
    </Container>
  );
}
