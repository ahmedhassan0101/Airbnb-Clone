import AmenitiesInput from "@/src/components/form/AmenitiesInput";
import CategoriesInput from "@/src/components/form/CategoriesInput";
import CounterInput from "@/src/components/form/CounterInput";
import CountriesInput from "@/src/components/form/CountriesInput";
import FormContainer from "@/src/components/form/FormContainer";
import FormInput from "@/src/components/form/FormInput";
import { ImageInputTwo } from "@/src/components/form/ImageInputTwo";
import { SubmitButton } from "@/src/components/form/Buttons";
import TextAreaInput from "@/src/components/form/TextAreaInput";
import { createPropertyAction } from "@/src/utils/actions";

function CreateProperty() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create property
      </h1>
      <div className="border p-8 rounded-md">
        <h3 className="text-lg mb-4 font-medium">General Info</h3>
        <FormContainer action={createPropertyAction}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              label="Name (20 limit)"
              name="name"
              defaultValue="Cabin in Latvia"
            />
            <FormInput
              label="Tagline (30 limit)"
              name="tagline"
              defaultValue="Dream Getaway Awaits You Here!"
            />
            <FormInput
              label="Price ($)"
              type="number"
              name="price"
              defaultValue={0}
            />
            <CategoriesInput />
          </div>
          {/* text area / description */}
          <TextAreaInput
            name="description"
            label="Description (10 - 1000 words)"
          />
          <div className="grid sm:grid-cols-2 gap-8 mt-4">
            <CountriesInput />
            <ImageInputTwo />
          </div>
          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput detail="guests" />
          <CounterInput detail="bedrooms" />
          <CounterInput detail="beds" />
          <CounterInput detail="baths" />
          <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
          <AmenitiesInput />
          <SubmitButton text="create rental" className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProperty;
