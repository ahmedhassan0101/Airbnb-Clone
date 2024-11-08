import { IconType } from "react-icons";
import { MdCabin } from "react-icons/md";
import { TbCaravan, TbTent, TbBuildingCottage } from "react-icons/tb";
import { GiWoodCabin, GiMushroomHouse } from "react-icons/gi";
import { PiWarehouse, PiLighthouse, PiVan } from "react-icons/pi";
import { GoContainer } from "react-icons/go";

export const CATEGORY_LABELS = [
  "airstream",
  "cabin",
  "caravan",
  "container",
  "cottage",
  "lodge",
  "magic",
  "tent",
  "tiny",
  "warehouse",
] as const;

type CategoryLabel = (typeof CATEGORY_LABELS)[number];

type Category = {
  label: CategoryLabel;
  icon: IconType;
};
export const categories: Category[] = [
  { label: "airstream", icon: PiVan },
  { label: "cabin", icon: MdCabin },
  { label: "caravan", icon: TbCaravan },
  { label: "container", icon: GoContainer },
  { label: "cottage", icon: TbBuildingCottage },
  { label: "lodge", icon: GiWoodCabin },
  { label: "magic", icon: GiMushroomHouse },
  { label: "tent", icon: TbTent },
  { label: "tiny", icon: PiLighthouse },
  { label: "warehouse", icon: PiWarehouse },
];
const rentalProperties = [
  {
    name: "Seaside Airstream",
    tagline: "Ultimate Coastal Escape",
    price: 150,
    description: "A modern airstream located near the beach with all amenities for a perfect vacation. Stunning sea views and private access to the shore.",
    country: "us",
    category: "airstream",
  },
  {
    name: "Mountain Airstream",
    tagline: "Retreat to the Peaks",
    price: 120,
    description: "Enjoy breathtaking mountain views from this cozy airstream. Perfect for nature lovers who want a serene getaway.",
    country: "ca",
    category: "airstream",
  },
  {
    name: "Cozy Cabin",
    tagline: "Rustic Charm Awaits",
    price: 200,
    description: "An authentic wooden cabin nestled in the forest. Perfect for a quiet, relaxing stay close to nature.",
    country: "no",
    category: "cabin",
  },
  {
    name: "Lakeview Cabin",
    tagline: "Peace by the Lake",
    price: 180,
    description: "This lakefront cabin offers a peaceful escape with views of calm waters. Ideal for fishing and kayaking enthusiasts.",
    country: "se",
    category: "cabin",
  },
  {
    name: "Classic Caravan",
    tagline: "Vintage Road Trip",
    price: 80,
    description: "Travel back in time with this retro caravan. Perfect for road trips and memorable family vacations.",
    country: "nl",
    category: "caravan",
  },
  {
    name: "Countryside Caravan",
    tagline: "Green Getaway",
    price: 90,
    description: "Located in the countryside, this caravan offers fresh air and scenic views, with close access to hiking trails.",
    country: "ie",
    category: "caravan",
  },
  {
    name: "Container Studio",
    tagline: "Modern and Compact",
    price: 60,
    description: "A chic, minimalistic container studio located in an urban area. Perfect for solo travelers looking for a unique stay.",
    country: "sg",
    category: "container",
  },
  {
    name: "Beach Container",
    tagline: "Stylish Beach Stay",
    price: 70,
    description: "Enjoy a compact, modern living space in a container home right by the beach. Perfect for quick getaways.",
    country: "mx",
    category: "container",
  },
  {
    name: "Country Cottage",
    tagline: "Cozy and Quaint",
    price: 250,
    description: "Escape to this charming cottage surrounded by greenery. Ideal for a family or romantic getaway.",
    country: "uk",
    category: "cottage",
  },
  {
    name: "Garden Cottage",
    tagline: "Nature's Embrace",
    price: 230,
    description: "A cozy cottage surrounded by a beautiful garden. Perfect for unwinding and enjoying nature.",
    country: "fr",
    category: "cottage",
  },
  {
    name: "Luxury Lodge",
    tagline: "Highland Adventure",
    price: 300,
    description: "An opulent lodge with panoramic views. Ideal for a luxurious mountain retreat.",
    country: "ch",
    category: "lodge",
  },
  {
    name: "Forest Lodge",
    tagline: "Quiet Wilderness Escape",
    price: 280,
    description: "Stay deep in the forest with all the comforts of a luxury lodge. Perfect for a peaceful retreat.",
    country: "fi",
    category: "lodge",
  },
  {
    name: "Magical Treehouse",
    tagline: "Fantasy in the Woods",
    price: 350,
    description: "A treehouse straight out of a fairy tale, with cozy interiors and views over the forest canopy.",
    country: "de",
    category: "magic",
  },
  {
    name: "Wizard's Cabin",
    tagline: "Mystical Getaway",
    price: 340,
    description: "Enter a world of magic in this enchanting cabin. Perfect for fans of fantasy and folklore.",
    country: "pl",
    category: "magic",
  },
  {
    name: "Safari Tent",
    tagline: "African Safari Experience",
    price: 100,
    description: "A tented camp experience with modern amenities, perfect for adventure seekers looking for an African safari vibe.",
    country: "za",
    category: "tent",
  },
  {
    name: "Desert Tent",
    tagline: "Nomad's Oasis",
    price: 95,
    description: "Experience the vast beauty of the desert in this luxurious tent. Great for star-gazing and quiet relaxation.",
    country: "ma",
    category: "tent",
  },
  {
    name: "Tiny Home Village",
    tagline: "Compact and Cozy",
    price: 50,
    description: "A tiny home experience with minimalistic design and cozy interiors, set in a scenic village.",
    country: "pt",
    category: "tiny",
  },
  {
    name: "Urban Tiny Home",
    tagline: "Small but Stylish",
    price: 55,
    description: "A well-designed tiny home located in the city, perfect for a minimalist urban experience.",
    country: "us",
    category: "tiny",
  },
  {
    name: "Rustic Warehouse",
    tagline: "Industrial Chic",
    price: 110,
    description: "An open warehouse space converted into a rustic living area. Ideal for art lovers and creative individuals.",
    country: "it",
    category: "warehouse",
  },
  {
    name: "Loft Warehouse",
    tagline: "Spacious City Loft",
    price: 120,
    description: "A large, airy warehouse loft with stylish interiors. Perfect for a trendy city stay.",
    country: "jp",
    category: "warehouse",
  },
];
