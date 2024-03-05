import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeTOC from "@jsdevtools/rehype-toc";

import { ArticleType, ContentsType, TOCItemType } from "@/types/definitions";

const contentsDirectory = path.join(process.cwd(), "src/contents/");
const componentsDirectory = path.join(process.cwd(), "src/contents/components-mdx/");

/**
 *
 * @param type 页面分类 如：blog、projects。与路由、'/src/contents' 保持一致
 * @param slug 文章的唯一标识符 在 mdx 文件元数据中的指定。
 */
export async function getFileBySlug(type: ContentsType, slug: string) {
  const tocItemsArr: unknown[] = [];

  const filePath = path.join(contentsDirectory, type, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8").trim();

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
            // heading 是 HtmlElementNode 类型，其 children 属性类型标注有误，这里用 any 临时解决
            customizeTOCItem: function (toc: unknown, heading: any) {
              tocItemsArr.push({
                titleLevel: heading.tagName,
                href: heading.children[0].properties.href,
                value: heading.children[1].value,
              });
            },
            customizeTOC: function (toc: unknown) {
              return false; //阻止 toc 直接渲染到文章，我们自行处理
            },
          },
        ],
      ];
      return options;
    },
  });
  return {
    code,
    frontmatter: frontmatter as ArticleType | undefined,
    tocItemsArr: tocItemsArr as TOCItemType[],
  };
}
