import { EzListLayoutTypes, EzTagTypes } from "@/types";
import {
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import EzTableModal from "./EzTableModal";

interface Props {
  itemKey: number;
}

const TagStep: React.FC<Props> = ({ itemKey }) => {
  const tagTypes: EzTagTypes[] = useMemo(() => Object.values(EzTagTypes), []);
  const listLayoutTypes: EzListLayoutTypes[] = useMemo(
    () => Object.values(EzListLayoutTypes),
    []
  );

  const [tagType, setTagType] = useState<EzTagTypes>(EzTagTypes.LIST);
  const {
    isOpen: table_isOpen,
    onOpen: table_onOpen,
    onOpenChange: table_onOpenChange,
  } = useDisclosure();

  return (
    <div className="flex">
      <div className="px-5 border-r-1">
        <span className="mr-3">{itemKey + 1} Step</span>
        <Tabs
          color="default"
          radius="sm"
          onSelectionChange={(e: any) => setTagType(e)}
        >
          {tagTypes.map((type) => (
            <Tab key={type} title={type} />
          ))}
        </Tabs>
      </div>
      {tagType === EzTagTypes.LIST && (
        <>
          <div className="flex px-5 border-r-1">
            <RadioGroup className="justify-center" orientation="horizontal">
              {listLayoutTypes.map((type, index) => (
                <Radio key={index} value={type}>
                  {type}
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <div className="flex items-center px-5 gap-3">
            <Checkbox>Icon</Checkbox>
            <Checkbox>Image</Checkbox>
            <Checkbox>Drag & Drop</Checkbox>
          </div>
        </>
      )}
      {tagType === EzTagTypes.TABLE && (
        <>
          <div className="flex items-center px-5 border-r-1">
            <Input className="mr-1" type="number" />
            <span className="mr-3">Column</span>
            <EzTableModal
              isOpen={table_isOpen}
              onOpen={table_onOpen}
              onOpenChange={table_onOpenChange}
            />
          </div>
          <div className="flex items-center px-5 gap-3">
            <Checkbox>Row Click Event</Checkbox>
            <Checkbox>Pagination</Checkbox>
            <Checkbox>Drag & Drop</Checkbox>
          </div>
        </>
      )}
      {tagType === EzTagTypes.FORM && (
        <>
          <div className="flex items-center px-5">
            <Input className="mr-1" type="number" />
            <span className="mr-3">Item</span>
            <EzTableModal
              isOpen={table_isOpen}
              onOpen={table_onOpen}
              onOpenChange={table_onOpenChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TagStep;
