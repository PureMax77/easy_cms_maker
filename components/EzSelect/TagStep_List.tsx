import { SectionListType } from "@/store";
import { EzListLayoutTypes, IListOptions } from "@/types";
import { Checkbox, Radio, RadioGroup, checkbox } from "@nextui-org/react";
import { useMemo } from "react";

interface Props {
  itemKey: number;
  sectionData: IListOptions;
  setSectionList: Function;
}

type ChangeType = "layout" | "icon" | "image" | "drag";

const TagStep_List: React.FC<Props> = ({
  itemKey,
  sectionData,
  setSectionList,
}) => {
  const listLayoutTypes: EzListLayoutTypes[] = useMemo(
    () => Object.values(EzListLayoutTypes),
    []
  );

  const onValueChange = (e: any, type: ChangeType) => {
    setSectionList((preV: SectionListType) => {
      const newList = [...preV];
      const newSection = {
        ...newList[itemKey],
        ...(type === "layout" && { layout: e }),
        ...(type === "icon" && { isIcon: e }),
        ...(type === "image" && { isImage: e }),
        ...(type === "drag" && { isDragDrop: e }),
      };
      newList[itemKey] = newSection;
      return newList;
    });
  };

  return (
    <>
      <div className="flex px-5 border-r-1">
        <RadioGroup
          className="justify-center"
          orientation="horizontal"
          value={sectionData.layout}
          onValueChange={(e) => onValueChange(e, "layout")}
        >
          {listLayoutTypes.map((type, index) => (
            <Radio key={index} value={type}>
              {type}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      <div className="flex items-center px-5 gap-3">
        <Checkbox
          isSelected={sectionData.isIcon}
          onValueChange={(e) => onValueChange(e, "icon")}
        >
          Icon
        </Checkbox>
        <Checkbox
          isSelected={sectionData.isImage}
          onValueChange={(e) => onValueChange(e, "image")}
        >
          Image
        </Checkbox>
        <Checkbox
          isSelected={sectionData.isDragDrop}
          onValueChange={(e) => onValueChange(e, "drag")}
        >
          Drag & Drop
        </Checkbox>
      </div>
    </>
  );
};

export default TagStep_List;
