import { Input, useDisclosure } from "@nextui-org/react";
import EzFormModal from "./EzFormModal";
import { IFormContent, IFormOptions } from "@/types";
import { SectionListType, initItemContent } from "@/store";

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

  const getNewItemContents = (
    preSection: IFormOptions,
    nowNumber: number // 현재 입력된 숫자
  ): IFormContent[] | null => {
    const preNumber = preSection.items; // 이전 숫자
    const newContents = JSON.parse(JSON.stringify(preSection.itemsContents));

    if (preNumber > nowNumber) {
      newContents.splice(nowNumber);
    } else if (preNumber < nowNumber) {
      const addInitContents = new Array(nowNumber - preNumber).fill(
        initItemContent
      );
      newContents.push(...addInitContents);
    } else {
      return null;
    }

    return newContents;
  };

  const onValueChange = (e: any) => {
    // fail check
    if (!e || e === "0") return;

    // item 변경 시 value check
    let itemNumber = Number(e);
    itemNumber = itemNumber < 1 ? 1 : Math.floor(itemNumber);

    setSectionList((preV: SectionListType) => {
      let newList = JSON.parse(JSON.stringify(preV));

      const itemsContents = getNewItemContents(
        preV[itemKey] as IFormOptions,
        itemNumber
      );

      const newSection = {
        ...newList[itemKey],
        items: itemNumber,
        itemsContents,
      };

      newList[itemKey] = newSection;

      return newList;
    });
  };

  return (
    <>
      <div className="flex items-center px-8">
        <Input
          className="mr-1 w-[50px]"
          type="number"
          size="sm"
          value={String(sectionData.items)}
          onValueChange={(e) => onValueChange(e)}
        />
        <span className="mr-3 ml-1">Input Forms</span>
        <EzFormModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          itemKey={itemKey}
        />
      </div>
    </>
  );
};

export default TagStep_Form;
