import { useSandpack } from "@codesandbox/sandpack-react";

const SimpleCodeViewer = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;
  console.log(123, files);
  console.log(111, activeFile);
  const code = files[activeFile].code;
  return <pre>{code}</pre>;
};

export default SimpleCodeViewer;
