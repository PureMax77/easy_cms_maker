import { Input, useDisclosure } from "@nextui-org/react";
import EzFormModal from "./EzFormModal";
import { IFormOptions } from "@/types";
import { SectionListType } from "@/store";

interface Props {
  itemKey: number;
  sectionData: IFormOptions;
  setSectionList: Function;
}

const TagStep_Form: React.FC<Props> = ({
  itemKey,
  sectionData,
  setSectionList,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onValueChange = (e: any) => {
    // item 변경 시 value check
    let itemNumber = Number(e);
    itemNumber = itemNumber < 1 ? 1 : Math.floor(itemNumber);

    setSectionList((preV: SectionListType) => {
      const newList = [...preV];
      const newSection = {
        ...newList[itemKey],
        items: itemNumber,
      };
      newList[itemKey] = newSection;
      return newList;
    });
  };

  return (
    <>
      <div className="flex items-center px-5">
        <Input
          className="mr-1 w-[50px]"
          type="number"
          size="sm"
          value={String(sectionData.items)}
          onValueChange={(e) => onValueChange(e)}
        />
        <span className="mr-3 ml-1">Item</span>
        <EzFormModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </>
  );
};

export default TagStep_Form;
