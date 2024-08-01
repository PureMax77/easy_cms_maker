import { Checkbox, Input, useDisclosure } from "@nextui-org/react";
import EzTableModal from "./EzTableModal";
import { IColumnContent, ITableOptions } from "@/types";
import { SectionListType, initColumnContent, sectionListAtom } from "@/store";
import { useAtom } from "jotai";

interface Props {
  itemKey: number;
  sectionData: ITableOptions;
  setSectionList: Function;
}

type ChangeType = "sample" | "column" | "row_click" | "pagination" | "drag";

const TagStep_Table: React.FC<Props> = ({
  itemKey,
  // sectionData,
  // setSectionList,
}) => {
  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const sectionData = sectionList[itemKey] as ITableOptions;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getNewColumnContents = (
    preSection: ITableOptions,
    nowNumber: number, // 현재 입력된 숫자
    type: ChangeType
  ): IColumnContent[] | null => {
    if (type !== "column") return null;

    const preNumber = preSection.columns; // 이전 숫자
    const newContents = JSON.parse(JSON.stringify(preSection.columnContents));

    if (preNumber > nowNumber) {
      newContents.splice(nowNumber);
    } else if (preNumber < nowNumber) {
      const addInitContents = new Array(nowNumber - preNumber).fill(
        initColumnContent
      );
      newContents.push(...addInitContents);
    } else {
      // column말고 다른 데이터 바뀔때 필요
      return null;
    }

    return newContents;
  };

  const onValueChange = (e: any, type: ChangeType) => {
    // fail check
    if ((type === "column" || type === "sample") && (!e || e === "0")) return;

    // column, sample 변경 시 value check
    let columnNumber = Number(e);
    let sampleNumber = Number(e);
    if (type === "column") {
      columnNumber = columnNumber < 1 ? 1 : Math.floor(columnNumber);
    } else if (type === "sample") {
      sampleNumber = sampleNumber < 1 ? 1 : Math.floor(sampleNumber);
    }

    setSectionList((preV: SectionListType) => {
      let newList = JSON.parse(JSON.stringify(preV));

      const columnContents = getNewColumnContents(
        preV[itemKey] as ITableOptions,
        columnNumber,
        type
      );

      const newSection = {
        ...newList[itemKey],
        ...(type === "sample" && { samples: sampleNumber }),
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
      <div className="flex items-center px-4 border-r-1 border-l-1">
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
      <div className="flex items-center px-4 border-r-1">
        <Input
          className="mr-1 w-[50px]"
          key={itemKey}
          type="number"
          size="sm"
          value={String(sectionData.columns)}
          onValueChange={(e) => onValueChange(e, "column")}
        />
        <span className="mr-3 ml-1">Columns</span>
        <EzTableModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          itemKey={itemKey}
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
