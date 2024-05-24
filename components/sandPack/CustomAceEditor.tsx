import { useActiveCode } from "@codesandbox/sandpack-react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { SandPack_Default_Code } from "@/constants/common";
import { Dispatch, SetStateAction, useEffect } from "react";

interface IEditorProps {
  aiCode: string;
  setAiCode: Dispatch<SetStateAction<string>>;
}

const CustomAceEditor: React.FC<IEditorProps> = ({ aiCode, setAiCode }) => {
  // const { code, updateCode } = useActiveCode();

  // useEffect(() => {
  //   setAiCode(code);
  // }, [code]);

  return (
    <AceEditor
      mode="typescript"
      theme="monokai"
      value={aiCode ? aiCode : SandPack_Default_Code}
      onChange={(newCode) => setAiCode(newCode)}
      fontSize={14}
      editorProps={{ $blockScrolling: true }}
      height="500px"
      width="100%"
    />
  );
};

export default CustomAceEditor;
