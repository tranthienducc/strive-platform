"use client";

import { useCallback } from "react";
import { Button } from "../ui/button";
import { ToggleGroup } from "../ui/toggle-group";
import {
  CodeSandboxLogoIcon,
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import {
  Code,
  ImageIcon,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

const MenuBar = ({ editor }: any) => {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    <div className="flex gap-3 flex-wrap justify-center items-center border rounded px-2 py-2 mb-6 w-full">
      <ToggleGroup
        type="multiple"
        className="w-full flex justify-start items-center"
      >
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
          value="image"
          aria-label="Upload image"
          onClick={addImage}
        >
          <ImageIcon className="h-4 w-4" />
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
          value="paragraph"
          aria-label="Toggle paragraph"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setParagraph().run();
          }}
        >
          <div className="h-4 w-4">P</div>
        </Button>
        <Button
          variant="ghost"
          value="strike"
          aria-label="Toggle strikethrough"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          value="code"
          aria-label="Toggle code"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          value="h1"
          aria-label="Toggle heading level 1"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          h1
        </Button>
        <Button
          variant="ghost"
          value="h2"
          aria-label="Toggle heading level 2"
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          h2
        </Button>
        <Button
          variant="ghost"
          value="h3"
          aria-label="Toggle heading level 3"
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          h3
        </Button>
        <Button
          variant="ghost"
          value="bullet-list"
          aria-label="Toggle bullet list"
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <ListBulletIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          value="ordered-list"
          aria-label="Toggle ordered list"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          value="code-block"
          aria-label="Toggle code block"
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleCodeBlock().run();
          }}
        >
          <CodeSandboxLogoIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          value="blockquote"
          aria-label="Toggle blockquote"
          onClick={(e) => {
            e.preventDefault();

            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          value="undo"
          aria-label="Undo"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          value="redo"
          aria-label="Redo"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </ToggleGroup>
    </div>
  );
};

export default MenuBar;
