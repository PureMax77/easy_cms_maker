import BigNumber from "bignumber.js";
import { adaptWonDecimal, adaptTokenDecimal, checkZero } from "./number";

const fmt = {
  prefix: "",
  decimalSeparator: ".",
  groupSeparator: ",",
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: " ",
  fractionGroupSize: 0,
  suffix: "",
};

const decimalExist = (decimal: any) => decimal || decimal == 0;



const toFixedZeroPadding = (
  value: BigNumber | string | number,
  decimalPlace: number | undefined = undefined,
  zeroPadding: boolean = false
): string => {
  if (!value) {
    return "0";
  }
  value = new BigNumber(value);

  if (value.isEqualTo(0)) {
    decimalPlace = undefined;
  }

  const ret =
    decimalPlace !== undefined
      ? value.toFormat(decimalPlace, fmt)
      : value.toFormat(fmt);

  return zeroPadding ? ret.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, "$1") : ret;
};

/**
 * BigNumber toFixed
 * @param value
 * @param decimalPlace
 * @returns
 */
export const toFixed = toFixedZeroPadding;



export const plus_BigNumber = (
  x: string | number,
  y: string | number,
  decimal?: string | number
): string => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return decimalExist(decimal)
    ? number1.plus(number2).toFixed(Number(decimal))
    : number1.plus(number2).toFixed();
};

export const minus_BigNumber = (
  x: string | number,
  y: string | number,
  decimal?: string | number
): string => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return decimalExist(decimal)
    ? number1.minus(number2).toFixed(Number(decimal))
    : number1.minus(number2).toFixed();
};

export const divide_BigNumber = (
  x: string | number,
  y: string | number,
  decimal?: string | number
): string => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return decimalExist(decimal)
    ? number1.dividedBy(number2).toFixed(Number(decimal))
    : number1.dividedBy(number2).toFixed();
};

export const multiple_BigNumber = (
  x: string | number,
  y: string | number,
  decimal?: number
): string => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return decimalExist(decimal)
    ? number1.multipliedBy(number2).toFixed(Number(decimal))
    : number1.multipliedBy(number2).toFixed();
};

/**
 * 미만 or 이하 (lessThen or less/equal) 표기
 * @param value BigNumber|string|number 입력 값
 * @param suffix 숫자 뒤에 단위 표기시 추가
 * @param zeroPadding 소수점 0 표기
 * @param decimal number 최종적으로 표기할 소수점 자리
 * @return string
 */
export const lessThenText = (
  value: BigNumber | string | number,
  suffix: string = "",
  zeroPadding: boolean = true,
  decimal?: number,
) => {
  const n = new BigNumber(value);
  const isNegative = n.isNegative();
  const isWon = suffix === "₩";
  const isPercent = suffix === "%" || suffix === "%p";
  // 입력된 decimal 있으면 그것으로 적용, 없는데 %, $가 아닌경우 모두 토큰수량의 데시멀 적용
  const DECIMAL =
    decimal !== undefined
      ? decimal
      : isPercent
      ? 2
      : isWon
      ? adaptWonDecimal(value)
      : adaptTokenDecimal(value);
  let targetValue = divide_BigNumber(1, Math.pow(10, DECIMAL));
  const isLess = isLessThan_BigNumber(n.abs().toString(), targetValue);

  if (checkZero(n.toFixed())) {
    return isWon ? "₩ 0" : "0" + suffix;
  } else {
    if (isLess) {
      if (!isWon && isNegative) targetValue = "-" + targetValue;

      return isWon
        ? isNegative
          ? "-₩ " + targetValue
          : "₩ " + targetValue
        : targetValue + suffix + " 미만";
    } else {
      let returnNumber = getAmountFormat(n, DECIMAL, zeroPadding);
      if (isWon && isNegative) returnNumber = returnNumber.replace("-", "");
      return isWon
        ? isNegative
          ? "-₩ " + returnNumber
          : "₩ " + returnNumber
        : returnNumber + suffix;
    }
  }
};



export const getAmountFormat = (
  amount: BigNumber | string | number,
  decimal: number,
  zeroPadding: boolean = true
) => {
  let result = "0";
  if (Number(amount) != 0) {
    // 값이 0이 아닐때만 자릿수 표기
    result = !zeroPadding
      ? new BigNumber(amount).toFixed(decimal)
      : toFixed(amount, decimal);

    if (result.indexOf(".") == -1) {
      result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      let _arr = result.split(".");
      result = _arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + _arr[1];
    }
  }

  return result;
};

export const isLessThan_BigNumber = (
  x: string | number,
  y: string | number,
  isEqual: boolean = false
): boolean => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return !isEqual
    ? number1.isLessThan(number2)
    : number1.isLessThanOrEqualTo(number2);
};