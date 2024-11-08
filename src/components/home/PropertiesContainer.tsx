import PropertiesList from "./PropertiesList";
import EmptyList from "./EmptyList";
import { PropertyCardProps, PropertyFilters } from "@/types/profile";
import { fetchProperties } from "@/src/utils/actions";
import { getCachedProperties } from "@/src/lib/cache";
import Pagination from "../ui/Pagination";
interface PropertiesContainerProps extends PropertyFilters {
  className?: string;
}

async function PropertiesContainer({
  category,
  search,
  page = 1,
  className = "",
}: PropertiesContainerProps) {
  // , total 
  const { properties} = await getCachedProperties({
    category,
    search,
    // page,
    // limit:6
  });
  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No results found"
        message="Try adjusting your search filters"
        btnText="Clear Filters"
      />
    );
  }
  // const totalPages = Math.ceil(total / 6);
  // Create search params object with only defined values
  const params: Record<string, string> = {};
  if (category) params.category = category;
  if (search) params.search = search;
  return (
    <div className={className}>
      <PropertiesList properties={properties} />
      {/* {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl={`/?${new URLSearchParams(params).toString()}`}
        />
      )} */}
    </div>
  );
}
export default PropertiesContainer;
