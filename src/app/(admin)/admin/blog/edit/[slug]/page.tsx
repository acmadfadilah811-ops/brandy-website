import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/sanity/blog";
import EditForm from "./EditForm";

interface EditBlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return <EditForm post={post} />;
}
