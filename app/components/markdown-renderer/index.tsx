/* eslint-disable react/display-name */
import Markdown from "markdown-to-jsx";
import { Highlight, themes } from "prism-react-renderer";
import type { ReactElement } from "react";
import { useColorMode } from "~/contexts/color-mode-context";
import type { ColorMode } from "~/utils/dark-mode";

const getCodeComponent =
  (colorMode: ColorMode) =>
  ({ className, children }: { className: string; children: ReactElement }) => {
    const language = className
      ?.split(" ")
      ?.find((className) => className?.includes("lang-"))
      ?.replace("lang-", "");

    return (
      <Highlight
        theme={colorMode === "light" ? themes.nightOwlLight : themes.nightOwl}
        code={children?.props?.children}
        language={language || "javascript"}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className={className}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {/* <span>{i + 1}</span> */}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  };

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
      <div className="w-full h-[1px] mt-2 mb-6 rounded-full bg-background-200 dark:bg-background-700"></div>
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
      <div className="w-full h-[1px] mt-2 mb-6 rounded-full bg-background-200 dark:bg-background-700"></div>
    </>
  );
}

const generateClassOverrides = (colorMode: ColorMode) => ({
  h1: {
    component: H1WithDivider,
    props: {
      className: "text-2xl mt-8 mb-2 font-semibold",
    },
  },

  pre: {
    component: getCodeComponent(colorMode),
    props: {
      className:
        "dark:bg-background-800 bg-background-200 p-4 rounded-lg my-10",
    },
  },

  code: {
    props: {
      className:
        "dark:text-brand-300 dark:bg-background-800 bg-background-200 px-1.5 py-0.5 rounded-md font-mono",
    },
  },

  h2: {
    component: H2WithDivider,
    props: {
      className: "mb-0",
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
      className: "my-3",
    },
  },

  a: {
    props: {
      className:
        "text-blue-500 no-underline truncate inline-block hover:underline",
    },
  },
});

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
  const { colorMode } = useColorMode();

  return (
    <div className="prose lg:prose-lg dark:prose-invert prose-ul:ml-0 prose-h2:mb-2">
      <Markdown
        options={{
          overrides: generateClassOverrides(colorMode),
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
