import { useEffect, useMemo, useState } from "react";
import useCoinMarketCap from "@/hooks/useCoinMarketCap";
import { Image } from "@nextui-org/react";
import Container from "@/components/Conatiner";
import { numUnit } from "@/utils/number";
import { lessThenText } from "@/utils/numberUtils";

export default function Exchange() {
  const getExchangeList = useCoinMarketCap();
  // const [list, setList] = useState<any[]>([]);
  const [exchangeList, setExchangeList] = useState<any[]>([]);

  const getList = () => {
    getExchangeList({
      target: "exchange",
      sort: "volume_24h",
      limit: "10",
    }).then((list) => {
      // console.log(list);
      if (list.summary && list.summary.data.length > 0) {
        // setList(list.summary.data);
        getExchangeInfo(list.summary.data);
      }
    });
  };

  const getExchangeInfo = async (list: any[]) => {
    let newList: any[] = [];
    list.forEach(async (item: any, index: number) => {
      const result = await getExchangeList({
        target: "exchangeInfo",
        id: item.id,
        convert: "WON",
      });

      if (result && result.summary.data) {
        const _data = {
          item,
          ...result.summary.data[item.id],
        };

        console.log(_data);
        newList.push(_data);
      }
    });

    // console.log(newList);
    setExchangeList(newList);
  }

  useEffect(() => {
    if (exchangeList.length == 0) getList();
  }, [exchangeList]);

  const ExchangeList = ({ item, index }: { item: any; index: number }) => {
    return (
      <>
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td>
            <div className="flex items-center gap-2">
              <Image src={item.logo} alt={item.name} width={24} height={24} />
              <span>{item.name}</span>
            </div>
          </td>
          <td className="text-right">{numUnit(item.circulating_supply)}</td>
          <td className="text-right">
            {lessThenText(item.weekly_visits || "0", "", false)}
          </td>
          <td className="text-right">{item.fiats}</td>
        </tr>
      </>
    );
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">Exchange</h1>
      <div className="flex flex-col max-w-[1200px] justify-center w-full">
        <div className="flex flex-col gap-3 mt-5">
          <div className="mb-2 sectionTitle">
            <span>Top 10 Exchanges By Today</span>
          </div>
          <table className="w-full border-collapse token-list">
            <thead>
              <tr>
                <th className="w-[50px]">#</th>
                <th className="text-left">Name</th>
                <th className="text-right">거래량</th>
                <th className="text-right">주별 방문</th>
                <th className="text-right">지원 화폐</th>
              </tr>
            </thead>
            <tbody>
              {exchangeList.map((item, i) => (
                <ExchangeList key={i} item={item} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
