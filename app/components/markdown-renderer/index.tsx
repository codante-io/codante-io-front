import Markdown from "markdown-to-jsx";

function H1WithDivider({
  children,
  ...props
}: {
  header: any;
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 {...props}>{children}</h1>
      <div className="w-full h-[1px] mt-2 mb-6 rounded-full bg-slate-200 dark:bg-slate-700"></div>
    </>
  );
}

function H2WithDivider({
  children,
  ...props
}: {
  header: any;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 {...props}>{children}</h2>
      <div className="w-full h-[1px] mt-2 mb-6 rounded-full bg-slate-200 dark:bg-slate-700"></div>
    </>
  );
}

const classOverrides = {
  h1: {
    component: H1WithDivider,
    props: {
      className: "text-2xl mt-8 mb-2 font-semibold",
    },
  },

  h2: {
    component: H2WithDivider,
    props: {
      className: "text-xl mt-8 mb-2 font-semibold",
    },
  },

  h3: {
    props: {
      className: "text-lg mt-4 mb-2 font-semibold",
    },
  },

  p: {
    props: {
      className: "my-4 font-light",
    },
  },

  ul: {
    props: {
      className: "list-disc ml-8 font-light",
    },
  },

  li: {
    props: {
      className: "my-4",
    },
  },
};

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <Markdown
      options={{
        overrides: classOverrides,
      }}
    >
      {markdown}
    </Markdown>
  );
}
