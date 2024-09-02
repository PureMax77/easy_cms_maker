import {
  basicInfoAtom,
  basicLayoutAtom,
  chartAddPromptAtom,
  sectionListAtom,
  SectionListType,
  templateAddPromptAtom,
} from "@/store";
import {
  BasicDirectionTypes,
  ChartType,
  EzListLayoutTypes,
  EzTagTypes,
  FormItemType,
  IBasicLayout,
  IChartOptions,
  IFormOptions,
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

const templateData2: IFormOptions[] = [
  {
    kind: EzTagTypes.FORM,
    title: "",
    items: 7,
    itemsContents: [
      {
        label: "상품 대표 이미지",
        tagType: FormItemType.IMAGE,
        required: true,
      },
      {
        label: "상품명",
        tagType: FormItemType.INPUT,
        required: true,
      },
      {
        label: "상품 설명",
        tagType: FormItemType.INPUT,
        required: true,
      },
      {
        label: "API 제공 기능 - 발행",
        tagType: FormItemType.INPUT,
        required: true,
      },
      {
        label: "API 제공 기능 - 양도",
        tagType: FormItemType.INPUT,
        required: true,
      },
      {
        label: "API 제공 기능 - 소멸",
        tagType: FormItemType.INPUT,
        required: true,
      },
      {
        label: "API 제공 기능 - 정보 조회",
        tagType: FormItemType.INPUT,
        required: true,
      },
    ],
  },
];

const templateData3: ITableOptions[] = [
  {
    kind: EzTagTypes.TABLE,
    title: "",
    samples: 20,
    columns: 3,
    isRowClick: false,
    isPagination: true,
    isDragDrop: false,
    columnContents: [
      {
        title: "구분",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "제목",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "Date",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
    ],
  },
];

const templateData4: (ITableOptions | IFormOptions)[] = [
  {
    kind: EzTagTypes.TABLE,
    title: "",
    samples: 20,
    columns: 3,
    isRowClick: false,
    isPagination: true,
    isDragDrop: false,
    columnContents: [
      {
        title: "신청자",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "Status",
        tagType: TableColumnType.CHECKBOX,
        clickEvent: false,
      },
      {
        title: "Date",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
    ],
  },
  {
    kind: EzTagTypes.FORM,
    title: "",
    items: 3,
    itemsContents: [
      {
        label: "신청자",
        tagType: FormItemType.INPUT,
        required: true,
      },
      {
        label: "신청 사유",
        tagType: FormItemType.TEXT,
        required: true,
      },
      {
        label: "Status",
        tagType: FormItemType.RADIO,
        required: true,
      },
    ],
  },
];

const templateData5: (IChartOptions | ITableOptions)[] = [
  {
    kind: EzTagTypes.CHART,
    title: "API 호출 건수",
    chartType: ChartType.LINE,
    datasets: 1,
    xTitle: "건수",
    yTitle: "시간",
    datasetContents: [
      {
        label: "",
        backgroundColor: "#1200FF",
        borderColor: "#1200FF",
      },
    ],
  },
  {
    kind: EzTagTypes.CHART,
    title: "API 호출 상태별 응답 건수",
    chartType: ChartType.DOUGHNUT,
    datasets: 1,
    xTitle: "",
    yTitle: "",
    datasetContents: [],
  },
  {
    kind: EzTagTypes.TABLE,
    title: "Request List",
    samples: 12,
    columns: 6,
    isRowClick: false,
    isPagination: false,
    isDragDrop: false,
    columnContents: [
      {
        title: "Request Number",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "Source Txn Hash",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "From(Sender)",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "Destination Txn Hash",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "To(Receiver)",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
      {
        title: "Age",
        tagType: TableColumnType.TEXT,
        clickEvent: false,
      },
    ],
  },
];

// const templateData: ITableOptions[] = [
//   {
//     kind: EzTagTypes.TABLE,
//     title: "사용자 목록",
//     samples: 20,
//     columns: 5,
//     columnContents: [
//       {
//         title: "Index",
//         tagType: TableColumnType.TEXT,
//         clickEvent: false,
//       },
//       {
//         title: "닉네임",
//         tagType: TableColumnType.TEXT,
//         clickEvent: false,
//       },
//       {
//         title: "Email",
//         tagType: TableColumnType.TEXT,
//         clickEvent: false,
//       },
//       {
//         title: "성별",
//         tagType: TableColumnType.TEXT,
//         clickEvent: false,
//       },
//       {
//         title: "블랙리스트",
//         tagType: TableColumnType.CHECKBOX,
//         clickEvent: true,
//       },
//     ],
//     isRowClick: false,
//     isPagination: true,
//     isDragDrop: false,
//   },
// ];

// 상품리스트
const additionalPrompt1 =
  "* Each element includes title and description\n\t* Create a ‘Create Product’ button to the 'flex-row-reverse' between the table and description";

const additionalPrompt2 =
  "* Add a preview sample image at the top of the image tag\n\t* Add a Save Changes button at the bottom";

const additionalPrompt3 =
  "* Add a 'Create Notice' button to the 'flex-row-reverse' between the table and description\n\t* Apply 'flex-grow' classname to the '제목' column and 'w-1/6' to the remaining columns\n\t* Express table borders only between rows";

const additionalPrompt4 =
  "* Add the text ‘Approval’ to the right of the checkbox in table\n\t* Radio consists of two options: 'Disapproval' and 'Approval' in form\n\t* Add a ‘Save Changes’ button at the bottom of the form.";

const additionalPrompt5 = "";

const additionalChartPrompt5 = [
  "* create tabs with '1D', '1W', '1M', and '1Y' in the upper right corner to change the chart data.\n\t* copy the chart with a different title and place it on the right.",
  "* position the label to the right in options.\n\t* copy the chart with a different title and place it on the right.",
];

export default function SampleTemplate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState<number>(1);
  const setSectionList = useSetAtom(sectionListAtom);
  const setBasicLayout = useSetAtom(basicLayoutAtom);
  const setBasicInfo = useSetAtom(basicInfoAtom);
  const setAddPrompt = useSetAtom(templateAddPromptAtom);
  const setChartAddPrompt = useSetAtom(chartAddPromptAtom);

  const basicInfoList: IPageBasicInfo[] = [
    {
      title: "상품",
      description: "WEB2X가 제공하는 블록체인 API 상품을 등록 & 관리합니다.",
    },
    {
      title: "상품",
      description: "WEB2X가 제공하는 블록체인 API 상품을 등록 & 관리합니다.",
    },
    {
      title: "공지사항",
      description: "WEB2X의 공지사항과 뉴스를 등록 & 관리합니다.",
    },
    {
      title: "API 사용 신청",
      description: "WEB2X의 API 사용 신청서 상태를 관리합니다.",
    },
    { title: "Dashboard", description: "" },
    // {
    //   title: "사용자 관리",
    //   description: "서비스 사용자를 관리하는 페이지. 블랙리스트 추가 가능.",
    // },
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
    {
      direction: BasicDirectionTypes.HORIZONTAL,
      step: "1",
    },
    {
      direction: BasicDirectionTypes.HORIZONTAL,
      step: "2",
    },
    {
      direction: BasicDirectionTypes.VERTICAL,
      step: "3",
    },
    // {
    //   direction: BasicDirectionTypes.HORIZONTAL,
    //   step: "1",
    // },
  ];
  const templateDataList: SectionListType[] = [
    templateData1,
    templateData2,
    templateData3,
    templateData4,
    templateData5,
  ];
  const additionalPromptList: any[] = [
    additionalPrompt1,
    additionalPrompt2,
    additionalPrompt3,
    additionalPrompt4,
    additionalPrompt5,
  ];
  const additionalChartPromptList: any[] = [
    [],
    [],
    [],
    [],
    additionalChartPrompt5,
  ];

  const handleOpen = (key: number) => {
    setType(key);
    onOpen();
  };

  const onAction = () => {
    setBasicInfo(basicInfoList[type - 1]);
    setBasicLayout(basicLayoutList[type - 1]);
    setSectionList(templateDataList[type - 1]);
    setAddPrompt(additionalPromptList[type - 1]);
    setChartAddPrompt(additionalChartPromptList[type - 1]);
    onClose();
  };

  return (
    <>
      <div className="flex flex-col gap-3 mt-5 border-b-1 py-5 border-neutral-300 border-dashed">
        <div className="mb-2 sectionTitle">
          <span>Sample Template list.</span>
        </div>
        <div className="flex gap-5 sample">
          <Button onPress={() => handleOpen(1)}>
            <Image
              src={"/images/ic_imgs.png"}
              className="rounded-none"
              alt="EZCodeMaker"
              width={24}
              height={24}
            />
            Template1
          </Button>
          <Button onPress={() => handleOpen(2)}>
            <Image
              src={"/images/ic_form.png"}
              className="rounded-none"
              alt="EZCodeMaker"
              width={24}
              height={24}
            />
            Template2
          </Button>
          <Button onPress={() => handleOpen(3)}>
            <Image
              src={"/images/ic_notice.png"}
              className="rounded-none"
              alt="EZCodeMaker"
              width={24}
              height={24}
            />
            Template3
          </Button>
          <Button onPress={() => handleOpen(4)}>
            <Image
              src={"/images/ic_layout.png"}
              className="rounded-none"
              alt="EZCodeMaker"
              width={24}
              height={24}
            />
            Template4
          </Button>
          <Button onPress={() => handleOpen(5)}>
            <Image
              src={"/images/ic_chart.png"}
              className="rounded-none"
              alt="EZCodeMaker"
              width={24}
              height={24}
            />
            Template5
          </Button>
        </div>
      </div>

      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-neutral-100">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Template{type}
              </ModalHeader>
              <ModalBody className="flex items-center overflow-y-scroll">
                <div className="flex justify-center w-2/3">
                  <Image
                    className="rounded-lg"
                    src={`/template${type}.png`}
                    alt={`template${type}`}
                    layout="responsive"
                    width={1200}
                    height={0}
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
