import { fetchPropertyReviews } from "@/src/utils/actions";
import Title from "@/src/components/properties/Title";

import ReviewCard from "./ReviewCard";

export interface Review {
  id: string;
  comment: string;
  rating: number;
  profile: { firstName: string; profileImage: string };
}

export interface ReviewCardInfo {
  comment: string;
  rating: number;
  name: string;
  image: string;
}

async function PropertyReviews({ propertyId }: { propertyId: string }) {
  const reviews = await fetchPropertyReviews(propertyId);
  if (reviews.length < 1) return null;
  return (
    <div className="mt-8">
      <Title text="Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review: Review) => {
          const reviewInfo: ReviewCardInfo = {
            comment: review.comment,
            rating: review.rating,
            name: review.profile.firstName,
            image: review.profile.profileImage,
          };

          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}
export default PropertyReviews;
