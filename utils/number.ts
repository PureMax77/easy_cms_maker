import BigNumber from "bignumber.js";
import {
  divide_BigNumber,
  minus_BigNumber,
  multiple_BigNumber,
} from "./numberUtils";

/** TOKEN 최소 표현 decimal 자리수 */
export const TOKEN_DECIMAL_MIN_0: number = 8;
export const TOKEN_DECIMAL_MIN: number = 4;
/** $ decimal 자리수 */
export const DOLLAR_WON_0: number = 2;
export const DOLLAR_WON: number = 0;
/** numUnit 자리수 */
export const NUMUNIT_DECIMAL_0: number = 2;
export const NUMUNIT_DECIMAL: number = 0;

// put in comma
export const comma = (n: number) => {
  // less then 1000 return original state
  if (n < 1000) return n;

  const s = n.toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// number change to Million & Billion and change to Thousand
export const numUnit = (
  value: number | string | BigNumber,
  decimal?: number,
  isStaking = false,
  isChkThousand = false,
): string => {
  const value_BN = BigNumber.isBigNumber(value) ? value : new BigNumber(value);
  const M = Math.pow(10, 6);
  const B = Math.pow(10, 9);
  let finalValue, unit;
  const finalDecimal =
    decimal !== undefined ? decimal : adaptNumUnitDecimal(value);

  if (value_BN.isLessThan(M)) {
    const K = Math.pow(10, 3);

    if (!isChkThousand || value_BN.isLessThan(K)) {
      finalValue = value_BN.toFormat(isStaking ? 0 : finalDecimal);
      unit = "";
    } else {
      finalValue = value_BN.dividedBy(K).toFormat(finalDecimal);
      unit = "K";
    }
  } else if (value_BN.isLessThan(B)) {
    finalValue = value_BN.dividedBy(M).toFormat(finalDecimal);
    unit = "M";
  } else {
    finalValue = value_BN.dividedBy(B).toFormat(finalDecimal);
    unit = "B";
  }

  return finalValue + unit;
};

// numUnit for CountUp Module
export const numUnit_count = (
  value: number | string,
  decimal: number = adaptNumUnitDecimal(value), // 기본적으로 undefined 넣으면 되고 K미만에서 decimal을 정하고 싶으면 넣어주면됨
  isStaking: boolean = false,
) => {
  const tmpResult = numUnit(value, decimal, isStaking);
  const deletedComma = tmpResult.replace(/\,/g, "");
  let finalValue, unit;
  let finalDecimal: number = 2;

  if (deletedComma.includes("M")) {
    finalValue = deletedComma.split("M")[0];
    unit = "M";
  } else if (deletedComma.includes("B")) {
    finalValue = deletedComma.split("B")[0];
    unit = "B";
  } else {
    finalValue = deletedComma;
    unit = "";
    finalDecimal = decimal;
  }

  return { number: Number(finalValue), unit, decimal: finalDecimal };
};

// check if zero
export const checkZero = (t: number | string): boolean => {
  return new BigNumber(t).isZero();
};

export const checkPositive = (t: number | string): boolean => {
  return new BigNumber(t).isPositive();
};

export const checkNegative = (t: number | string): boolean => {
  return new BigNumber(t).isNegative();
};

// for percentage (default decimal: 2)
export const addPlusText = (
  t: string | number | BigNumber,
  decimal: number = 2,
): string => {
  const BN = new BigNumber(t);
  return BN.isPositive() && !BN.isZero()
    ? "+" + BN.toFormat(decimal)
    : BN.toFormat(decimal);
};

export const deleteComma = (input: string): string => input.replace(/\,/g, "");

export const getChartPercentage = (data: any, unit: string) => {
  if (data[0]) {
    const start = data[0][unit];
    const end = data[data.length - 1][unit];

    if (start == 0) return "0";

    return multiple_BigNumber(
      divide_BigNumber(minus_BigNumber(end, start), start),
      100,
    );
  } else {
    return "0";
  }
};

/**
 * 토큰 Decimal을 정수 값이 0이면 8 아니면 4로 표현
 * @param value 해당 전체 수량
 * @returns
 */
export const adaptTokenDecimal = (
  value: number | string | BigNumber,
): number => {
  const integer = BigNumber(value).integerValue();

  return integer.isZero() ? TOKEN_DECIMAL_MIN_0 : TOKEN_DECIMAL_MIN;
};

/**
 * 달러 Decimal을 정수 값이 0이면 4 아니면 2로 표현
 * @param value 해당 전체 수량
 * @returns
 */
export const adaptWonDecimal = (
  value: number | string | BigNumber,
): number => {
  const integer = BigNumber(value).integerValue();

  return integer.isZero() ? DOLLAR_WON_0 : DOLLAR_WON;
};

/**
 * NumUnit Decimal을 정수 값이 0이면 4 아니면 2로 표현
 * @param value 해당 전체 수량
 * @returns
 */
export const adaptNumUnitDecimal = (
  value: number | string | BigNumber,
): number => {
  const integer = BigNumber(value).integerValue();

  return integer.isZero() ? NUMUNIT_DECIMAL_0 : NUMUNIT_DECIMAL;
};