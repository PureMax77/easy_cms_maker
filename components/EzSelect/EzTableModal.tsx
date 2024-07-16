import { SectionListType, sectionListAtom } from "@/store";
import { ITableOptions, TableColumnType } from "@/types";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { useMemo } from "react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  itemKey: number;
}

type ChangeType = "title" | "tag" | "click";

const EzTableModal: React.FC<Props> = ({
  isOpen,
  onOpen,
  onOpenChange,
  itemKey,
}) => {
  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const nowSection = sectionList[itemKey] as ITableOptions;
  const columnContents = nowSection.columnContents;
  const tableColumnType: TableColumnType[] = useMemo(
    () => Object.values(TableColumnType),
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

      let newSection = newList[itemKey] as ITableOptions;
      const newColumnContent = {
        ...newSection.columnContents[index],
        ...(type === "title" && { title: e }),
        ...(type === "tag" && { tagType: e }),
        ...(type === "click" && { clickEvent: e }),
      };
      const newColumnContents = newSection.columnContents;
      newColumnContents[index] = newColumnContent;
      newSection.columnContents = newColumnContents;

      newList[itemKey] = newSection;
      return newList;
    });
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly size="sm" className="bg-gray-200">
        <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-y-1">
                Table Column
              </ModalHeader>
              <ModalBody className="px-6 mt-3">
                <ul className="modal-form">
                  {columnContents.map((content, index) => (
                    <li
                      key={index}
                      className="flex items-center text-nowrap gap-3 mb-3"
                    >
                      <span className="title">{index + 1} Column</span>
                      <Input
                        placeholder="Column Title"
                        className="w-full border-1 border-neutral-300 rounded-md h-[48px] input"
                        value={content.title}
                        onChange={(e) =>
                          onValueChange(e.target.value, "title", index)
                        }
                      />
                      <Select
                        label="Select Tag Type"
                        className="rounded w-[400px]"
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
                        isSelected={content.clickEvent}
                        onValueChange={(e) => onValueChange(e, "click", index)}
                      >
                        Click Event
                      </Checkbox>
                    </li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button
                  className="w-[120px] text-white mb-2 border-2 border-sky-800 rounded-md text-lg"
                  style={{ background: "#2F88FF" }}
                  onPress={onClose}
                >
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

export default EzTableModal;
