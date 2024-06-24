import { SectionListType } from "@/store";
import { EzListLayoutTypes, IListOptions } from "@/types";
import { Checkbox, Tab, Tabs } from "@nextui-org/react";
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
      const newList = JSON.parse(JSON.stringify(preV));
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
      <div className="flex px-8 border-r-1">
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
      <div className="flex items-center px-8 gap-5">
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
