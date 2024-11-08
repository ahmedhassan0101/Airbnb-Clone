import { Suspense } from "react";
import LoadingCards from "../components/card/LoadingCards";
import dynamic from "next/dynamic";

const CategoriesList = dynamic(
  () => import("../components/home/CategoriesList")
);
const PropertiesContainer = dynamic(
  () => import("../components/home/PropertiesContainer")
);

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <div>
      <CategoriesList
        category={searchParams?.category}
        search={searchParams?.search}
      />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={searchParams?.category}
          search={searchParams?.search}
        />
      </Suspense>
    </div>
  );
}
