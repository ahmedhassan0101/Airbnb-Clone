import EmptyList from "@/src/components/home/EmptyList";
import PropertiesList from "@/src/components/home/PropertiesList";
import { fetchFavorites } from "@/src/utils/actions";

async function FavoritesPage() {
  const favorites = await fetchFavorites();

  if (favorites.length === 0) {
    return <EmptyList />;
  }

  return <PropertiesList properties={favorites} />;
}
export default FavoritesPage;
