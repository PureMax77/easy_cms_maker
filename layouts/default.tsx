import Head from "next/head";
import { Header } from "./Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>EZCodeMaker</title>
      </Head>
      <div className="light">
        <main
          className={`bg-white w-full min-h-screen h-fit min-w-[1280px] overflow-auto`}
        >
          <Header />
          <div className="px-20">{children}</div>
          {/* <Footer /> */}
        </main>
      </div>
    </>
  );
}
