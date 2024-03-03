import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";

import { ArticleType, ContentsType } from "@/types/definitions";

const contentsDirectory = path.join(process.cwd(), "src/contents/");
const componentsDirectory = path.join(process.cwd(), "src/contents/components-mdx/");

/**
 *
 * @param type 页面分类。如：blog、projects。与路由、'/src/contents' 保持一致
 * @param slug 文章的唯一标识符，在 mdx 文件元数据中的指定。
 * @returns
 */
export async function getFileBySlug(type: ContentsType, slug: string) {
  const filePath = path.join(contentsDirectory, type, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8").trim();
  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: componentsDirectory,
  });
  return {
    code,
    frontmatter: frontmatter as ArticleType,
  };
}
