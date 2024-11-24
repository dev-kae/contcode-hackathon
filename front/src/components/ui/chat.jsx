import { forwardRef, useState } from "react";
import { ArrowDown, ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";

export function Chat({
  messages,
  handleSubmit,
  input,
  handleInputChange,
  stop,
  isGenerating,
  append,
  suggestions,
  className,
  onRateResponse,
  handleSubmitCustom,
  style,
}) {
  const lastMessage = messages.at(-1);
  const isEmpty = messages.length === 0;
  const isTyping = lastMessage?.role === "user";

  return (
    <ChatContainer className={className} style={style}>
      {isEmpty && append && suggestions ? (
        <PromptSuggestions
          label="Conte sua ideia ✨"
          append={append}
          suggestions={suggestions}
        />
      ) : null}
      {messages.length > 0 ? (
        <ChatMessages messages={messages}>
          <MessageList
            messages={messages}
            isTyping={isTyping}
            messageOptions={(message) => ({
              actions: onRateResponse ? (
                <>
                  <div className="border-r pr-1">
                    <CopyButton
                      content={message.content}
                      copyMessage="Copiado!"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => onRateResponse(message.id, "thumbs-up")}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => onRateResponse(message.id, "thumbs-down")}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <CopyButton content={message.content} copyMessage="Copiado!" />
              ),
            })}
          />
        </ChatMessages>
      ) : null}
      <ChatForm
        className="mt-auto"
        isPending={isGenerating || isTyping}
        handleSubmit={handleSubmit}
        handleSubmitCustom={handleSubmitCustom}
      >
        {({ files, setFiles }) => (
          <MessageInput
            value={input}
            onChange={handleInputChange}
            allowAttachments
            files={files}
            setFiles={setFiles}
            stop={stop}
            isGenerating={isGenerating}
          />
        )}
      </ChatForm>
    </ChatContainer>
  );
}
Chat.displayName = "Chat";

export function ChatMessages({ messages, children }) {
  const { scrollToBottom, handleScroll, shouldAutoScroll, handleTouchStart } =
    useAutoScroll([messages]);

  return (
    <div
      className="relative overflow-y-auto pb-4"
      style={{ maxHeight: "50vh" }}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
    >
      {children}
      {!shouldAutoScroll && (
        <div className="sticky bottom-0 left-0 flex w-full justify-end">
          <Button
            onClick={scrollToBottom}
            className="h-8 w-8 rounded-full ease-in-out animate-in fade-in-0 slide-in-from-bottom-1"
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export const ChatContainer = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("grid max-h-full w-full grid-rows-[1fr_auto]", className)}
      {...props}
    />
  );
});
ChatContainer.displayName = "ChatContainer";

export const ChatForm = forwardRef(
  (
    { children, handleSubmit, isPending, className, handleSubmitCustom },
    ref
  ) => {
    const [files, setFiles] = useState(null);

    const onSubmit = (event) => {
      if (isPending) {
        return;
      }
      event.preventDefault();

      if (!files) {
        let textareaInput = document.getElementById("textareaInput");

        handleSubmitCustom(textareaInput.value);
        // handleSubmit(event);
        return;
      }

      const fileList = createFileList(files);
      handleSubmit(event, { experimental_attachments: fileList });
      setFiles(null);
    };

    return (
      <form ref={ref} onSubmit={onSubmit} className={className}>
        {children({ files, setFiles })}
      </form>
    );
  }
);
ChatForm.displayName = "ChatForm";

function createFileList(files) {
  const dataTransfer = new DataTransfer();
  for (const file of Array.from(files)) {
    dataTransfer.items.add(file);
  }
  return dataTransfer.files;
}
