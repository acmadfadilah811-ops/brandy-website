import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/sanity/blog";
import { getAllProducts } from "@/lib/sanity/products";
import { BlogPost } from "@/lib/mockBlog";
import { Product } from "@/lib/mockProducts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://brandy.id";

  // Static marketing routes
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/pricing",
    "/contact",
    "/demo",
    "/blog",
    "/customers",
    "/integrations",
    "/careers",
    "/legal/privacy",
    "/legal/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch blogs dynamic routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getAllBlogPosts();
    blogRoutes = blogs.map((post: BlogPost) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Failed to fetch blog routes for sitemap", e);
  }

  // Fetch products dynamic routes
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productRoutes = products.map((prod: Product) => ({
      url: `${baseUrl}/products/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Failed to fetch product routes for sitemap", e);
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
