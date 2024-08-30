import { BasicDirectionTypes, EzTagTypes } from "@/types";
import { Button, Tab, Tabs, RadioGroup, Radio } from "@nextui-org/react";
import { useMemo } from "react";
import TagStep from "./TagStep";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  basicInfoAtom,
  basicLayoutAtom,
  initListValue,
  promptAtom,
  sectionListAtom,
  templateAddPromptAtom,
} from "@/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import SampleTemplate from "./SampleTemplate";
import {
  genChartPrompt,
  genFormPrompt,
  genListPrompt,
  genTablePrompt,
} from "@/lib/prompt";

type ChangeType = "title" | "description";

const EzSelect: React.FC = () => {
  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const [basicLayout, setBasicLayout] = useAtom(basicLayoutAtom);
  const [basicInfo, setBasicInfo] = useAtom(basicInfoAtom);
  const setPromptContent = useSetAtom(promptAtom);
  const additionalPrompt = useAtomValue(templateAddPromptAtom);

  const directionTypes: BasicDirectionTypes[] = useMemo(
    () => Object.values(BasicDirectionTypes),
    []
  );

  const onStepChange = (v: any) => {
    const preStep = Number(basicLayout.step);
    const nowStep = Number(v);

    if (nowStep > preStep) {
      // step 증가
      setSectionList((prev) => {
        const newArray = JSON.parse(JSON.stringify(prev));
        const additionalData = Array(nowStep - preStep).fill(initListValue);
        newArray.push(...additionalData);
        return newArray;
      });
    } else if (preStep > nowStep) {
      // step 감소
      setSectionList((prev) => {
        const newArray = JSON.parse(JSON.stringify(prev));
        newArray.splice(nowStep - preStep);
        return newArray;
      });
    } else {
      return;
    }

    setBasicLayout((preV) => {
      return { ...preV, step: v };
    });
  };

  const onInfoChange = (e: any, type: ChangeType) => {
    setBasicInfo((preV) => {
      const newV = JSON.parse(JSON.stringify(preV));

      return {
        ...newV,
        ...(type === "title" && { title: e }),
        ...(type === "description" && { description: e }),
      };
    });
  };

  const onSetPrompt = () => {
    const titleInfo = `- title of the page : ${basicInfo.title}\n`;
    const descInfo = `- description of the page : ${basicInfo.description}\n\n`;
    const layoutInfo = `- The overall layout of the page : an application with ${
      basicLayout.step
    } ${
      basicLayout.step !== "1" ? basicLayout.direction + " " : ""
    }stacked sections\n\n`;

    const sectionInfo = sectionList
      .map((section, index) => {
        if (section.kind === EzTagTypes.LIST) {
          // List section
          return genListPrompt(section, index);
        } else if (section.kind === EzTagTypes.TABLE) {
          // Table section
          return genTablePrompt(section, index);
        } else if (section.kind === EzTagTypes.FORM) {
          // Form section
          return genFormPrompt(section, index);
        } else if (section.kind === EzTagTypes.CHART) {
          // Form section
          return genChartPrompt(section, index);
        }
      })
      .join("\n");

    setPromptContent(
      titleInfo + descInfo + layoutInfo + sectionInfo + additionalPrompt
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <SampleTemplate />

        <div className="flex flex-col gap-3 mt-5 border-b-1 py-5 border-neutral-300 border-dashed">
          <div className="mb-2 sectionTitle">
            <span>Enter the Page title and information.</span>
          </div>
          <div className="px-3">
            <dl className="flex flex-row w-full gap-3">
              <dt className="w-[275px] font-medium">Page Title</dt>
              <dd className="w-full">
                <input
                  type="text"
                  className="w-full border-1 border-neutral-300 rounded h-[36px] px-2"
                  value={basicInfo.title}
                  onChange={(e) => onInfoChange(e.target.value, "title")}
                />
              </dd>
            </dl>
            <dl className="flex flex-row w-full gap-3 mt-2">
              <dt className="w-[275px] font-medium">Page Description</dt>
              <dd className="w-full">
                <textarea
                  className="w-full border-1 border-neutral-300 rounded h-[74px] px-2"
                  value={basicInfo.description}
                  onChange={(e) => onInfoChange(e.target.value, "description")}
                />
              </dd>
            </dl>
          </div>
        </div>

        <div className="flex flex-col mb-5 border-b-1 py-5 border-neutral-300 border-dashed">
          <div className="mb-2 sectionTitle">
            <span>Select Page layout direction and number.</span>
          </div>
          <div className="flex items-center gap-3 px-2 mt-2">
            <RadioGroup
              style={{ minHeight: "34px", justifyContent: "center" }}
              className="mr-3"
              orientation="horizontal"
              value={basicLayout.step}
              onValueChange={(v: any) => onStepChange(v)}
            >
              <Radio value="1" className="mr-1">
                1 Section
              </Radio>
              <Radio value="2" className="mr-1">
                2 Section
              </Radio>
              <Radio value="3">3 Section</Radio>
            </RadioGroup>
            {Number(basicLayout.step) > 1 && (
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
                          className="mr-2"
                        ></FontAwesomeIcon>
                        {type}
                      </div>
                    }
                  />
                ))}
              </Tabs>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="mb-0 sectionTitle">
            <span>Select a tag to enter a section.</span>
          </div>
          <div className="flex flex-col gap-10">
            {sectionList.map((_, index) => (
              <TagStep key={index} itemKey={index} />
            ))}
          </div>
        </div>
        <div className="text-right border-b-1 py-5 px-3 border-neutral-300 border-dashed">
          <Button
            className="w-[200px] text-white mb-2 border-2 border-sky-800 rounded-md text-lg"
            style={{ background: "#2F88FF" }}
            onClick={onSetPrompt}
          >
            OK
          </Button>
        </div>
      </div>
    </>
  );
};

export default EzSelect;
