import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

export async function getPostBySlug(slug) {
  try {
    const post = await client.get({
      endpoint: "blogs",
      queries: { filters: `slug[equals]${slug}` },
    });
    return post.contents[0];
  } catch (err) {
    console.log("getPostBySlug", err);
  }
}

export async function getAllSlugs(limit = 100) {
  try {
    const slugs = await client.get({
      endpoint: "blogs",
      queries: { fields: "title,slug", orders: "-publishDate", limit: limit },
    });
    return slugs.contents;
  } catch (err) {
    console.log("getAllSlugs", err);
  }
}

export async function getAllPosts(limit = 100) {
  try {
    const posts = await client.get({
      endpoint: "blogs",
      queries: { fields: "title,slug,eyecatch", orders: "-publishDate", limit: limit },
    });
    return posts.contents;
  } catch (err) {
    console.log("getAllPosts", err);
  }
}

export async function getAllCatalogs(limit = 100) {
  try {
    const catalogs = await client.get({
      endpoint: "categories",
      queries: { fields: "name,id,slug", limit: limit },
    });
    return catalogs.contents;
  } catch (err) {
    console.log(/getAllCatalogs\n/, err);
  }
}

export async function getAllPostsByCategory(catID, limit = 100) {
  try {
    const posts = await client.get({
      endpoint: "blogs",
      queries: { filters: `categories[contains]${catID}`,
                  fields: "title,slug,eyecatch",
                  orders: "-publishDate",
                  limit: limit
                },
    });
    return posts.contents;
  } catch (err) {
    console.log("getAllPostsByCategory", err);
  }
}
