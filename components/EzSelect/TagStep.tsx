import { EzTagTypes, IFormOptions, IListOptions, ITableOptions } from "@/types";
import { Input, Tab, Tabs } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useAtom } from "jotai";
import {
  initFormValue,
  initListValue,
  initTableValue,
  sectionListAtom,
} from "@/store";
import TagStep_List from "./TagStep_List";
import TagStep_Table from "./TagStep_Table";
import TagStep_Form from "./TagStep_Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTableList, faListCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  itemKey: number;
}

const TagStep: React.FC<Props> = ({ itemKey }) => {
  const tagTypes: EzTagTypes[] = useMemo(() => Object.values(EzTagTypes), []);

  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const [tagType, setTagType] = useState<EzTagTypes>(EzTagTypes.LIST);

  const initListBox = useMemo(
    () => [initListValue, initTableValue, initFormValue],
    []
  );

  const onTagTypeChange = (e: any) => {
    setSectionList((preV) => {
      const newList = [...preV];
      const initValue = initListBox.find((v) => v.kind === e) || initListValue;
      newList[itemKey] = initValue;

      return newList;
    });

    setTagType(e);
  };

  const onTitleChange = (e: string) => {
    setSectionList((preV) => {
      const newList = [...preV];
      const newSection = {
        ...newList[itemKey],
        title: e,
      };
      newList[itemKey] = newSection;
      return newList;
    });
  };

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
            placeholder="Section Title"
          />
        </div>
        <div className="flex mt-3">
          <Tabs
            color="success"
            radius="sm"
            selectedKey={sectionList[itemKey].kind}
            onSelectionChange={onTagTypeChange}
            className="optTabs"
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
                          : faListCheck
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
        </div>
      </div>
    </>
  );
};

export default TagStep;
