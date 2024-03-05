import React, { DOMElement, createElement } from "react";
import { TocDataTextType, TocDataType } from "@/types/definitions";

function buildTocItems(
  itemArr: Array<TocDataType | TocDataTextType> | undefined,
): (string | DOMElement<{ [prop: string]: string | undefined }, Element> | undefined)[] {
  if (!itemArr || itemArr.length < 1) return [];
  return itemArr.map((item) => {
    if (item.type === "text") {
      return item.value;
    }
    if (item.type === "element") {
      return createElement(item.tagName, item.properties, ...buildTocItems(item.children));
    }
  });
}

export default function TOC({ tocData }: { tocData: TocDataType }) {
  return (
    <aside>
      <h2>目录</h2>
      <nav>{buildTocItems(tocData?.children)}</nav>
    </aside>
  );
}
