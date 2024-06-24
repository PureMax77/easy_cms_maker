import { BasicDirectionTypes, EzTagTypes, IBasicLayout } from "@/types";
import { Button, Tab, Tabs, RadioGroup, Radio } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import TagStep from "./TagStep";
import { useAtom, useSetAtom } from "jotai";
import {
  basicInfoAtom,
  basicLayoutAtom,
  initListValue,
  promptAtom,
  sectionListAtom,
} from "@/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

type ChangeType = "title" | "description";

const EzSelect: React.FC = () => {
  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const [basicLayout, setBasicLayout] = useAtom(basicLayoutAtom);
  const [basicInfo, setBasicInfo] = useAtom(basicInfoAtom);
  const setPromptContent = useSetAtom(promptAtom);

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
          const name = `- section${index + 1}\n\t`;
          const title = section.title ? `* title : ${section.title}\n\t` : "";
          const type = `* type : ${section.layout} ${EzTagTypes.LIST}\n\t`;
          const icon = section.isIcon
            ? "* The icon is included in the list tag\n\t"
            : "";
          const image = section.isImage
            ? "* The image is included in the list tag\n\t"
            : "";
          const dragDrop = section.isDragDrop
            ? "* The order of the list can be modified by dragging and dropping.\n\t"
            : "";

          return name + title + type + icon + image + dragDrop;
        } else if (section.kind === EzTagTypes.TABLE) {
          // Table section
          const name = `- section${index + 1}\n\t`;
          const title = section.title ? `* title : ${section.title}\n\t` : "";
          const type = `* type : ${EzTagTypes.TABLE} with ${section.columns} columns\n\t\t`;

          const columns = section.columnContents
            .map((content, index, array) => {
              const isLast = array.length - 1 === index;

              const cTitle = `${index + 1}. Column${index + 1} has the title '${
                content.title
              }'. `;
              const cTag = `Column${index + 1} consists of ${
                content.tagType
              } tag. `;
              const cClick = content.clickEvent
                ? `Column${index + 1} contains a click event.`
                : "";
              const suffix = isLast ? "\n\t" : "\n\t\t";
              return cTitle + cTag + cClick + suffix;
            })
            .join("");

          const rowClick = section.isRowClick
            ? "* Put a row-click event on the table tag.\n\t"
            : "";
          const pagination = section.isRowClick
            ? "* Put a pagination function on the table tag.\n\t"
            : "";
          const dragDrop = section.isDragDrop
            ? "* The row order of the column can be modified by dragging and dropping.\n\t"
            : "";

          return (
            name + title + type + columns + rowClick + pagination + dragDrop
          );
        } else if (section.kind === EzTagTypes.FORM) {
          // Form section
          const name = `- section${index + 1}\n\t`;
          const title = section.title ? `* title : ${section.title}\n\t` : "";
          const type = `* type : ${EzTagTypes.FORM} with ${section.items} items\n\t\t`;

          const items = section.itemsContents
            .map((content, index, array) => {
              const isLast = array.length - 1 === index;

              const label = `${index + 1}. Item${index + 1} has the label '${
                content.label
              }'. `;
              const iTag = `Item${index + 1} consists of ${
                content.tagType
              } tag. `;
              const iRequired = content.required
                ? `Item${index + 1} is required.`
                : `Item${index + 1} isn't required.`;
              const suffix = isLast ? "\n\t" : "\n\t\t";
              return label + iTag + iRequired + suffix;
            })
            .join("");

          return name + title + type + items;
        }
      })
      .join("\n");

    setPromptContent(titleInfo + descInfo + layoutInfo + sectionInfo);
  };

  return (
    <>
      <div className="flex flex-col max-w-[1200px] justify-center w-full">
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
                  className="w-full border-1 border-neutral-300 rounded h-[36px]"
                  // value={}
                  onChange={(e) => onInfoChange(e.target.value, "title")}
                />
              </dd>
            </dl>
            <dl className="flex flex-row w-full gap-3 mt-2">
              <dt className="w-[275px] font-medium">Page Description</dt>
              <dd className="w-full">
                <textarea
                  className="w-full border-1 border-neutral-300 rounded h-[74px]"
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
              className="mr-3 h-9"
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
          {sectionList.map((_, index) => (
            <TagStep key={index} itemKey={index} />
          ))}
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
