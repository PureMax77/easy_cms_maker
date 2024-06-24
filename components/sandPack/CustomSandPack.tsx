import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import SimpleCodeViewer from "./SimpleCodeViewer";
import { Dispatch, SetStateAction } from "react";
import { SandPack_Default_Code } from "@/constants/common";
import CustomAceEditor from "./CustomAceEditor";

interface ISandProps {
  aiCode: string;
  setAiCode: Dispatch<SetStateAction<string>>;
}

const CustomSandPack: React.FC<ISandProps> = ({ aiCode, setAiCode }) => {
  return (
    <SandpackProvider
      style={{ width: "100%" }}
      template="react-ts"
      options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
      customSetup={{
        dependencies: {
          "react-dnd": "latest",
          "react-dnd-html5-backend": "latest",
          "react-beautiful-dnd": "latest",
          "immutability-helper": "latest",
        },
      }}
      files={{
        "/App.tsx": {
          code: aiCode ? `${aiCode}` : SandPack_Default_Code,
        },
      }}
    >
      <SandpackLayout>
        <div className="flex flex-row w-full">
          {/* <SandpackCodeEditor showLineNumbers showTabs={true} wrapContent /> */}
          <CustomAceEditor aiCode={aiCode} setAiCode={setAiCode} />
          {/* This will render the pre on the right side of your sandpack component */}
          <SandpackPreview />
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CustomSandPack;
