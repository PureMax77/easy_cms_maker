import { Input, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { IFormContent, IChartOptions, ChartType } from "@/types";
import { SectionListType, initDatasetContent } from "@/store";
import EzChartModal from "./EzChartModal";
import { useMemo } from "react";

interface Props {
  itemKey: number;
  sectionData: IChartOptions;
  setSectionList: Function;
}

type ChangeType = "type" | "dataset" | "xAxis" | "yAxis";

const TagStep_Chart: React.FC<Props> = ({
  itemKey,
  sectionData,
  setSectionList,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const tagTypes: ChartType[] = useMemo(() => Object.values(ChartType), []);

  const getNewDatasetContents = (
    preSection: IChartOptions,
    nowNumber: number, // 현재 입력된 숫자
    type: ChangeType
  ): IFormContent[] | null => {
    if (type !== "dataset") return null;

    const preNumber = preSection.datasets; // 이전 숫자
    const newContents = JSON.parse(JSON.stringify(preSection.datasetContents));

    if (preNumber > nowNumber) {
      newContents.splice(nowNumber);
    } else if (preNumber < nowNumber) {
      const addInitContents = new Array(nowNumber - preNumber).fill(
        initDatasetContent
      );
      newContents.push(...addInitContents);
    } else {
      return null;
    }

    return newContents;
  };

  const onValueChange = (e: any, type: ChangeType) => {
    // fail check
    if (type === "dataset" && (!e || e === "0")) return;

    // item 변경 시 value check
    let datasetNumber = Number(e);
    if (type === "dataset") {
      datasetNumber = datasetNumber < 1 ? 1 : Math.floor(datasetNumber);
    }

    setSectionList((preV: SectionListType) => {
      let newList = JSON.parse(JSON.stringify(preV));

      const datasetContents = getNewDatasetContents(
        preV[itemKey] as IChartOptions,
        datasetNumber,
        type
      );

      const newSection: IChartOptions = {
        ...newList[itemKey],
        ...(type === "type" && { chartType: e }),
        ...(type === "dataset" && { datasets: datasetNumber }),
        ...(type === "dataset" && datasetContents && { datasetContents }),
        ...(type === "xAxis" && { xTitle: e }),
        ...(type === "yAxis" && { yTitle: e }),
      };

      newList[itemKey] = newSection;

      return newList;
    });
  };

  return (
    <div className="flex">
      <div className="flex items-center pr-4 border-r-1">
        <Select
          label="Chart Type"
          className="w-40"
          value={sectionData.chartType}
          onChange={(e) => onValueChange(e.target.value, "type")}
        >
          {tagTypes.map((chartType) => (
            <SelectItem key={chartType}>{chartType}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex items-center px-4 border-r-1">
        <Input
          className="mr-1 w-[50px]"
          type="number"
          size="sm"
          value={String(sectionData.datasets)}
          onValueChange={(e) => onValueChange(e, "dataset")}
        />
        <span className="mr-3 ml-1">Datasets</span>
        <EzChartModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          itemKey={itemKey}
        />
      </div>
      <div className="flex items-center px-4 border-r-1">
        <Input
          className="mr-1 w-[250px]"
          type="text"
          placeholder="X-Axis Title"
          size="sm"
          value={sectionData.xTitle}
          onValueChange={(e) => onValueChange(e, "xAxis")}
        />
      </div>
      <div className="flex items-center px-4">
        <Input
          className="mr-1 w-[250px]"
          type="text"
          placeholder="Y-Axis Title"
          size="sm"
          value={sectionData.yTitle}
          onValueChange={(e) => onValueChange(e, "yAxis")}
        />
      </div>
    </div>
  );
};

export default TagStep_Chart;
