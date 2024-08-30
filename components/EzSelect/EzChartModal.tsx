import { SectionListType, sectionListAtom } from "@/store";
import {
  ChartType,
  FormItemType,
  IChartOptions,
  IDatasetContent,
} from "@/types";
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
  useDisclosure,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import ColorModal from "./ColorModal";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  itemKey: number;
}

type ChangeColorType = "backgroundColor" | "borderColor";

const EzChartModal: React.FC<Props> = ({
  isOpen,
  onOpen,
  onOpenChange,
  itemKey,
}) => {
  // color 선택 모달용
  const {
    isOpen: isOpenC,
    onOpen: onOpenC,
    onOpenChange: onOpenChangeC,
  } = useDisclosure();

  const [nowCIndex, setNowCIndex] = useState<number>(0);
  const [nowColorType, setNowColorType] =
    useState<ChangeColorType>("backgroundColor");
  const [sectionList, setSectionList] = useAtom(sectionListAtom);
  const nowSection = sectionList[itemKey] as IChartOptions;
  const datasetContents = nowSection.datasetContents;

  const onValueChange = (e: any, type: any, index: number) => {
    setSectionList((preV: SectionListType) => {
      const newList = JSON.parse(JSON.stringify(preV));

      let newSection = newList[itemKey] as IChartOptions;
      const newDatasetContent: IDatasetContent = {
        ...newSection.datasetContents[index],
        ...(type === "color" &&
          nowColorType === "backgroundColor" && { backgroundColor: e }),
        ...(type === "color" &&
          nowColorType === "borderColor" && { borderColor: e }),
        ...(type === "label" && { label: e }),
      };
      const newDatasetContents = newSection.datasetContents;
      newDatasetContents[index] = newDatasetContent;
      newSection.datasetContents = newDatasetContents;

      newList[itemKey] = newSection;
      return newList;
    });
  };

  if (!datasetContents) {
    return <></>;
  } else {
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
                  Dataset List
                </ModalHeader>
                <ModalBody className="px-6 mt-3">
                  <ul className="modal-form">
                    {datasetContents.map((content, index) => (
                      <li
                        key={index}
                        className="flex items-center text-nowrap gap-3 mb-3"
                      >
                        <span className="title">dataset {index + 1}</span>
                        <Input
                          placeholder="Label"
                          className="w-full border-1 border-neutral-300 rounded-md h-[48px] input"
                          value={content.label}
                          onChange={(e) =>
                            onValueChange(e.target.value, "label", index)
                          }
                        />
                        {nowSection.chartType !== ChartType.DOUGHNUT && (
                          <>
                            <Button
                              onPress={() => {
                                setNowCIndex(index);
                                setNowColorType("backgroundColor");
                                onOpenC();
                              }}
                              size="sm"
                              className="bg-gray-200 min-w-48 h-[48px] text-medium"
                            >
                              Background:{" "}
                              <span
                                style={{
                                  color: datasetContents[index].backgroundColor,
                                }}
                              >
                                {datasetContents[index].backgroundColor}
                              </span>
                            </Button>
                            <Button
                              onPress={() => {
                                setNowCIndex(index);
                                setNowColorType("borderColor");
                                onOpenC();
                              }}
                              size="sm"
                              className="bg-gray-200 min-w-40 h-[48px] text-medium"
                            >
                              Border:{" "}
                              <span
                                style={{
                                  color: datasetContents[index].borderColor,
                                }}
                              >
                                {datasetContents[index].borderColor}
                              </span>
                            </Button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </ModalBody>
                <ModalFooter>
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

        <ColorModal
          isOpen={isOpenC}
          onOpen={onOpenC}
          onOpenChange={onOpenChangeC}
          color={datasetContents[nowCIndex][nowColorType]}
          onColorChange={(color) =>
            onValueChange(color.hex, "color", nowCIndex)
          }
        />
      </>
    );
  }
};

export default EzChartModal;
