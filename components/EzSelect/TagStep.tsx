import {
  EzTagTypes,
  IChartOptions,
  IFormOptions,
  IListOptions,
  ITableOptions,
} from "@/types";
import { Input, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import {
  initChartValue,
  initFormValue,
  initListValue,
  initTableValue,
  sectionListAtom,
} from "@/store";
import TagStep_List from "./TagStep_List";
import TagStep_Table from "./TagStep_Table";
import TagStep_Form from "./TagStep_Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTableList,
  faListCheck,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import TagStep_Chart from "./TagStep_Chart";

interface Props {
  itemKey: number;
}

const TagStep: React.FC<Props> = ({ itemKey }) => {
  const tagTypes: EzTagTypes[] = useMemo(() => Object.values(EzTagTypes), []);

  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const [tagType, setTagType] = useState<EzTagTypes>(EzTagTypes.LIST);

  const initListBox = useMemo(
    () => [initListValue, initTableValue, initFormValue, initChartValue],
    []
  );

  const onTagTypeChange = (e: any) => {
    setSectionList((preV) => {
      const newList = JSON.parse(JSON.stringify(preV));
      const initValue = initListBox.find((v) => v.kind === e) || initListValue;
      newList[itemKey] = initValue;

      return newList;
    });

    setTagType(e);
  };

  const onTitleChange = (e: any) => {
    setSectionList((preV) => {
      const newList = JSON.parse(JSON.stringify(preV));
      const newSection = {
        ...newList[itemKey],
        title: e.target.value,
      };

      newList[itemKey] = newSection;
      return newList;
    });
  };

  useEffect(() => {
    if (sectionList[itemKey].kind !== tagType) {
      setTagType(sectionList[itemKey].kind);
    }
  }, [sectionList]);

  return (
    <>
      <div className="px-3">
        <div className="flex justify-center items-center">
          <span className="mr-3 w-[275px] font-medium subTitle">
            {itemKey + 1} Section Information
          </span>
          <input
            type="text"
            className="w-full border-1 border-neutral-300 rounded h-[36px] px-2"
            placeholder={
              tagType === EzTagTypes.CHART ? "Chart Title" : "Section Title"
            }
            value={sectionList[itemKey].title}
            onChange={onTitleChange}
          />
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <Tabs
            color="success"
            radius="sm"
            selectedKey={sectionList[itemKey].kind}
            onSelectionChange={onTagTypeChange}
            className="optTabs mr-4"
          >
            {tagTypes.map((type) => (
              <Tab
                key={type}
                title={
                  <div>
                    <FontAwesomeIcon
                      icon={
                        type == "List"
                          ? faBars
                          : type == "Table"
                          ? faTableList
                          : type == "Form"
                          ? faListCheck
                          : faChartPie
                      }
                      className="mr-2"
                    ></FontAwesomeIcon>
                    {type}
                  </div>
                }
              />
            ))}
          </Tabs>
          {tagType === EzTagTypes.LIST && (
            <TagStep_List
              sectionData={sectionList[itemKey] as IListOptions}
              setSectionList={setSectionList}
              itemKey={itemKey}
            />
          )}
          {tagType === EzTagTypes.TABLE && (
            <TagStep_Table
              sectionData={sectionList[itemKey] as ITableOptions}
              setSectionList={setSectionList}
              itemKey={itemKey}
            />
          )}
          {tagType === EzTagTypes.FORM && (
            <TagStep_Form
              sectionData={sectionList[itemKey] as IFormOptions}
              setSectionList={setSectionList}
              itemKey={itemKey}
            />
          )}
          {tagType === EzTagTypes.CHART && (
            <TagStep_Chart
              sectionData={sectionList[itemKey] as IChartOptions}
              setSectionList={setSectionList}
              itemKey={itemKey}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TagStep;
