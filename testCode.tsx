import { useState } from "react";
const CoinMarketCap = require("coinmarketcap-api");

const apiKey = "0bef918b-d7c3-4e51-9e94-4afcb4727b2b";
const client = new CoinMarketCap(apiKey);

interface TokenType {
  name: string;
  symbol: string;
  quote: {
    KRW: {
      percent_change_1h: number;
      percent_change_7d: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      price: number;
      volume_24h: number;
      volume_change_24h: number;
    };
  };
}

export default async function App() {
  const [tokenList, setTokenList] = useState<TokenType[]>([]);

  const getTokenList = async () => {
    const result = await client.getTickers({
      start: 1,
      limit: 30,
      convert: "KRW",
    });
    setTokenList(result.summary.data);
  };

  return <div></div>;
}
