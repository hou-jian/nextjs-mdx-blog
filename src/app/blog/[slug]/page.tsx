import React from "react";
import { getFileBySlug } from "@/lib/mdx-utils";
import MDXComponent from "@/components/MDXComponent";
import TOC from "@/components/TOC";

export default async function Blog({ params }: { params: { slug: string } }) {
  const { code, frontmatter, tocItemsArr } = await getFileBySlug("blog", params.slug);
  return (
    <main>
      <time>{frontmatter?.publishedOn}</time>
      <hr />
      <TOC tocItemsArr={tocItemsArr} />
      <hr />
      <article>
        <MDXComponent code={code} />
      </article>
    </main>
  );
}
