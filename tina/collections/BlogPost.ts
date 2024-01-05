import { Collection } from "@tinacms/cli";

const BlogPost: Collection = {
  name: "post",
  label: "Blog Posts",
  path: "data/blog",
  format: "mdx",
  defaultItem: () => {
    return {
      date: new Date().toISOString(),
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      label: "Date",
      name: "date",
      type: "datetime",
      required: true,
    },
    {
      label: "Last Modified",
      name: "lastmod",
      type: "datetime",
    },
    {
      type: "string",
      name: "summary",
      label: "Summary",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
    {
      label: "Tags",
      name: "tags",
      type: "string",
      list: true,
    },
  ]
};

export default BlogPost;