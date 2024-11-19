
"use client";
import { useState } from "react";
import { SubmitButton } from "@/src/components/form/Buttons";
import FormContainer from "@/src/components/form/FormContainer";
import { Card } from "@/src/components/ui/card";
import TextAreaInput from "@/src/components/form/TextAreaInput";
import { Button } from "@/src/components/ui/button";
import { createReviewAction } from "@/src/utils/actions";
import RatingInput from "../form/RatingInput";
function SubmitReview({ propertyId }: { propertyId: string }) {
  const [isFormVisible, setFormVisible] = useState(false);
  return (
    <div className="mt-8">
      <Button onClick={() => setFormVisible((prev) => !prev)}>
      {isFormVisible ? "Cancel Review" : "Leave a Review"}
      </Button>
      {isFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInput name="rating" />
            <TextAreaInput
               name="comment"
               label="Feedback"
               placeholder="Share your experience..."
               defaultValue="Amazing place!"

            />
            <SubmitButton text="Submit Review" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;

