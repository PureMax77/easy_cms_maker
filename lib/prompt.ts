import {
  ChartType,
  EzListLayoutTypes,
  EzTagTypes,
  IChartOptions,
  IFormOptions,
  IListOptions,
  ITableOptions,
} from "@/types";

export const genListPrompt = (section: IListOptions, index: number) => {
  const name = `- section${index + 1}\n\t`;
  const title = section.title ? `* title : ${section.title}\n\t` : "";

  const type = `* type : ${section.layout} ${
    section.layout === EzListLayoutTypes.ARRANGEMENT ? "grid" : "slide"
  } contents\n\t`;

  const samples = `* Need ${section.samples} sample data.\n\t`;
  const icon = section.isIcon ? "* Each element includes the icon\n\t" : "";
  const image = section.isImage ? "* Each element includes the image\n\t" : "";
  const dragDrop = section.isDragDrop
    ? "* The order of elements can be modified by dragging and dropping\n\t"
    : "";

  return name + title + type + samples + icon + image + dragDrop;
};

export const genTablePrompt = (section: ITableOptions, index: number) => {
  const name = `- section${index + 1}\n\t`;
  const title = section.title ? `* title : ${section.title}\n\t` : "";
  const type = `* type : ${EzTagTypes.TABLE} with ${section.columns} columns\n\t\t`;

  const columns = section.columnContents
    .map((content, index, array) => {
      const isLast = array.length - 1 === index;

      const cTitle = `${index + 1}. Column${index + 1} has the title '${
        content.title
      }'. `;
      const cTag = `Column${index + 1} consists of ${content.tagType} tag. `;
      const cClick = content.clickEvent
        ? `Column${index + 1} contains a click event.`
        : "";
      const suffix = isLast ? "\n\t" : "\n\t\t";
      return cTitle + cTag + cClick + suffix;
    })
    .join("");

  const samples = `* Need ${section.samples} sample data.\n\t`;
  const rowClick = section.isRowClick
    ? "* Put a row-click event on the table tag.\n\t"
    : "";
  const pagination = section.isPagination
    ? "* Put a pagination function on the table tag.\n\t"
    : "";
  const dragDrop = section.isDragDrop
    ? "* The row order of the column can be modified by dragging and dropping.\n\t"
    : "";

  return (
    name + title + type + columns + samples + rowClick + pagination + dragDrop
  );
};

export const genFormPrompt = (section: IFormOptions, index: number) => {
  const name = `- section${index + 1}\n\t`;
  const title = section.title ? `* title : ${section.title}\n\t` : "";
  const type = `* type : ${EzTagTypes.FORM} with ${section.items} items\n\t\t`;

  const items = section.itemsContents
    .map((content, index, array) => {
      const isLast = array.length - 1 === index;

      const label = `${index + 1}. Item${index + 1} has the label '${
        content.label
      }'. `;
      const iTag = `Item${index + 1} consists of ${content.tagType} tag. `;
      const iRequired = content.required
        ? `Item${index + 1} is required.`
        : `Item${index + 1} isn't required.`;
      const suffix = isLast ? "\n\t" : "\n\t\t";
      return label + iTag + iRequired + suffix;
    })
    .join("");

  return name + title + type + items;
};

export const genChartPrompt = (section: IChartOptions, index: number) => {
  const name = `- section${index + 1}\n\t`;
  const type = `* chart type : ${section.chartType} chart with ${section.datasets} datasets\n\t`;

  let datasets = "";

  if (section.chartType !== ChartType.DOUGHNUT) {
    // 도넛 차트 제외
    datasets = section.datasetContents
      .map((content, index, array) => {
        const isLast = array.length - 1 === index;

        const label = content.label
          ? `Dataset${index + 1} has the label '${content.label}'. `
          : "";
        const color = `Dataset${index + 1} has backgroundColor of ${
          content.backgroundColor
        } and borderColor of ${content.borderColor}. `;

        const suffix = isLast ? "\n\t" : "\n\t\t";
        return `${index + 1}. ` + label + color + suffix;
      })
      .join("");
  } else {
    // 도넛차트의 경우
    if (section.datasets > 1) {
      datasets = section.datasetContents
        .map((content, index, array) => {
          const isLast = array.length - 1 === index;

          const label = content.label
            ? `Dataset${index + 1} has the label '${content.label}'. `
            : "";

          const suffix = isLast ? "\n\t" : "\n\t\t";
          return `${index + 1}. ` + label + suffix;
        })
        .join("");
    }
  }

  const finalDatasets = datasets ? "\t" + datasets : "";

  const title = section.title ? `* chart title : ${section.title}\n\t` : "";
  const xTitle = section.xTitle ? `* x-axis title : ${section.xTitle}\n\t` : "";
  const yTitle = section.yTitle ? `* y-axis title : ${section.yTitle}\n\t` : "";

  return name + type + finalDatasets + title + xTitle + yTitle;
};
