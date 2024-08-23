import { SectionListType } from "@/store";
import { EzListLayoutTypes, IListOptions } from "@/types";
import { Checkbox, Input, Tab, Tabs } from "@nextui-org/react";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faGripVertical,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  itemKey: number;
  sectionData: IListOptions;
  setSectionList: Function;
}

type ChangeType = "layout" | "sample" | "icon" | "image" | "drag";

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
    // fail check
    if (type === "sample" && (!e || e === "0")) return;

    // column, sample 변경 시 value check
    let sampleNumber = Number(e);
    if (type === "sample") {
      sampleNumber = sampleNumber < 1 ? 1 : Math.floor(sampleNumber);
    }

    setSectionList((preV: SectionListType) => {
      const newList = JSON.parse(JSON.stringify(preV));
      const newSection = {
        ...newList[itemKey],
        ...(type === "layout" && { layout: e }),
        ...(type === "sample" && { samples: sampleNumber }),
        ...(type === "icon" && { isIcon: e }),
        ...(type === "image" && { isImage: e }),
        ...(type === "drag" && { isDragDrop: e }),
      };
      newList[itemKey] = newSection;
      return newList;
    });
  };

  return (
    <div className="flex">
      <div className="flex pr-4 border-r-1">
        <Tabs
          color="success"
          radius="sm"
          selectedKey={sectionData.layout}
          onSelectionChange={(e) => onValueChange(e, "layout")}
          className="optTabs"
        >
          {listLayoutTypes.map((type) => (
            <Tab
              key={type}
              title={
                <div>
                  <FontAwesomeIcon
                    icon={
                      type == "Horizontal"
                        ? faGripHorizontal
                        : type == "Vertical"
                        ? faGripVertical
                        : faTableCells
                    }
                    className="mr-2"
                  ></FontAwesomeIcon>
                  {type}
                </div>
              }
            />
          ))}
        </Tabs>
      </div>
      <div className="flex items-center px-4 border-r-1">
        <Input
          className="mr-1 w-[50px]"
          key={itemKey}
          type="number"
          size="sm"
          value={String(sectionData.samples)}
          onValueChange={(e) => onValueChange(e, "sample")}
        />
        <span className="ml-1">Samples</span>
      </div>
      <div className="flex items-center px-4 gap-5">
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
    </div>
  );
};

export default TagStep_List;
