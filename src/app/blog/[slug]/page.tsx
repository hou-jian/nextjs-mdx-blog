import React from "react";
import { getFileBySlug } from "@/lib/mdx";
import MDXComponent from "@/components/MDXComponent";

export default async function Blog({ params }: { params: { slug: string } }) {
  const { code, frontmatter } = await getFileBySlug("blog", params.slug);
  return (
    <main>
      <time>{frontmatter.publishedOn}</time>
      {frontmatter.tags.map((item) => (
        <span key={item}>{item}</span>
      ))}
      <article>
        <MDXComponent code={code} />
      </article>
    </main>
  );
}
