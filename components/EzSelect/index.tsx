import { BasicDirectionTypes, IBasicLayout } from "@/types";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import TagStep from "./TagStep";
import { useAtom } from "jotai";
import { initListValue, sectionListAtom } from "@/store";

const EzSelect: React.FC = () => {
  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const [basicLayout, setBasicLayout] = useState<IBasicLayout>({
    direction: BasicDirectionTypes.HORIZONTAL,
    step: "1",
  });

  const directionTypes: BasicDirectionTypes[] = useMemo(
    () => Object.values(BasicDirectionTypes),
    []
  );

  useEffect(() => {
    setSectionList(Array(Number(basicLayout.step)).fill(initListValue));
  }, [basicLayout.step]);

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-col mb-5 border-b-1 py-5">
        <span className="mb-2">Select Page layout direction and number</span>
        <div className="flex gap-3">
          <Tabs
            color="success"
            radius="sm"
            onSelectionChange={(v: any) =>
              setBasicLayout((preV) => {
                return { ...preV, direction: v };
              })
            }
          >
            {directionTypes.map((type) => (
              <Tab key={type} title={type} />
            ))}
          </Tabs>
          <Tabs
            color="danger"
            radius="sm"
            onSelectionChange={(v: any) =>
              setBasicLayout((preV) => {
                return { ...preV, step: v };
              })
            }
          >
            <Tab key="1" title="1단" />
            <Tab key="2" title="2단" />
            <Tab key="3" title="3단" />
          </Tabs>
          <Button color="primary">OK</Button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="mb-2 underline underline-offset-4">
          Select a tag to enter a section
        </span>
        {sectionList.map((_, index) => (
          <TagStep key={index} itemKey={index} />
        ))}
      </div>
    </div>
  );
};

export default EzSelect;
