"use server";
import db from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { imageSchema, profileSchema, propertySchema } from "./schemas";
import { FormState } from "@/types/form";
import { uploadImage } from "./image";
import { validateBody, validateData, ValidationError } from "./validation";
import { PropertyFilters } from "@/types/profile";
import { PropertyCardProps } from "./types";
import { Prisma } from "@prisma/client";

async function getAuthUser() {
  const { userId } = auth();
  if (!userId) {
    throw new AuthError("Not authenticated");
  }
  const user = await clerkClient.users.getUser(userId);
  return { user, userId };
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

function handleError(error: unknown): FormState {
  if (error instanceof AuthError) {
    return { message: error.message };
  }
  if (error instanceof Error) {
    return {
      message: "Form validation failed",
      errors: { form: [error.message] },
    };
  }
  return { message: "An unexpected error occurred" };
}

export async function createProfileAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { user, userId } = await getAuthUser();
    const validatedData = validateBody(
      profileSchema,
      Object.fromEntries(formData)
    );

    await db.profile.create({
      data: {
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedData,
      },
    });

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { hasProfile: true },
    });

    redirect("/profile");
  } catch (error) {
    return handleError(error);
  }
}

export const updateProfileAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const { userId } = await getAuthUser();
    const validatedData = validateBody(
      profileSchema,
      Object.fromEntries(formData)
    );
    await db.profile.update({
      where: { clerkId: userId },
      data: validatedData,
    });

    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return handleError(error);
  }
};

export async function fetchProfile() {
  try {
    const { userId } = await getAuthUser();

    const profile = await db.profile.findUnique({
      where: { clerkId: userId },
    });

    if (!profile) redirect("/profile/create");

    return profile;
  } catch (error) {
    throw new Error("Failed to fetch profile");
  }
}

export async function updateProfileImageAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { userId } = await getAuthUser();
    const file = formData.get("image") as File;
    validateData(imageSchema, { file }, { showToast: true });

    const { url } = await uploadImage(file, {
      path: `profiles/${userId}`,
    });

    await db.profile.update({
      where: { clerkId: userId },
      data: { profileImage: url },
    });

    revalidatePath("/profile");
    return { message: "Profile image updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "Failed to update profile image" };
  }
}

export async function fetchProfileImage() {
  try {
    const { userId } = await getAuthUser();
    const profile = await db.profile.findUnique({
      where: { clerkId: userId },
      select: { profileImage: true },
    });
    return profile?.profileImage ?? null;
  } catch (error) {
    console.error("Error fetching profile image:", error);
    return null;
  }
}

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const { userId } = await getAuthUser();
    const validatedFields = validateBody(
      propertySchema,
      Object.fromEntries(formData)
    );

    const file = formData.get("image") as File;
    validateData(imageSchema, { file }, { showToast: true });

    const { url } = await uploadImage(file, {
      path: `Property/${userId}`,
    });

    await db.property.create({
      data: {
        ...validatedFields,
        image: url,
        profileId: userId,
      },
    });
  } catch (error) {
    return handleError(error);
  }
  redirect("/");
};

// export const fetchProperties = async ({
//   search = '',
//   category,
// }: {
//   search?: string;
//   category?: string;
// }) => {
//   const properties = await db.property.findMany({
//     where: {
//       category,
//       OR: [
//         { name: { contains: search, mode: 'insensitive' } },
//         { tagline: { contains: search, mode: 'insensitive' } },
//       ],
//     },
//     select: {
//       id: true,
//       name: true,
//       tagline: true,
//       country: true,
//       price: true,
//       image: true,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });
//   return properties;
// };

export async function fetchProperties({
  search = "",
  category,
  page = 1,
  limit = 6,
}: PropertyFilters): Promise<{
  properties: PropertyCardProps[];
  // total: number;
}> {
  const skip = (2 - 1) * 6;

  const whereClause: Prisma.PropertyWhereInput = {
    ...(category ? { category } : {}),
    OR: [
      {
        name: { contains: search, mode: "insensitive" as Prisma.QueryMode },
      },
      { tagline: { contains: search, mode: Prisma.QueryMode.insensitive } },
    ],
  };
// , total
  const [properties] = await Promise.all([
    db.property.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        tagline: true,
        country: true,
        price: true,
        image: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      // skip,
      // take: 6,
    }),
    // db.property.count({
    //   where: whereClause,
    // }),
  ]);

  return { properties
    // , total 
  };
}
export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const { userId } = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: userId,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const { userId } = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: userId,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return handleError(error);
  }
};

export const fetchFavorites = async () => {
  const { userId } = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: userId,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          image: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.property);
};

// export const fetchPropertyDetails = (id: string) => {
//   return db.property.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       profile: true,
//       bookings: {
//         select: {
//           checkIn: true,
//           checkOut: true,
//         },
//       },
//     },
//   });
// };

// export async function createReviewAction(prevState: any, formData: FormData) {
//   const user = await getAuthUser();
//   try {
//     const rawData = Object.fromEntries(formData);

//     const validatedFields = validateBody(createReviewSchema, rawData);

//     await db.review.create({
//       data: {
//         ...validatedFields,
//         profileId: user.id,
//       },
//     });
//     revalidatePath(`/properties/${validatedFields.propertyId}`);
//     return { message: 'Review submitted successfully' };
//   } catch (error) {
//     return renderError(error);
//   }
// }

// export async function fetchPropertyReviews(propertyId: string) {
//   const reviews = await db.review.findMany({
//     where: {
//       propertyId,
//     },
//     select: {
//       id: true,
//       rating: true,
//       comment: true,
//       profile: {
//         select: {
//           firstName: true,
//           profileImage: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });
//   return reviews;
// }

// export const fetchPropertyReviewsByUser = async () => {
//   const user = await getAuthUser();
//   const reviews = await db.review.findMany({
//     where: {
//       profileId: user.id,
//     },
//     select: {
//       id: true,
//       rating: true,
//       comment: true,
//       property: {
//         select: {
//           name: true,
//           image: true,
//         },
//       },
//     },
//   });
//   return reviews;
// };

// export const deleteReviewAction = async (prevState: { reviewId: string }) => {
//   const { reviewId } = prevState;
//   const user = await getAuthUser();

//   try {
//     await db.review.delete({
//       where: {
//         id: reviewId,
//         profileId: user.id,
//       },
//     });

//     revalidatePath('/reviews');
//     return { message: 'Review deleted successfully' };
//   } catch (error) {
//     return renderError(error);
//   }
// };

// export const findExistingReview = async (
//   userId: string,
//   propertyId: string
// ) => {
//   return db.review.findFirst({
//     where: {
//       profileId: userId,
//       propertyId: propertyId,
//     },
//   });
// };

// export async function fetchPropertyRating(propertyId: string) {
//   const result = await db.review.groupBy({
//     by: ['propertyId'],
//     _avg: {
//       rating: true,
//     },
//     _count: {
//       rating: true,
//     },
//     where: {
//       propertyId,
//     },
//   });

//   // empty array if no reviews
//   return {
//     rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
//     count: result[0]?._count.rating ?? 0,
//   };
// }

// export const createBookingAction = async (prevState: {
//   propertyId: string;
//   checkIn: Date;
//   checkOut: Date;
// }) => {
//   const user = await getAuthUser();
//   await db.booking.deleteMany({
//     where: {
//       profileId: user.id,
//       paymentStatus: false,
//     },
//   });
//   let bookingId: null | string = null;

//   const { propertyId, checkIn, checkOut } = prevState;
//   const property = await db.property.findUnique({
//     where: { id: propertyId },
//     select: { price: true },
//   });
//   if (!property) {
//     return { message: 'Property not found' };
//   }
//   const { orderTotal, totalNights } = calculateTotals({
//     checkIn,
//     checkOut,
//     price: property.price,
//   });

//   try {
//     const booking = await db.booking.create({
//       data: {
//         checkIn,
//         checkOut,
//         orderTotal,
//         totalNights,
//         profileId: user.id,
//         propertyId,
//       },
//     });
//     bookingId = booking.id;
//   } catch (error) {
//     return renderError(error);
//   }
//   redirect(`/checkout?bookingId=${bookingId}`);
// };

// export const fetchBookings = async () => {
//   const user = await getAuthUser();
//   const bookings = await db.booking.findMany({
//     where: {
//       profileId: user.id,
//       paymentStatus: true,
//     },
//     include: {
//       property: {
//         select: {
//           id: true,
//           name: true,
//           country: true,
//         },
//       },
//     },

//     orderBy: {
//       checkIn: 'desc',
//     },
//   });
//   return bookings;
// };

// export async function deleteBookingAction(prevState: { bookingId: string }) {
//   const { bookingId } = prevState;
//   const user = await getAuthUser();

//   try {
//     const result = await db.booking.delete({
//       where: {
//         id: bookingId,
//         profileId: user.id,
//       },
//     });

//     revalidatePath('/bookings');
//     return { message: 'Booking deleted successfully' };
//   } catch (error) {
//     return renderError(error);
//   }
// }

// export const fetchRentals = async () => {
//   const user = await getAuthUser();
//   const rentals = await db.property.findMany({
//     where: {
//       profileId: user.id,
//     },
//     select: {
//       id: true,
//       name: true,
//       price: true,
//     },
//   });

//   const rentalsWithBookingSums = await Promise.all(
//     rentals.map(async (rental) => {
//       const totalNightsSum = await db.booking.aggregate({
//         where: {
//           propertyId: rental.id,
//           paymentStatus: true,
//         },
//         _sum: {
//           totalNights: true,
//         },
//       });

//       const orderTotalSum = await db.booking.aggregate({
//         where: {
//           propertyId: rental.id,
//           paymentStatus: true,
//         },
//         _sum: {
//           orderTotal: true,
//         },
//       });

//       return {
//         ...rental,
//         totalNightsSum: totalNightsSum._sum.totalNights,
//         orderTotalSum: orderTotalSum._sum.orderTotal,
//       };
//     })
//   );

//   return rentalsWithBookingSums;
// };

// export async function deleteRentalAction(prevState: { propertyId: string }) {
//   const { propertyId } = prevState;
//   const user = await getAuthUser();

//   try {
//     await db.property.delete({
//       where: {
//         id: propertyId,
//         profileId: user.id,
//       },
//     });

//     revalidatePath('/rentals');
//     return { message: 'Rental deleted successfully' };
//   } catch (error) {
//     return renderError(error);
//   }
// }

// export const fetchRentalDetails = async (propertyId: string) => {
//   const user = await getAuthUser();

//   return db.property.findUnique({
//     where: {
//       id: propertyId,
//       profileId: user.id,
//     },
//   });
// };

// export const updatePropertyAction = async (
//   prevState: any,
//   formData: FormData
// ): Promise<{ message: string }> => {
//   const user = await getAuthUser();
//   const propertyId = formData.get('id') as string;

//   try {
//     const rawData = Object.fromEntries(formData);
//     const validatedFields = validateBody(propertySchema, rawData);
//     await db.property.update({
//       where: {
//         id: propertyId,
//         profileId: user.id,
//       },
//       data: {
//         ...validatedFields,
//       },
//     });

//     revalidatePath(`/rentals/${propertyId}/edit`);
//     return { message: 'Update Successful' };
//   } catch (error) {
//     return renderError(error);
//   }
// };

// export const updatePropertyImageAction = async (
//   prevState: any,
//   formData: FormData
// ): Promise<{ message: string }> => {
//   const user = await getAuthUser();
//   const propertyId = formData.get('id') as string;

//   try {
//     const image = formData.get('image') as File;
//     const validatedFields = validateBody(imageSchema, { image });
//     const fullPath = await uploadImage(validatedFields.image);

//     await db.property.update({
//       where: {
//         id: propertyId,
//         profileId: user.id,
//       },
//       data: {
//         image: fullPath,
//       },
//     });
//     revalidatePath(`/rentals/${propertyId}/edit`);
//     return { message: 'Property Image Updated Successful' };
//   } catch (error) {
//     return renderError(error);
//   }
// };

// export const fetchReservations = async () => {
//   const user = await getAuthUser();

//   const reservations = await db.booking.findMany({
//     where: {
//       paymentStatus: true,
//       property: {
//         profileId: user.id,
//       },
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//     include: {
//       property: {
//         select: {
//           id: true,
//           name: true,
//           price: true,
//           country: true,
//         },
//       },
//     },
//   });
//   return reservations;
// };

// export const fetchStats = async () => {
//   await getAdminUser();

//   const usersCount = await db.profile.count();
//   const propertiesCount = await db.property.count();
//   const bookingsCount = await db.booking.count({
//     where: {
//       paymentStatus: true,
//     },
//   });

//   return {
//     usersCount,
//     propertiesCount,
//     bookingsCount,
//   };
// };

// export const fetchChartsData = async () => {
//   await getAdminUser();
//   const date = new Date();
//   date.setMonth(date.getMonth() - 6);
//   const sixMonthsAgo = date;

//   const bookings = await db.booking.findMany({
//     where: {
//       paymentStatus: true,
//       createdAt: {
//         gte: sixMonthsAgo,
//       },
//     },
//     orderBy: {
//       createdAt: 'asc',
//     },
//   });
//   const bookingsPerMonth = bookings.reduce((total, current) => {
//     const date = formatDate(current.createdAt, true);
//     const existingEntry = total.find((entry) => entry.date === date);
//     if (existingEntry) {
//       existingEntry.count += 1;
//     } else {
//       total.push({ date, count: 1 });
//     }
//     return total;
//   }, [] as Array<{ date: string; count: number }>);
//   return bookingsPerMonth;
// };

// export const fetchReservationStats = async () => {
//   const user = await getAuthUser();

//   const properties = await db.property.count({
//     where: {
//       profileId: user.id,
//     },
//   });

//   const totals = await db.booking.aggregate({
//     _sum: {
//       orderTotal: true,
//       totalNights: true,
//     },
//     where: {
//       property: {
//         profileId: user.id,
//       },
//     },
//   });

//   return {
//     properties,
//     nights: totals._sum.totalNights || 0,
//     amount: totals._sum.orderTotal || 0,
//   };
// };