// mdx-bundler 当前版本不支持 Server component，所以提取出来作为客户端组件
"use client";
import React from "react";
import { getMDXComponent } from "mdx-bundler/client";

export default function MDXComponent({ code }: { code: string }) {
  const MDXComponent = React.useMemo(() => getMDXComponent(code), [code]);
  return <MDXComponent />;
}
