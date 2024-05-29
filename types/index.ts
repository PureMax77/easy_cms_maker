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
