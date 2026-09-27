import {
  ProductDetail,
  WatchDetail,
  LaptopDetail,
  headphonesDetail,
} from "@/clone/Data/ProductDetail";
import { TodaysDeals } from "@/clone/Data/SliderDetail";
import { TopPicks, RelatedItems, AlsoBought, BrowsingHistory } from "@/clone/Data/RecommendationsDetail";
import { HomeKitchenProducts } from "@/clone/Data/HomeKitchenDetail";

export type CloneCatalogItem = {
  id: number | string;
  name: string;
  price: string;
  status: string;
  image: string;
  about?: string[];
  rating?: string;
  review?: string;
  category?: string;
};

export function getAllCloneProducts(): CloneCatalogItem[] {
  const deals: CloneCatalogItem[] = TodaysDeals.map((d) => ({
    id: d.id,
    name: d.productName,
    price: "9999",
    status: "In stock",
    image: d.productImage || d.image || "",
    about: [],
  }));

  const recommendations: CloneCatalogItem[] = [
    ...TopPicks, ...RelatedItems, ...AlsoBought, ...BrowsingHistory,
  ].map((p) => ({
    id: p.id,
    name: p.productName,
    price: p.price,
    status: "In stock",
    image: p.productImage,
    about: p.about,
    rating: p.rating,
    category: p.category,
  }));

  const homeKitchen: CloneCatalogItem[] = HomeKitchenProducts.map((p) => ({
    id: p.id,
    name: p.productName,
    price: p.price,
    status: "In stock",
    image: p.productImage,
    about: p.about,
    rating: p.rating,
    category: p.category,
  }));

  const phones = [...ProductDetail, ...WatchDetail, ...LaptopDetail, ...headphonesDetail] as CloneCatalogItem[];
  return [...phones, ...deals, ...recommendations, ...homeKitchen];
}

export function getCloneProductById(cloneId: string | number): CloneCatalogItem | undefined {
  return getAllCloneProducts().find((p) => String(p.id) === String(cloneId));
}
