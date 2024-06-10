import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum BasicDirectionTypes {
  HORIZONTAL = "Horizontal",
  VERTICAL = "Vertical",
}

export interface IBasicLayout {
  direction: BasicDirectionTypes;
  step: string;
}

export enum EzTagTypes {
  LIST = "List",
  TABLE = "Table",
  FORM = "From",
}

export enum EzListLayoutTypes {
  HORIZONTAL = "Horizontal",
  VERTICAL = "Vertical",
  ARRANGEMENT = "Arrow",
}

export interface IPageLayoutForm {
  direction: "row" | "column";
  step: "1" | "2" | "3";
  pageType: EzTagTypes;
}

export interface IListOptions {
  kind: EzTagTypes.LIST;
  title: string;
  layout: EzListLayoutTypes;
  isIcon: boolean;
  isImage: boolean;
  isDragDrop: boolean;
}

export enum TableColumnType {
  TEXT = "Text",
  INPUT = "Input",
  IMAGE = "Image",
  CHECKBOX = "Checkbox",
  RADIO = "Radio",
  SWITCH = "Switch",
  SELECTBOX = "Selectbox",
  BUTTON = "Button",
}

export enum FormItemType {
  TEXT = "Text",
  INPUT = "Input",
  IMAGE = "Image",
  CHECKBOX = "Checkbox",
  RADIO = "Radio",
  SWITCH = "Switch",
  SELECTBOX = "Selectbox",
  BUTTON = "Button",
}

export interface IColumnContent {
  title: string;
  tagType: TableColumnType;
  clickEvent?: boolean;
}

export interface IFormContent {
  label: string;
  tagType: FormItemType;
  required: boolean;
}

export interface ITableOptions {
  kind: EzTagTypes.TABLE;
  title: string;
  columns: number;
  columnContents: IColumnContent[];
  isRowClick: boolean;
  isPagination: boolean;
  isDragDrop: boolean;
}

export interface IFormOptions {
  kind: EzTagTypes.FORM;
  title: string;
  items: number;
  itemsContents: IFormContent[];
}
