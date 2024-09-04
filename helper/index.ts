import { api } from "@/convex/_generated/api";
import { OrdersInpirationType } from "@/utils/types/type";
import { TNode } from "@udecode/plate-common";
import { useQuery } from "convex/react";
import TurndownService from "turndown";

export const genarateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const serializeToHtml = (nodes: TNode[]): string => {
  return nodes
    .map((node) => {
      // Xử lý nếu node có children
      if (Array.isArray(node.children)) {
        const content = node.children
          .map((child) => {
            if (typeof child.text === "string") {
              // Xử lý thuộc tính bold và italic
              let text = child.text;
              if (child.bold) {
                text = `<strong>${text}</strong>`;
              }
              if (child.italic) {
                text = `<em>${text}</em>`;
              }
              return text;
            }
            return "";
          })
          .join("");

        // Xử lý các loại node cụ thể
        let html = "";
        if (node.type === "p") {
          // Thêm thuộc tính căn chỉnh cho đoạn văn
          const align = node.align ? `text-align: ${node.align};` : "";
          html = `<p style="${align}">${content}</p>`;
        } else if (node.type === "heading-one") {
          // Xử lý tiêu đề cấp 1 với fontSize
          const fontSize = node.fontSize ? `font-size: ${node.fontSize};` : "";
          const fontWeight = node.fontWeight
            ? `font-weight: ${node.fontWeight};`
            : "";
          html = `<h1 style="${fontSize};${fontWeight}">${content}</h1>`;
        } else if (node.type === "heading-two") {
          const fontSize = node.fontSize ? `font-size: ${node.fontSize};` : "";
          html = `<h2 style="${fontSize}">${content}</h2>`;
        } else if (node.type === "heading-three") {
          const fontSize = node.fontSize ? `font-size: ${node.fontSize};` : "";
          html = `<h3 style="${fontSize}">${content}</h3>`;
        } else if (node.type === "heading-four") {
          const fontSize = node.fontSize ? `font-size: ${node.fontSize};` : "";
          html = `<h4 style="${fontSize}">${content}</h4>`;
        } else if (node.type === "heading-five") {
          const fontSize = node.fontSize ? `font-size: ${node.fontSize};` : "";
          html = `<h5 style="${fontSize}">${content}</h5>`;
        } else if (node.type === "heading-six") {
          const fontSize = node.fontSize ? `font-size: ${node.fontSize};` : "";
          html = `<h6 style="${fontSize}">${content}</h6>`;
        } else {
          html = content;
        }

        return html;
      }
      return "";
    })
    .join(""); // Gộp các chuỗi HTML lại với nhau
};
export const parseMarkDown = (html: string | undefined) => {
  if (!html || typeof html !== "string") {
    return "";
  }

  const result = new TurndownService();

  const markdown = result?.turndown(html);

  return markdown;
};

export const genarateCodeRandom = (length: number) => {
  const codeRegex = "123456789ABCDEFGHIJKLMNOPQRSUVWXZY";
  let results = "";
  const charactersLength = codeRegex.length;

  for (let i = 0; i < length; i++) {
    results += codeRegex.charAt(Math.floor(Math.random() * charactersLength));
  }
  return results;
};

export const convertFileToBlob = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const blob = new Blob([reader.result]);
        resolve(blob);
      } else {
        reject(new Error("Failed to convert file to Blob"));
      }
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    };
  });
};

export default async function useOrdersInspiration() {
  const data = useQuery(
    api.documents.getOrdersInspiration
  ) as OrdersInpirationType[];
  return data;
}
