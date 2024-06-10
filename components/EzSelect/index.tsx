import { BasicDirectionTypes, IBasicLayout } from "@/types";
import { Button, Tab, Tabs, RadioGroup, Radio } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import TagStep from "./TagStep";
import { useAtom } from "jotai";
import { initListValue, sectionListAtom } from "@/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

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
    <>
      <div className="flex flex-col max-w-[1380px] justify-center w-full">
        <div className="flex flex-col mb-5 border-b-1 py-5 border-neutral-300 border-dashed">
          <div className="mb-2 sectionTitle">
            <span>Select Page layout direction and number.</span>
          </div>
          <div className="flex items-center gap-3 px-2 mt-2">
            <Tabs
              color="success"
              onSelectionChange={(v: any) =>
                setBasicLayout((preV) => {
                  return { ...preV, direction: v };
                })
              }
              className="optTabs"
            >
              {directionTypes.map((type) => (
                <Tab
                  key={type}
                  title={
                    <div>
                      <FontAwesomeIcon
                        icon={
                          type == "Horizontal"
                            ? faGripHorizontal
                            : faGripVertical
                        }
                        className="fas fa-check mr-2"
                      ></FontAwesomeIcon>
                      {type}
                    </div>
                  }
                />
              ))}
            </Tabs>
            <RadioGroup
              className="ml-3"
              orientation="horizontal"
              value={basicLayout.step}
              onValueChange={(v: any) =>
                setBasicLayout((preV) => {
                  return { ...preV, step: v };
                })
              }
            >
              <Radio value="1" className="mr-1">
                1 Section
              </Radio>
              <Radio value="2" className="mr-1">
                2 Section
              </Radio>
              <Radio value="3">3 Section</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-5 border-b-1 pb-5 border-neutral-300 border-dashed">
          <div className="mb-2 sectionTitle">
            <span>Enter the Page title and information.</span>
          </div>
          <div className="px-3">
            <dl className="flex flex-row w-full gap-3">
              <dt className="w-[275px] font-medium">Page Title</dt>
              <dd className="w-full">
                <input
                  type="text"
                  className="w-full border-1 border-neutral-300 rounded h-[36px]"
                />
              </dd>
            </dl>
            <dl className="flex flex-row w-full gap-3 mt-2">
              <dt className="w-[275px] font-medium">Page Description</dt>
              <dd className="w-full">
                <textarea className="w-full border-1 border-neutral-300 rounded h-[74px]" />
              </dd>
            </dl>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="mb-0 sectionTitle">
            <span>Select a tag to enter a section.</span>
          </div>
          {sectionList.map((_, index) => (
            <TagStep key={index} itemKey={index} />
          ))}
        </div>
        <div className="flex justify-end border-b-1 py-5 px-3 border-neutral-300 border-dashed">
          <Button
            color="primary"
            className="w-[200px] mb-2 border-2 border-sky-800 rounded-md text-lg"
          >
            OK
          </Button>
        </div>
      </div>
    </>
  );
};

export default EzSelect;
