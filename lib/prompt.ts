import { EzTagTypes, IFormOptions, IListOptions, ITableOptions } from "@/types";

export const genListPrompt = (section: IListOptions, index: number) => {
  const name = `- section${index + 1}\n\t`;
  const title = section.title ? `* title : ${section.title}\n\t` : "";
  const type = `* type : ${section.layout} ${EzTagTypes.LIST}\n\t`;
  const icon = section.isIcon
    ? "* The icon is included in the list tag\n\t"
    : "";
  const image = section.isImage
    ? "* The image is included in the list tag\n\t"
    : "";
  const dragDrop = section.isDragDrop
    ? "* The order of the list can be modified by dragging and dropping.\n\t"
    : "";

  return name + title + type + icon + image + dragDrop;
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
