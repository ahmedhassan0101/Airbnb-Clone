import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { categories } from "@/src/utils/categories";
type CategoriesListProps = { category?: string; search?: string };

function buildLink(label: string, search?: string) {
  const searchTerm = search ? `&search=${search}` : "";
  return `/?category=${label}${searchTerm}`;
}

function CategoriesList({ category, search }: CategoriesListProps) {
  return (
    <section>
      <ScrollArea className="py-6">
        <div className="flex gap-x-4">
          {categories.map(({ label, icon: Icon }) => {
            const isActive = label === category;
            return (
              <Link key={label} href={buildLink(label, search)}>
                <article
                  className={`p-3 flex flex-col items-center cursor-pointer duration-300 hover:text-primary w-[100px] ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  <Icon className="w-8 h-8" />
                  <p className="capitalize text-sm mt-1">{label}</p>
                </article>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

export default CategoriesList;
