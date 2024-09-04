import React from "react";

import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";

import { Icons } from "@/components/editor/Icons";

import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";
import { AlignDropdownMenu } from "./align-dropdown-menu";
import { EmojiDropdownMenu } from "./emoji-dropdown-menu";

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <ToolbarGroup noSeparator>
            <TurnIntoDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup>
            <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
              <Icons.bold />
            </MarkToolbarButton>
            <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
              <Icons.italic />
            </MarkToolbarButton>
            <MarkToolbarButton
              nodeType={MARK_UNDERLINE}
              tooltip="Underline (⌘+U)"
            >
              <Icons.underline />
            </MarkToolbarButton>
            <AlignDropdownMenu />
            <EmojiDropdownMenu />
          </ToolbarGroup>
        </>
      )}
    </>
  );
}
