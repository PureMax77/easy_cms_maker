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
    <div className="flex flex-col mb-5">
      <div className="flex items-center mb-3">
        <span className="mr-8">{itemKey + 1} Section Information</span>
        <Input
          className="w-64"
          placeholder="Section Title"
          value={sectionList[itemKey].title}
          onValueChange={onTitleChange}
        />
      </div>
      <div className="flex">
        <div className="pr-5 border-r-1">
          <Tabs
            color="default"
            radius="sm"
            selectedKey={sectionList[itemKey].kind}
            onSelectionChange={onTagTypeChange}
          >
            {tagTypes.map((type) => (
              <Tab key={type} title={type} />
            ))}
          </Tabs>
        </div>
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
  );
};

export default TagStep;
