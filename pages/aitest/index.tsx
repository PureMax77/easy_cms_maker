import { Sandpack } from "@codesandbox/sandpack-react";

export default function AiTest() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Sandpack
        template="nextjs"
        files={{
          "/pages/index.js": {
            code: `export default function Home({ data }) {
  return (
    <div>
      <h1>Hello {data}33</h1>
    </div>
  );
}
  
export function getServerSideProps() {
  return {
    props: { data: "world" },
  }
}
`,
          },
        }}
      />
    </div>
  );
}
