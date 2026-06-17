import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/sanity/products";
import EditProductForm from "./EditProductForm";

interface EditProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return <EditProductForm product={product} />;
}
