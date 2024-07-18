import { useEffect, useState } from "react";
import useCoinMarketCap from "@/hooks/useCoinMarketCap";
import { Button, Image } from "@nextui-org/react";
import Container from "@/components/Conatiner";
import { numUnit } from "@/utils/number";
import { lessThenText } from "@/utils/numberUtils";

export default function AiTest() {
  const getExchangeList = useCoinMarketCap();
  const [list, setList] = useState([]);

  const getList = () => {
    getExchangeList({
      start: "1",
      limit: "100",
      convert: "KRW",
    }).then((list) => {
      // console.log(list);

      setList(list.summary.data);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const TokenList = ({ token, index }: { token: any; index: number }) => {
    return (
      <>
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td>
            <div className="flex items-center gap-2">
              <Image
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`}
                alt={token.name}
                width={24}
                height={24}
              />
              <span>{token.name}</span>
              <span className="text-slate-400">{token.symbol}</span>
            </div>
          </td>
          <td className="text-right">
            {lessThenText(token.quote.KRW.price || "0", "₩", false)}
          </td>
          <td className="text-right">
            {lessThenText(token.quote.KRW.percent_change_1h || "0", "%", false)}
          </td>
          <td className="text-right">
            {lessThenText(
              token.quote.KRW.percent_change_24h || "0",
              "%",
              false
            )}
          </td>
          <td className="text-right">
            {lessThenText(token.quote.KRW.percent_change_7d || "0", "%", false)}
          </td>
          <td className="text-right">
            ₩ {numUnit(token.quote.KRW.market_cap)}
          </td>
          <td className="text-right">
            ₩ {numUnit(token.quote.KRW.volume_24h)}
          </td>
          <td className="text-right">
            {numUnit(token.circulating_supply)}{" "}
            <span className="text-slate-400">{token.symbol}</span>
          </td>
        </tr>
      </>
    );
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">Token</h1>
      <div className="flex flex-col max-w-[1200px] justify-center w-full">
        <div className="flex flex-col gap-3 mt-5 py-5">
          <div className="mb-2 sectionTitle">
            <span>Top 100 Tokens By Today</span>
          </div>
          <table className="w-full border-collapse token-list">
            <thead>
              <tr>
                <th className="w-[50px]">#</th>
                <th className="text-left">Name</th>
                <th className="text-right min-w-[120px]">Price</th>
                <th className="text-right w-[100px]">1h %</th>
                <th className="text-right w-[100px]">24h %</th>
                <th className="text-right w-[100px]">7d %</th>
                <th className="text-right min-w-[120px]">시가총액</th>
                <th className="text-right min-w-[120px]">거래량</th>
                <th className="text-right min-w-[150px]">유통 공급량</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, i) => (
                <TokenList key={i} token={item} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
