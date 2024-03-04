import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeTOC, { HtmlElementNode } from "@jsdevtools/rehype-toc";

import { ArticleType, ContentsType } from "@/types/definitions";

const contentsDirectory = path.join(process.cwd(), "src/contents/");
const componentsDirectory = path.join(process.cwd(), "src/contents/components-mdx/");

/**
 *
 * @param type 页面分类 如：blog、projects。与路由、'/src/contents' 保持一致
 * @param slug 文章的唯一标识符 在 mdx 文件元数据中的指定。
 * @returns
 */
export async function getFileBySlug(type: ContentsType, slug: string) {
  const filePath = path.join(contentsDirectory, type, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8").trim();

  let tocData: unknown;
  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: componentsDirectory,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["hash-anchor"],
            },
          },
        ],
        [
          rehypeTOC,
          {
            headings: ["h2", "h3"],
            customizeTOC: function (toc: HtmlElementNode) {
              tocData = toc;
              return false; //阻止直接添加到页面，我们自己处理。
            },
          },
        ],
      ];
      return options;
    },
  });

  return {
    code,
    frontmatter: frontmatter as ArticleType,
    tocData: tocData as HtmlElementNode,
  };
}
