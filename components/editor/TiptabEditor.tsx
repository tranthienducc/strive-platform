"use client";
import React, { useCallback } from "react";
import MenuBar from "./MenuBar";
import { BubbleMenu, EditorContent } from "@tiptap/react";
import { Card } from "../ui/card";
import { ToggleGroup } from "../ui/toggle-group";
import { Button } from "../ui/button";
import { FontBoldIcon, FontItalicIcon, Link1Icon } from "@radix-ui/react-icons";
import { ImageIcon, Unlink } from "lucide-react";
import { cn } from "@/lib/utils";

const TiptabEditor = ({
  editor,
  className,
  isShowMenuBar,
}: {
  editor: any;
  isShowMenuBar?: boolean;
  className?: string;
}) => {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  return (
    <>
      {isShowMenuBar ? <MenuBar editor={editor} /> : null}
      <BubbleMenu editor={editor!} tippyOptions={{ duration: 100 }}>
        <Card className="w-full p-2">
          <ToggleGroup type="multiple">
            <Button
              variant="ghost"
              value="bold"
              aria-label="Toggle bold"
              onClick={(e) => {
                e.preventDefault();
                editor?.chain()?.focus()?.toggleBold()?.run();
              }}
            >
              <FontBoldIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              value="italic"
              aria-label="Toggle italic"
              onClick={(e) => {
                e.preventDefault();
                editor?.chain().focus().toggleItalic().run();
              }}
            >
              <FontItalicIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              value="image"
              aria-label="Upload image"
              onClick={addImage}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              value="link"
              aria-label="Toggle strikethrough"
              onClick={setLink}
            >
              <Link1Icon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              value="link"
              aria-label="Toggle strikethrough"
              onClick={(e) => {
                e.preventDefault();
                editor?.chain().focus().unsetLink().run();
              }}
            >
              <Unlink className="h-4 w-4" />
            </Button>
          </ToggleGroup>
        </Card>
      </BubbleMenu>
      <div className="tiptab-editor text-white">
        <EditorContent
          className={cn("min-h-[55vh] h-full ", className)}
          editor={editor}
        />
      </div>
    </>
  );
};

export default TiptabEditor;
