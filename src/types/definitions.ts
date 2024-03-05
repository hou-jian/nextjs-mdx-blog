export type ContentsType = "blog" | "projects";

export type ArticleType = {
  title: string; //文章标题
  description: string; //文章描述
  tags: string[]; //文章标签
  publishedOn: string; //发布时间
  lastUpdatedOn: string; //最后更新时间
  slug: string; //用于创建路由
};

export type ClassificationType = {
  title: string;
  content: ArticleType[];
};

export type TagsType = string[];

export type TOCItemType = {
  titleLevel: "h2" | "h3";
  href: string;
  value: string;
};
