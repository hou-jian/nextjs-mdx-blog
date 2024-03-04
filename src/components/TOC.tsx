"use client";
import React, { createElement } from "react";
import { HtmlElementNode } from "@jsdevtools/rehype-toc";

type Props = {
  tocData: HtmlElementNode;
};

function buildItem(itemArr: []): any {
  if (!itemArr || itemArr.length < 1) return;
  return itemArr.map((item: any) => {
    if (item.type === "text") {
      return item.value;
    }
    if (item.type === "element") {
      return createElement(item.tagName, item.properties, ...buildItem(item.children));
    }
  });
}

/* 
  TODO:当前版本的 HtmlElementNode 类型写的有问题
  其中的 `children?: Node[];` 实际上不一定是 Node (import { Node } from "unist")
  可能还是 HtmlElementNode，只有 type === 'text' 才是 Node.
  这里暂时用 any。接下来在 mdx-utils.ts 中清洗一下数据，方便这里使用。
*/
function buildTOC(tocData: any) {
  return createElement(tocData.tagName, tocData.properties, ...buildItem(tocData.children));
}

export default function TOC({ tocData }: Props) {
  return (
    <aside>
      <h2>目录</h2>
      {buildTOC(tocData)}
    </aside>
  );
}
