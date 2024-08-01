import {
  BasicDirectionTypes,
  EzListLayoutTypes,
  EzTagTypes,
  FormItemType,
  IBasicLayout,
  IFormOptions,
  IListOptions,
  IPageBasicInfo,
  ITableOptions,
  TableColumnType,
} from "@/types";
import { atom } from "jotai";

export const initListValue: IListOptions = {
  kind: EzTagTypes.LIST,
  title: "",
  layout: EzListLayoutTypes.HORIZONTAL,
  samples: 6,
  isIcon: false,
  isImage: false,
  isDragDrop: false,
};

export const initColumnContent = {
  title: "",
  tagType: TableColumnType.TEXT,
  clickEvent: false,
};

export const initTableValue: ITableOptions = {
  kind: EzTagTypes.TABLE,
  title: "",
  samples: 6,
  columns: 1,
  columnContents: [initColumnContent],
  isRowClick: false,
  isPagination: false,
  isDragDrop: false,
};

export const initItemContent = {
  label: "",
  tagType: FormItemType.INPUT,
  required: false,
};

export const initFormValue: IFormOptions = {
  kind: EzTagTypes.FORM,
  title: "",
  items: 1,
  itemsContents: [initItemContent],
};

export type SectionListType = (IListOptions | ITableOptions | IFormOptions)[];

export const sectionListAtom = atom<SectionListType>([initListValue]);

export const basicLayoutAtom = atom<IBasicLayout>({
  direction: BasicDirectionTypes.HORIZONTAL,
  step: "1",
});

export const basicInfoAtom = atom<IPageBasicInfo>({
  title: "",
  description: "",
});

export const promptAtom = atom<string>("");

// 템플릿을 더 알맞게하기 위한 추가 프롬프트내용
export const templateAddPromptAtom = atom<string>("");
