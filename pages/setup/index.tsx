import { SandPack_Default_Code } from "@/constants/common";
import useOpenAi from "@/hooks/useOpenAi";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import Container from "@/components/Conatiner";

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
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">CMS Setup</h1>
      <div className="flex flex-col max-w-[1200px] justify-center w-full">
        <div className="flex flex-col gap-3 mt-5 border-b-1 py-5 border-neutral-300 border-dashed">
          <div className="mb-2 sectionTitle">
            <span>Setup</span>
          </div>
          <div className="px-3">sdfsdfsfdsddfsfd</div>
        </div>
      </div>
    </Container>
  );
}
