import { useState } from "react";

export default function useCoinMarketCap() {
  const getQueryString = (params: { [key: string]: any }) => {
    const qs = new URLSearchParams(params);
    return qs;
  };

  const getExchangeList = async (params: { [key: string]: any }) => {
    try {
      const qs = getQueryString(params);
      const response = await fetch(`/api/coinmarket?${qs}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      // console.log(result);

      return result;
    } catch (err) {
      console.error("요약 요청 중 에러 발생:", err);
    }
  };

  return getExchangeList;
}
