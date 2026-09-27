import { NextResponse } from "next/server";
import { getAllCloneProducts } from "@/lib/clone-product-index";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  if (q.length < 2) return NextResponse.json([]);

  const all = getAllCloneProducts();
  const results = all
    .filter((p) => p.name.toLowerCase().includes(q))
    .slice(0, 8)
    .map((p) => ({ id: p.id, name: p.name, category: p.category ?? "" }));

  return NextResponse.json(results);
}
