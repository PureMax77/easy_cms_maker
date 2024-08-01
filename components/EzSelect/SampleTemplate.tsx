import {
  basicInfoAtom,
  basicLayoutAtom,
  sectionListAtom,
  SectionListType,
  templateAddPromptAtom,
} from "@/store";
import {
  BasicDirectionTypes,
  EzListLayoutTypes,
  EzTagTypes,
  IBasicLayout,
  IListOptions,
  IPageBasicInfo,
  ITableOptions,
  TableColumnType,
} from "@/types";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSetAtom } from "jotai";
import Image from "next/image";
import { title } from "process";
import { useState } from "react";

const templateData1: IListOptions[] = [
  {
    kind: EzTagTypes.LIST,
    title: "",
    layout: EzListLayoutTypes.ARRANGEMENT,
    samples: 12,
    isIcon: false,
    isImage: true,
    isDragDrop: false,
  },
];

const templateData: ITableOptions[] = [
  {
    kind: EzTagTypes.TABLE,
    title: "사용자 목록",
    samples: 20,
    columns: 5,
    columnContents: [
      {
        title: "Index",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "닉네임",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "Email",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "성별",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "블랙리스트",
        tagType: TableColumnType.CHECKBOX,
        clickEvent: true,
      },
    ],
    isRowClick: false,
    isPagination: true,
    isDragDrop: false,
  },
];

// 상품리스트
const additionalPrompt1 = "* Each element includes title and description";

export default function SampleTemplate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState<number>(1);
  const setSectionList = useSetAtom(sectionListAtom);
  const setBasicLayout = useSetAtom(basicLayoutAtom);
  const setBasicInfo = useSetAtom(basicInfoAtom);
  const setAddPrompt = useSetAtom(templateAddPromptAtom);

  const basicInfoList: IPageBasicInfo[] = [
    {
      title: "상품",
      description: "WEB2X가 제공하는 블록체인 API 상품을 등록 & 관리합니다.",
    },
    {
      title: "사용자 관리",
      description: "서비스 사용자를 관리하는 페이지. 블랙리스트 추가 가능.",
    },
  ];

  const basicLayoutList: IBasicLayout[] = [
    {
      direction: BasicDirectionTypes.HORIZONTAL,
      step: "1",
    },
    {
      direction: BasicDirectionTypes.HORIZONTAL,
      step: "1",
    },
  ];
  const templateDataList: SectionListType[] = [templateData1, templateData];
  const additionalPromptList: any[] = [additionalPrompt1, ""];

  const handleOpen = (key: number) => {
    setType(key);
    onOpen();
  };

  const onAction = () => {
    setBasicInfo(basicInfoList[type - 1]);
    setBasicLayout(basicLayoutList[type - 1]);
    setSectionList(templateDataList[type - 1]);
    setAddPrompt(additionalPromptList[type - 1]);
    onClose();
  };

  return (
    <>
      <div className="flex flex-col gap-3 mt-5 border-b-1 py-5 border-neutral-300 border-dashed">
        <div className="mb-2 sectionTitle">
          <span>Sample Template lists.</span>
        </div>
        <div className="flex gap-5">
          <Button onPress={() => handleOpen(1)}>Template1</Button>
          <Button onPress={() => handleOpen(2)}>Template2</Button>
          <Button onPress={() => handleOpen(3)}>Template3</Button>
        </div>
      </div>
      <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Template{type}
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex justify-center">
                  <Image
                    src={"/template1.png"}
                    alt="template1"
                    width={500}
                    height={500}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onAction}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
