import { Checkbox, Input, useDisclosure } from "@nextui-org/react";
import EzTableModal from "./EzTableModal";
import { ITableOptions } from "@/types";
import { SectionListType } from "@/store";

interface Props {
  itemKey: number;
  sectionData: ITableOptions;
  setSectionList: Function;
}

type ChangeType = "column" | "row_click" | "pagination" | "drag";

const TagStep_Table: React.FC<Props> = ({
  itemKey,
  sectionData,
  setSectionList,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onValueChange = (e: any, type: ChangeType) => {
    // column 변경 시 value check
    let columnNumber = Number(e);
    if (type === "column") {
      columnNumber = columnNumber < 1 ? 1 : Math.floor(columnNumber);
    }

    setSectionList((preV: SectionListType) => {
      const newList = [...preV];
      const newSection = {
        ...newList[itemKey],
        ...(type === "column" && { columns: columnNumber }),
        ...(type === "row_click" && { isRowClick: e }),
        ...(type === "pagination" && { isPagination: e }),
        ...(type === "drag" && { isDragDrop: e }),
      };
      newList[itemKey] = newSection;
      return newList;
    });
  };

  return (
    <>
      <div className="flex items-center px-8 border-r-1">
        <Input
          className="mr-1 w-[50px]"
          type="number"
          size="sm"
          value={String(sectionData.columns)}
          onValueChange={(e) => onValueChange(e, "column")}
        />
        <span className="mr-3 ml-1">Column</span>
        <EzTableModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </div>
      <div className="flex items-center px-8 gap-5">
        <Checkbox
          isSelected={sectionData.isRowClick}
          onValueChange={(e) => onValueChange(e, "row_click")}
        >
          Row Click Event
        </Checkbox>
        <Checkbox
          isSelected={sectionData.isPagination}
          onValueChange={(e) => onValueChange(e, "pagination")}
        >
          Pagination
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

export default TagStep_Table;
