import React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"

const chatBubbleVariants = cva(
  "group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[70%]",
  {
    variants: {
      isUser: {
        true: "bg-neutral-900 dark:bg-neutral-50",
        false: "bg-neutral-100 dark:bg-neutral-800",
      },
      animation: {
        none: "",
        slide: "animate-in fade-in-0 duration-300",
        scale: "animate-in fade-in-0 zoom-in-75 duration-300",
        fade: "animate-in fade-in-0 duration-500",
      },
    },
    compoundVariants: [
      {
        isUser: true,
        animation: "slide",
        class: "slide-in-from-right",
      },
      {
        isUser: false,
        animation: "slide",
        class: "slide-in-from-left",
      },
      {
        isUser: true,
        animation: "scale",
        class: "origin-bottom-right",
      },
      {
        isUser: false,
        animation: "scale",
        class: "origin-bottom-left",
      },
    ],
  }
)

export const ChatMessage = ({
  role,
  content,
  createdAt,
  showTimeStamp = false,
  animation = "scale",
  actions,
}) => {
  const isUser = role === "user"

  const formattedTime = createdAt?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    (<div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div className={chatBubbleVariants({ isUser, animation })}>
        <div
          className={isUser ? "text-neutral-50 dark:text-neutral-900" : "text-neutral-950 dark:text-neutral-50"}>
          <MarkdownRenderer>{content}</MarkdownRenderer>
        </div>

        {role === "assistant" && actions ? (
          <div
            className="bg-white absolute -bottom-4 right-2 flex space-x-1 rounded-lg border border-neutral-200 p-1 opacity-0 transition-opacity group-hover/message:opacity-100 dark:bg-neutral-950 dark:border-neutral-800">
            {actions}
          </div>
        ) : null}
      </div>
      {showTimeStamp && createdAt ? (
        <span
          className={cn(
            "mt-1 block px-1 text-xs opacity-50",
            animation !== "none" && "animate-in fade-in-0 duration-500"
          )}>
          {formattedTime}
        </span>
      ) : null}
    </div>)
  );
}
