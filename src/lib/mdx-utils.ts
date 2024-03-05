import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeTOC, { HtmlElementNode } from "@jsdevtools/rehype-toc";

import { ArticleType, ContentsType, TocDataType } from "@/types/definitions";

const contentsDirectory = path.join(process.cwd(), "src/contents/");
const componentsDirectory = path.join(process.cwd(), "src/contents/components-mdx/");

/**
 *
 * @param type 页面分类 如：blog、projects。与路由、'/src/contents' 保持一致
 * @param slug 文章的唯一标识符 在 mdx 文件元数据中的指定。
 */
export async function getFileBySlug(type: ContentsType, slug: string) {
  let tocData: unknown;

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
            customizeTOC: function (toc: HtmlElementNode) {
              try {
                tocData = cleanTocData(toc);
              } catch (error) {
                console.error("tocData 异常，是否更新了 rehypeTOC 插件？", error);
              }
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
    frontmatter: frontmatter as ArticleType | undefined,
    tocData: tocData as TocDataType | undefined,
  };
}

// 当前版本的 HtmlElementNode 类型声明中 children 部分有问题，也许是插件版本的原因。这里用any代替一下
function buildTocItems(children: any): TocDataType[] {
  if (!children) return [];
  return children.map((item: any) => {
    if (item.type === "text") {
      return {
        type: item.type,
        tagName: "text",
        value: item.value,
      };
    }
    if (item.type === "element") {
      return {
        type: item.type,
        tagName: item.tagName,
        properties: item.properties,
        children: buildTocItems(item.children),
      };
    }
  });
}

function cleanTocData(toc: HtmlElementNode): TocDataType {
  return {
    type: toc.type,
    tagName: toc.tagName,
    properties: toc.properties,
    children: buildTocItems(toc.children),
  };
}
