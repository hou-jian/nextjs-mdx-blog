import React from "react";
import { TOCItemType } from "@/types/definitions";

function buildTocJSX(tocItemsArr: TOCItemType[]) {
  return (
    <nav className="flex flex-col">
      {tocItemsArr.map((item) => (
        <a href={item.href} key={item.href} className={item.titleLevel === "h3" ? " pl-2" : ""}>
          {item.value}
        </a>
      ))}
    </nav>
  );
}

export default function TOC({ tocItemsArr }: { tocItemsArr: TOCItemType[] }) {
  return (
    <aside>
      <h2>目录</h2>
      {buildTocJSX(tocItemsArr)}
    </aside>
  );
}
