import { useState } from "react";

export default function useOpenAi() {
  const [aiCode, setAiCode] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");

  const getAiCode = async (content: string) => {
    setLoadingMsg("코드 작성 중...");

    try {
      const response = await fetch("/api/summarizer", {
        method: "POST", // HTTP 메소드를 POST로 설정
        headers: {
          "Content-Type": "application/json", // 콘텐츠 타입을 JSON으로 지정
        },
        body: JSON.stringify({
          content, // 전송할 데이터
          aiCode, // 기존 코드에서 추가 요청 시 필요 데이터
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      const cleanCode = result.summary.replace(
        /```typescript|```tsx|```jsx|```/g,
        ""
      );

      setAiCode(cleanCode);
    } catch (err) {
      console.error("요약 요청 중 에러 발생:", err);
    } finally {
      setLoadingMsg("");
    }
  };

  return { getAiCode, aiCode, setAiCode, loadingMsg, isLoading: !!loadingMsg };
}
