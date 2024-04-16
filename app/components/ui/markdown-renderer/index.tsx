/* eslint-disable react/display-name */
import Markdown from "markdown-to-jsx";
import { Highlight, themes } from "prism-react-renderer";
import React, { type ReactElement } from "react";
import slugify from "slugify";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import type { ColorMode } from "~/lib/utils/dark-mode";

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
      <div className="w-full h-[1px] mt-2 mb-6 rounded-full bg-background-200 dark:bg-gray-700"></div>
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
      <div className="w-full h-[1px] mt-2 mb-6 rounded-full bg-background-200 dark:bg-gray-700"></div>
    </>
  );
}

function isAlert(firstChild: React.ReactElement) {
  if (firstChild.props.children[0].startsWith("Dica"))
    return { color: "#22c55e", text: "Dica", imgPath: "/icons/bulb-icons.svg" };
  if (firstChild.props.children[0].startsWith("Informação"))
    return {
      color: "#3b82f6",
      text: "Informação",
      imgPath: "/icons/info.svg",
    };
  if (firstChild.props.children[0].startsWith("Importante"))
    return {
      color: "#a855f7",
      text: "Importante",
      imgPath: "/icons/icon-important.svg",
    };
  if (firstChild.props.children[0].startsWith("Aviso"))
    return {
      color: "#fde047",
      text: "Aviso",
      imgPath: "/icons/warning.svg",
    };
  if (firstChild.props.children[0].startsWith("Cuidado"))
    return {
      color: "#ef4444",
      text: "Cuidado",
      imgPath: "/icons/caution.svg",
    };
  return false;
}

const generateClassOverrides = (colorMode: ColorMode, fontSize?: string) => ({
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
        "dark:bg-background-700 bg-background-200 p-4 rounded-lg my-10",
    },
  },

  blockquote: {
    component: ({ children }: { children: React.ReactElement }) => {
      const firstChild = React.Children.toArray(
        children,
      )[0] as React.ReactElement;
      const alertInfo = isAlert(firstChild as React.ReactElement);

      if (alertInfo) {
        const firstWord = firstChild.props.children[0];
        const restOfText = firstChild.props.children.slice(1);

        return (
          <blockquote
            style={{
              quotes: "none",
              borderLeft: `3px solid ${alertInfo.color}`,
            }}
          >
            <div className="flex gap-2 items-center h-6 -mb-3">
              <img
                className="w-5 h-auto"
                style={{ color: alertInfo.color }}
                src={alertInfo.imgPath}
                alt={alertInfo.text}
              />
              <span style={{ color: alertInfo.color }} className="">
                {firstWord}
              </span>
            </div>
            <div className="font-light text-base">{restOfText}</div>
          </blockquote>
        );
      }

      return (
        <blockquote
          style={{
            quotes: "none",
          }}
        >
          {children}
        </blockquote>
      );
    },
  },

  code: {
    props: {
      className:
        "dark:text-brand-300 dark:bg-background-700 bg-background-200 px-1.5 py-0.5 rounded-md font-mono before:content-[''] after:content-['']",
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
      className: `${fontSize === "small" ? "text-sm" : ""} my-4 font-light`,
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
      className: "text-blue-500 no-underline hover:underline break-words",
    },
  },

  span: {
    props: {
      className: fontSize === "small" ? "text-sm" : "",
    },
  },
});

function processMarkdown(markdown: string): string {
  const replacements = {
    "\\[!Tip\\]": "Dica",
    "\\[!Note\\]": "Informação",
    "\\[!Important\\]": "Importante",
    "\\[!Warning\\]": "Aviso",
    "\\[!Caution\\]": "Cuidado",
  };

  let processedMarkdown = markdown;

  for (const [key, value] of Object.entries(replacements)) {
    processedMarkdown = processedMarkdown.replace(new RegExp(key, "gi"), value);
  }

  return processedMarkdown;
}

export default function MarkdownRenderer({
  markdown,
  wrapperClasses = undefined,
  fontSize,
}: {
  markdown: string;
  wrapperClasses?: string;
  fontSize?: "small";
}) {
  const { colorMode } = useColorMode();
  const processedMarkdown = processMarkdown(markdown);
  return (
    <div
      className={`prose  dark:prose-invert prose-ul:ml-0 prose-h2:mb-2 ${
        wrapperClasses ?? ""
      } ${fontSize === "small" ? "lg:prose-base" : "lg:prose-lg"}`}
    >
      <Markdown
        options={{
          overrides: generateClassOverrides(colorMode, fontSize),
          slugify: (text) => slugify(text, { lower: true }),
        }}
      >
        {processedMarkdown}
      </Markdown>
    </div>
  );
}
