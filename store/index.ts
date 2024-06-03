import {
  EzListLayoutTypes,
  EzTagTypes,
  FormItemType,
  IFormOptions,
  IListOptions,
  ITableOptions,
  TableColumnType,
} from "@/types";
import { atom } from "jotai";

export const initListValue: IListOptions = {
  kind: EzTagTypes.LIST,
  title: "",
  layout: EzListLayoutTypes.HORIZONTAL,
  isIcon: false,
  isImage: false,
  isDragDrop: false,
};

export const initTableValue: ITableOptions = {
  kind: EzTagTypes.TABLE,
  title: "",
  columns: 1,
  columnContents: [
    { title: "", tagType: TableColumnType.TEXT, clickEvent: false },
  ],
  isRowClick: false,
  isPagination: false,
  isDragDrop: false,
};

export const initFormValue: IFormOptions = {
  kind: EzTagTypes.FORM,
  title: "",
  items: 1,
  itemsContents: [
    {
      label: "",
      tagType: FormItemType.INPUT,
      required: false,
    },
  ],
};

export type SectionListType = (IListOptions | ITableOptions | IFormOptions)[];

export const sectionListAtom = atom<SectionListType>([initListValue]);
