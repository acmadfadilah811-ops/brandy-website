import { sanityClient, isSanityConfigured } from "./client";
import { mockBlogPosts, BlogPost } from "../mockBlog";

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) {
    return mockBlogPosts;
  }

  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      author->{
        name,
        role,
        "image": image.asset->url,
        bio
      },
      publishedAt,
      readTime,
      "thumbnail": mainImage.asset->url,
      excerpt,
      category,
      tags,
      body,
      seoTitle,
      seoDesc
    }`;
    const posts = await sanityClient.fetch(query);
    if (!posts || posts.length === 0) {
      return mockBlogPosts;
    }
    return posts;
  } catch (error) {
    console.error("Sanity fetch error, falling back to mock posts:", error);
    return mockBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured()) {
    return mockBlogPosts.find((p) => p.slug === slug) || null;
  }

  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      author->{
        name,
        role,
        "image": image.asset->url,
        bio
      },
      publishedAt,
      readTime,
      "thumbnail": mainImage.asset->url,
      excerpt,
      category,
      tags,
      body,
      seoTitle,
      seoDesc
    }`;
    const post = await sanityClient.fetch(query, { slug });
    if (!post) {
      return mockBlogPosts.find((p) => p.slug === slug) || null;
    }
    return post;
  } catch (error) {
    console.error(`Sanity fetch error for slug "${slug}", falling back to mock:`, error);
    return mockBlogPosts.find((p) => p.slug === slug) || null;
  }
}
