import React, { Suspense } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/ui/copy-button"

export function MarkdownRenderer({
  children
}) {
  return (
    (<Markdown remarkPlugins={[remarkGfm]} components={COMPONENTS} className="space-y-3">
      {children}
    </Markdown>)
  );
}

const HighlightedPre = React.memo(async ({
  children,
  language,
  ...props
}) => {
  const { codeToTokens, bundledLanguages } = await import("shiki")

  if (!(language in bundledLanguages)) {
    return <pre {...props}>{children}</pre>;
  }

  const { tokens } = await codeToTokens(children, {
    lang: language,
    defaultColor: false,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })

  return (
    (<pre {...props}>
      <code>
        {tokens.map((line, lineIndex) => (
          <>
            <span key={lineIndex}>
              {line.map((token, tokenIndex) => {
                const style =
                  typeof token.htmlStyle === "string"
                    ? undefined
                    : token.htmlStyle

                return (
                  (<span
                    key={tokenIndex}
                    className="text-shiki-light bg-shiki-light-bg dark:text-shiki-dark dark:bg-shiki-dark-bg"
                    style={style}>
                    {token.content}
                  </span>)
                );
              })}
            </span>
            {lineIndex !== tokens.length - 1 && "\n"}
          </>
        ))}
      </code>
    </pre>)
  );
})
HighlightedPre.displayName = "HighlightedCode"

const CodeBlock = ({
  children,
  className,
  language,
  ...restProps
}) => {
  const code =
    typeof children === "string"
      ? children
      : childrenTakeAllStringContents(children)

  const preClass = cn(
    "overflow-x-scroll rounded-md border border-neutral-200 bg-white/50 p-4 font-mono text-sm [scrollbar-width:none] dark:border-neutral-800 dark:bg-neutral-950/50",
    className
  )

  return (
    (<div className="group/code relative mb-4">
      <Suspense
        fallback={
          <pre className={preClass} {...restProps}>
            {children}
          </pre>
        }>
        <HighlightedPre language={language} className={preClass}>
          {code}
        </HighlightedPre>
      </Suspense>
      <div
        className="invisible absolute right-2 top-2 flex space-x-1 rounded-lg p-1 opacity-0 transition-all duration-200 group-hover/code:visible group-hover/code:opacity-100">
        <CopyButton content={code} copyMessage="Copied code to clipboard" />
      </div>
    </div>)
  );
}

function childrenTakeAllStringContents(element) {
  if (typeof element === "string") {
    return element
  }

  if (element?.props?.children) {
    let children = element.props.children

    if (Array.isArray(children)) {
      return children
        .map((child) => childrenTakeAllStringContents(child))
        .join("");
    } else {
      return childrenTakeAllStringContents(children);
    }
  }

  return ""
}

const COMPONENTS = {
  h1: withClass("h1", "text-2xl font-semibold"),
  h2: withClass("h2", "font-semibold text-xl"),
  h3: withClass("h3", "font-semibold text-lg"),
  h4: withClass("h4", "font-semibold text-base"),
  h5: withClass("h5", "font-medium"),
  strong: withClass("strong", "font-semibold"),
  a: withClass("a", "text-neutral-900 underline underline-offset-2 dark:text-neutral-50"),
  blockquote: withClass("blockquote", "border-l-2 border-neutral-900 pl-4 dark:border-neutral-50"),
  code: ({
    children,
    className,
    node,
    ...rest
  }) => {
    const match = /language-(\w+)/.exec(className || "")
    return match ? (
      <CodeBlock className={className} language={match[1]} {...rest}>
        {children}
      </CodeBlock>
    ) : (
      <code
        className={cn(
          "font-mono [:not(pre)>&]:rounded-md [:not(pre)>&]:bg-white/50 [:not(pre)>&]:px-1 [:not(pre)>&]:py-0.5 dark:[:not(pre)>&]:bg-neutral-950/50"
        )}
        {...rest}>
        {children}
      </code>
    );
  },
  pre: ({
    children
  }) => children,
  ol: withClass("ol", "list-decimal space-y-2 pl-6"),
  ul: withClass("ul", "list-disc space-y-2 pl-6"),
  li: withClass("li", "my-1.5"),
  table: withClass(
    "table",
    "w-full border-collapse overflow-y-auto rounded-md border border-neutral-200 border-neutral-950/20 dark:border-neutral-800 dark:border-neutral-50/20"
  ),
  th: withClass(
    "th",
    "border border-neutral-950/20 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right dark:border-neutral-50/20"
  ),
  td: withClass(
    "td",
    "border border-neutral-950/20 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right dark:border-neutral-50/20"
  ),
  tr: withClass("tr", "m-0 border-t p-0 even:bg-neutral-100 dark:even:bg-neutral-800"),
  p: withClass("p", "whitespace-pre-wrap"),
  hr: withClass("hr", "border-neutral-950/20 dark:border-neutral-50/20"),
}

function withClass(Tag, classes) {
  const Component = ({
    node,
    ...props
  }) => (
    <Tag className={classes} {...props} />
  )
  Component.displayName = Tag
  return Component
}

export default MarkdownRenderer