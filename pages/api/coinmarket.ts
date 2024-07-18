import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  summary?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const CoinMarketCap = require("coinmarketcap-api");

  // parameter
  const { start, limit, convert } = req.query;
  // console.log(start, limit, convert);

  const apiKey = process.env.NEXT_PUBLIC_COINMARKETCAP_KEY;
  const client = new CoinMarketCap(apiKey);

  try {
    // console.log("start Summarize");
    const result = await client.getTickers({
      start,
      limit,
      convert,
    });
    res.status(200).json({ summary: result || "" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "CoinMarketCap 요청 중 에러 발생" });
  }
}
