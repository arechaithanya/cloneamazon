import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/catalog";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const { category, products } = await getProductsByCategory(slug);
  if (!category) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold">{category.name}</h1>
      <p className="text-sm text-gray-600">{products.length} items</p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
