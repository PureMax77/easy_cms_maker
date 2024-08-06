import { useEffect, useState } from "react";
import useCoinMarketCap from "@/hooks/useCoinMarketCap";
import { Image } from "@nextui-org/react";
import Container from "@/components/Conatiner";
import { numUnit } from "@/utils/number";
import { lessThenText } from "@/utils/numberUtils";

export default function Exchange() {
  const getExchangeList = useCoinMarketCap();
  const [list, setList] = useState<any[]>([]);
  const [exchangeList, setExchangeList] = useState<any[]>([]);

  const getList = () => {
    getExchangeList({
      target: "exchange",
      sort: "volume_24h",
      limit: "10",
    }).then((list) => {
      // console.log(list.summary);
      if (list.summary && list.summary.data) {
        getExchangeInfo(list.summary.data);
      }
    });
  };

  const getExchangeInfo = async (exchanges: any[]) => {
    let newList: any[] = [];
    exchanges.forEach(async (item: any, index: number) => {
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

        // console.log(_data);
        newList.push(_data);
      }

      if (exchanges.length == newList.length) {
        // console.log(newList);
        setExchangeList(
          newList.sort(function (a, b) {
            return b.spot_volume_usd - a.spot_volume_usd;
          })
        );
      }
    });
  }

  useEffect(() => {
    getList();
  }, []);

  const ExchangeList = ({ item, index }: { item: any; index: number }) => {
    return (
      <>
        <tr key={index}>
          <td className="w-[60px] text-center">{index + 1}</td>
          <td>
            <div className="flex items-center gap-2 w-[200px]">
              <Image src={item.logo} alt={item.name} width={24} height={24} />
              <span>{item.name}</span>
            </div>
          </td>
          <td className="text-right w-[180px]">
            {lessThenText(item.spot_volume_usd || "0", "$ ", false, 2)}
          </td>
          <td className="text-right w-[180px]">
            {lessThenText(item.weekly_visits || "0", "", false, 0)}
          </td>
          <td>{item.fiats.join(", ")}</td>
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
                <th className="w-[60px]">#</th>
                <th className="text-left w-[200px]">Name</th>
                <th className="text-right w-[180px]">거래량</th>
                <th className="text-right w-[180px]">주별 방문</th>
                <th>지원 화폐</th>
              </tr>
            </thead>
            <tbody>
              {exchangeList.length > 0 &&
                exchangeList.map((item, i) => (
                  <ExchangeList key={i} item={item} index={i} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
