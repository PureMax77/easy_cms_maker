import { useEffect, useState } from "react";
import useCoinMarketCap from "@/hooks/useCoinMarketCap";
import { Button, Input } from "@nextui-org/react";
import Container from "@/components/Conatiner";

export default function Exchange() {
  const { getExchangeList } = useCoinMarketCap();

  const getList = () => {
    getExchangeList({
      start: "1",
      limit: "100",
      convert: "KRW",
    }).then((list) => {
      console.log(list);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight">Exchange</h1>
      <div className="flex flex-col max-w-[1200px] justify-center w-full">
        <div className="flex flex-col gap-3 mt-5 border-b-1 py-5 border-neutral-300 border-dashed">
          <div className="mb-2 sectionTitle">
            <span>Exchange List</span>
          </div>
          <div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>Witchy Woman</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>Shining Star</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
}
