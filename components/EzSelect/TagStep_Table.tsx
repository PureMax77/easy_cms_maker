import { Checkbox, Input, useDisclosure } from "@nextui-org/react";
import EzTableModal from "./EzTableModal";
import { IColumnContent, ITableOptions } from "@/types";
import { SectionListType, initColumnContent } from "@/store";

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

  const getNewColumnContents = (
    preSection: ITableOptions,
    nowNumber: number, // 현재 입력된 숫자
    type: ChangeType
  ): IColumnContent[] | null => {
    if (type !== "column") return null;

    const preNumber = preSection.columns; // 이전 숫자
    const newContents = preSection.columnContents;

    if (preNumber > nowNumber) {
      newContents.splice(nowNumber);
    } else if (preNumber < nowNumber) {
      newContents.push(initColumnContent);
    } else {
      return null;
    }

    return newContents;
  };

  const onValueChange = (e: any, type: ChangeType) => {
    // column 변경 시 value check
    let columnNumber = Number(e);
    if (type === "column") {
      columnNumber = columnNumber < 1 ? 1 : Math.floor(columnNumber);
    }

    setSectionList((preV: SectionListType) => {
      const newList = [...preV];
      const columnContents = getNewColumnContents(
        preV[itemKey] as ITableOptions,
        columnNumber,
        type
      );

      const newSection = {
        ...newList[itemKey],
        ...(type === "column" && { columns: columnNumber }),
        ...(type === "column" && columnContents && { columnContents }),
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
      <div className="flex items-center px-5 border-r-1">
        <Input
          className="mr-1"
          type="number"
          value={String(sectionData.columns)}
          onValueChange={(e) => onValueChange(e, "column")}
        />
        <span className="mr-3">Column</span>
        <EzTableModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          itemKey={itemKey}
        />
      </div>
      <div className="flex items-center px-5 gap-3">
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
