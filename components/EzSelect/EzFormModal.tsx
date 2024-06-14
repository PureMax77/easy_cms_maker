import { SectionListType, sectionListAtom } from "@/store";
import { FormItemType, IFormOptions } from "@/types";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { useMemo } from "react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  itemKey: number;
}

type ChangeType = "label" | "tag" | "required";

const EzFormModal: React.FC<Props> = ({
  isOpen,
  onOpen,
  onOpenChange,
  itemKey,
}) => {
  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const nowSection = sectionList[itemKey] as IFormOptions;
  const itemContents = nowSection.itemsContents;
  const tableColumnType: FormItemType[] = useMemo(
    () => Object.values(FormItemType),
    []
  );

  const onValueChange = (e: any, type: ChangeType, index: number) => {
    setSectionList((preV: SectionListType) => {
      const newList = JSON.parse(JSON.stringify(preV));
      // const columnContents = getNewColumnContents(
      //   preV[itemKey] as ITableOptions,
      //   columnNumber,
      //   type
      // );

      let newSection = newList[itemKey] as IFormOptions;
      const newColumnContent = {
        ...newSection.itemsContents[index],
        ...(type === "label" && { label: e }),
        ...(type === "tag" && { tagType: e }),
        ...(type === "required" && { required: e }),
      };
      const newColumnContents = newSection.itemsContents;
      newColumnContents[index] = newColumnContent;
      newSection.itemsContents = newColumnContents;

      newList[itemKey] = newSection;
      return newList;
    });
  };

  return (
    <>
      <Button onPress={onOpen}>Setting</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Form Item
              </ModalHeader>
              <ModalBody className="px-6">
                <ul>
                  {itemContents.map((content, index) => (
                    <li
                      key={index}
                      className="flex items-center text-nowrap gap-3 mb-3"
                    >
                      <span>- {index + 1} Item</span>
                      <Input
                        placeholder="Label"
                        value={content.label}
                        onChange={(e) =>
                          onValueChange(e.target.value, "label", index)
                        }
                      />
                      <Select
                        label="Select Tag Type"
                        size="sm"
                        selectedKeys={[content.tagType]}
                        onChange={(e) =>
                          onValueChange(e.target.value, "tag", index)
                        }
                      >
                        {tableColumnType.map((type) => (
                          <SelectItem key={type}>{type}</SelectItem>
                        ))}
                      </Select>
                      <Checkbox
                        isSelected={content.required}
                        onValueChange={(e) =>
                          onValueChange(e, "required", index)
                        }
                      >
                        Required
                      </Checkbox>
                    </li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="primary" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EzFormModal;
