import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, FileIcon, Paperclip, Square, X } from "lucide-react";
import { omit } from "remeda";

import { cn } from "@/lib/utils";
import { useAutosizeTextArea } from "@/hooks/use-autosize-textarea";
import { Button } from "@/components/ui/button";

export function MessageInput({
  placeholder = "Escreva aqui...",
  className,
  onKeyDown: onKeyDownProp,
  submitOnEnter = true,
  stop,
  isGenerating,
  ...props
}) {
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (files) => {
    if (props.allowAttachments) {
      props.setFiles((currentFiles) => {
        if (currentFiles === null) {
          return files;
        }

        if (files === null) {
          return currentFiles;
        }

        return [...currentFiles, ...files];
      });
    }
  };

  const onDragOver = (event) => {
    if (props.allowAttachments !== true) return;
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event) => {
    if (props.allowAttachments !== true) return;
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event) => {
    setIsDragging(false);
    if (props.allowAttachments !== true) return;
    event.preventDefault();
    const dataTransfer = event.dataTransfer;
    if (dataTransfer.files.length) {
      addFiles(Array.from(dataTransfer.files));
    }
  };

  const onPaste = (event) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    const files = Array.from(items)
      .map((item) => item.getAsFile())
      .filter((file) => file !== null);

    if (props.allowAttachments && files.length > 0) {
      addFiles(files);
    }
  };

  const onKeyDown = (event) => {
    if (submitOnEnter && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }

    onKeyDownProp?.(event);
  };

  const textAreaRef = useRef(null);

  const showFileList =
    props.allowAttachments && props.files && props.files.length > 0;

  useAutosizeTextArea({
    ref: textAreaRef,
    maxHeight: 300,
    borderWidth: 1,
    dependencies: [props.value, showFileList],
  });

  return (
    <div
      className="relative flex w-full"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{ overflowY: "hidden" }}
    >
      <textarea
        aria-label="Write your prompt here"
        placeholder={placeholder}
        ref={textAreaRef}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        id="textareaInput"
        className={cn(
          "w-full grow resize-none rounded-xl border border-neutral-200 bg-white p-3 pr-24 text-sm ring-offset-white transition-[border] placeholder:text-neutral-500 focus-visible:border-neutral-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:border-neutral-50",
          showFileList && "pb-16",
          className
        )}
        {...(props.allowAttachments
          ? omit(props, ["allowAttachments", "files", "setFiles"])
          : omit(props, ["allowAttachments"]))}
      />

      <div className="absolute right-3 top-3 flex gap-2">
        {isGenerating && stop ? (
          <Button
            type="button"
            size="icon"
            className="h-8 w-8"
            aria-label="Stop generating"
            onClick={stop}
          >
            <Square className="h-3 w-3 animate-pulse" fill="currentColor" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            className="h-8 w-8 transition-opacity"
            aria-label="Send message"
            disabled={props.value === "" || isGenerating}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
      {props.allowAttachments && <FileUploadOverlay isDragging={isDragging} />}
    </div>
  );
}
MessageInput.displayName = "MessageInput";

function FileUploadOverlay({ isDragging }) {
  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center space-x-2 rounded-xl border border-neutral-200 border-dashed bg-white text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <Paperclip className="h-4 w-4" />
          <span>Drop your files here to attach them.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const FilePreview = React.forwardRef((props, ref) => {
  if (props.file.type.startsWith("image/")) {
    return <ImageFilePreview {...props} ref={ref} />;
  }

  return <GenericFilePreview {...props} ref={ref} />;
});
FilePreview.displayName = "FilePreview";

const ImageFilePreview = React.forwardRef(({ file, onRemove }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="relative flex max-w-[200px] rounded-md border border-neutral-200 p-1.5 pr-2 text-xs dark:border-neutral-800"
      layout
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
    >
      <div className="flex w-full items-center space-x-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={`Attachment ${file.name}`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-neutral-200 bg-neutral-100 object-cover dark:border-neutral-800 dark:bg-neutral-800"
          src={URL.createObjectURL(file)}
        />
        <span className="w-full truncate text-neutral-500 dark:text-neutral-400">
          {file.name}
        </span>
      </div>
      <button
        className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
        type="button"
        onClick={onRemove}
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </motion.div>
  );
});
ImageFilePreview.displayName = "ImageFilePreview";

const GenericFilePreview = React.forwardRef(({ file, onRemove }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="relative flex max-w-[200px] rounded-md border border-neutral-200 p-1.5 pr-2 text-xs dark:border-neutral-800"
      layout
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
    >
      <div className="flex w-full items-center space-x-2">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
          <FileIcon className="h-6 w-6 text-neutral-950 dark:text-neutral-50" />
        </div>
        <span className="w-full truncate text-neutral-500 dark:text-neutral-400">
          {file.name}
        </span>
      </div>
      <button
        className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
        type="button"
        onClick={onRemove}
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </motion.div>
  );
});
GenericFilePreview.displayName = "GenericFilePreview";

function showFileUploadDialog() {
  const input = document.createElement("input");

  input.type = "file";
  input.multiple = true;
  input.accept = "*/*";
  input.click();

  return new Promise((resolve) => {
    input.onchange = (e) => {
      const files = e.currentTarget.files;

      if (files) {
        resolve(Array.from(files));
        return;
      }

      resolve(null);
    };
  });
}
