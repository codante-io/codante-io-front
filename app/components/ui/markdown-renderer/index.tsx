import Markdown from "markdown-to-jsx";
import { Highlight, themes } from "prism-react-renderer";
import React, { type ReactElement } from "react";
import slugify from "slugify";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import { cn } from "~/lib/utils/cn";
import type { ColorMode } from "~/lib/utils/dark-mode";

const getCodeComponent =
  (colorMode: ColorMode) =>
  ({
    className,
    children,
  }: {
    className: string;
    children: ReactElement<{ children: string }>;
  }) => {
    const language = className
      ?.split(" ")
      ?.find((className) => className?.includes("lang-"))
      ?.replace("lang-", "");

    return (
      <Highlight
        theme={colorMode === "light" ? themes.nightOwlLight : themes.nightOwl}
        code={children?.props?.children?.trim()}
        language={language || "javascript"}
      >
        {({ tokens, getLineProps, getTokenProps }) => {
          return (
            <pre className={className}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          );
        }}
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

function isAlert(
  firstChild: React.ReactElement<{
    children: React.ReactNode[] | React.ReactNode;
  }>,
) {
  const children = Array.isArray(firstChild.props.children)
    ? firstChild.props.children
    : [firstChild.props.children];

  if (!children[0] || typeof children[0] !== "string") return false;

  if (children[0]?.startsWith("Dica"))
    return {
      color: "#22c55e",
      text: "Dica",
      imgPath: "/icons/bulb-icons.svg",
    };
  if (children[0]?.startsWith("Informação"))
    return {
      color: "#3b82f6",
      text: "Informação",
      imgPath: "/icons/info.svg",
    };
  if (children[0]?.startsWith("Importante"))
    return {
      color: "#a855f7",
      text: "Importante",
      imgPath: "/icons/icon-important.svg",
    };
  if (children[0]?.startsWith("Aviso"))
    return {
      color: "#fde047",
      text: "Aviso",
      imgPath: "/icons/warning.svg",
    };
  if (children[0].startsWith("Cuidado"))
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
      className: "dark:bg-background-700 bg-background-200 p-4 rounded-lg my-8",
    },
  },

  blockquote: {
    component: ({ children }: { children: React.ReactElement }) => {
      const firstChild = React.Children.toArray(
        children,
      )[0] as React.ReactElement<{ children: React.ReactNode[] }>;
      const alertInfo = isAlert(firstChild);

      if (alertInfo) {
        const firstWord = firstChild.props.children[0];
        const restOfText = firstChild.props.children
          .slice(1)
          .map((child: any) => {
            if (typeof child === "string") {
              return child
                .split("\n")
                .map((text, i) => (i > 0 ? [<br key={i} />, text] : text));
            }
            return child;
          })
          .flat();

        // if firstWord has a \n, brake it and take the first line
        const firstLine =
          typeof firstWord === "string" ? firstWord.split("\n")[0] : "";
        const restOfFirstLine =
          typeof firstWord === "string"
            ? firstWord
                .split("\n")
                .slice(1)
                .map((text, i) => (i > 0 ? [<br key={i} />, text] : text))
                .flat()
            : [];

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
              <span style={{ color: alertInfo.color }} className="mt-0">
                {firstLine}
              </span>
            </div>
            {restOfFirstLine.length > 0 && (
              <div className="font-light text-base mt-0">{restOfFirstLine}</div>
            )}
            <div className="font-light text-base mt-0">{restOfText}</div>
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
        "dark:text-background-400 dark:bg-background-800 bg-background-200 border dark:border-background-700 border-background-200 px-1.5 py-0.5 rounded-md font-mono before:content-[''] after:content-['']",
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
      className: "",
    },
  },

  p: {
    props: {
      className: `${fontSize === "small" ? "text-sm" : ""}  font-light`,
    },
  },

  ul: {
    props: {
      className: "",
    },
  },

  li: {
    props: {
      className: "",
    },
  },

  a: {
    props: {
      className: "no-underline hover:underline break-words",
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
  prose = true,
}: {
  markdown: string;
  wrapperClasses?: string;
  fontSize?: "small";
  prose?: boolean;
}) {
  const { colorMode } = useColorMode();
  const processedMarkdown = processMarkdown(markdown);
  return (
    <div
      className={cn(
        "relative",
        prose && "prose dark:prose-invert prose-h2:mb-2",
        fontSize === "small" ? "lg:prose-base" : "lg:prose-lg",
        wrapperClasses,
      )}
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
