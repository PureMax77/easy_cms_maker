import {
  BasicDirectionTypes,
  EzListLayoutTypes,
  EzTagTypes,
  IBasicLayout,
} from "@/types";
import {
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import TagStep from "./TagStep";

const EzSelect: React.FC = () => {
  const [basicLayout, setBasicLayout] = useState<IBasicLayout>({
    direction: BasicDirectionTypes.HORIZONTAL,
    step: "1",
  });

  const directionTypes: BasicDirectionTypes[] = useMemo(
    () => Object.values(BasicDirectionTypes),
    []
  );

  return (
    <div className="flex flex-col max-w-[1280px] justify-center w-full">
      <div className="flex flex-col mb-5 border-b-1 py-5">
        <div className="mb-2 sectionTitle">
          <span>Select Page layout direction and number.</span>
        </div>
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
      <div className="flex flex-col gap-3 mb-5 border-b-1 pb-5">
        <div className="mb-2 sectionTitle">
          <span>Enter the Page title and information.</span>
        </div>
        <dl className="flex flex-row w-full gap-3">
          <dt className="w-[220px]">Page Title</dt>
          <dd className="w-full">
            <input type="text" className="w-full border-1 rounded-sm" />
          </dd>
        </dl>
        <dl className="flex flex-row w-full gap-3">
          <dt className="w-[220px]">Page Description</dt>
          <dd className="w-full">
            <textarea className="w-full border-1 rounded-sm" />
          </dd>
        </dl>
      </div>
      <div className="flex flex-col gap-3">
        <div className="mb-2 sectionTitle">
          <span>Select a tag to enter a section.</span>
        </div>
        {Array.from({ length: Number(basicLayout.step) }, (_, index) => (
          <TagStep key={index} itemKey={index} />
        ))}
      </div>
    </div>
  );
};

export default EzSelect;
