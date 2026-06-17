import { sanityClient, isSanityConfigured } from "./client";
import { mockProducts, Product } from "../mockProducts";

export async function getAllProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) {
    return mockProducts;
  }

  try {
    const query = `*[_type == "product"] | order(name asc) {
      name,
      "slug": slug.current,
      tagline,
      description,
      iconName,
      category,
      badge,
      color,
      roiTitle,
      roiDesc,
      roiMetric,
      videoUrl,
      features,
      integrations,
      specs
    }`;
    const products = await sanityClient.fetch(query);
    if (!products || products.length === 0) {
      return mockProducts;
    }
    return products;
  } catch (error) {
    console.error("Sanity product fetch error, falling back to mock:", error);
    return mockProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured()) {
    return mockProducts.find((p) => p.slug === slug) || null;
  }

  try {
    const query = `*[_type == "product" && slug.current == $slug][0] {
      name,
      "slug": slug.current,
      tagline,
      description,
      iconName,
      category,
      badge,
      color,
      roiTitle,
      roiDesc,
      roiMetric,
      videoUrl,
      features,
      integrations,
      specs
    }`;
    const product = await sanityClient.fetch(query, { slug });
    if (!product) {
      return mockProducts.find((p) => p.slug === slug) || null;
    }
    return product;
  } catch (error) {
    console.error(`Sanity product fetch error for slug "${slug}", falling back to mock:`, error);
    return mockProducts.find((p) => p.slug === slug) || null;
  }
}
