import React from "react";

import { cn, withRef } from "@udecode/cn";
import { PlateElement, withHOC } from "@udecode/plate-common";
import { ELEMENT_IMAGE, Image, useMediaState } from "@udecode/plate-media";
import { ResizableProvider } from "@udecode/plate-resizable";

import { MediaPopover } from "./media-popover";

export const ImageElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ children, className, nodeProps, ...props }, ref) => {
      const { focused, selected } = useMediaState();

      return (
        <MediaPopover pluginKey={ELEMENT_IMAGE}>
          <PlateElement
            className={cn("py-2.5", className)}
            ref={ref}
            {...props}
          >
            <figure className="group relative m-0" contentEditable={false}>
              <Image
                alt=""
                className={cn(
                  "block w-full max-w-full cursor-pointer object-cover px-0",
                  "rounded-sm",
                  focused && selected && "ring-2 ring-ring ring-offset-2"
                )}
                {...nodeProps}
              />
            </figure>

            {children}
          </PlateElement>
        </MediaPopover>
      );
    }
  )
);
