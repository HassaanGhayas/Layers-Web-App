import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const fakeReviews = [
  {
    name: "John Doe",
    review:
      "Absolutely love the quality of the flowers! They last so long, and the fragrance is divine!",
    rating: 5,
  },
  {
    name: "Jane Smith",
    review:
      "The arrangements are stunning, and delivery was so quick! Highly recommend this shop!",
    rating: 4,
  },
  {
    name: "Emily Johnson",
    review:
      "A beautiful variety of flowers to choose from. The customer service was amazing too!",
    rating: 5,
  },
  {
    name: "Michael Brown",
    review: "Great value for money. The flowers made the perfect gift!",
    rating: 4,
  },
  {
    name: "Sophia Davis",
    review:
      "Impeccable service and absolutely gorgeous bouquets! My go-to flower shop!",
    rating: 5,
  },
];

const ReviewSection = () => {
  return (
    <section>
      <div className="w-full max-w-screen-xl m-auto py-10 px-4 manrope">
        <Carousel
          className="w-full space-y-8"
          opts={{
            loop: true,
          }}
        >
          <div className="relative flex items-center justify-between gap-2">
            <span className="md:text-2xl text-lg">What our Customers Say</span>

            <div className="space-x-1">
              <CarouselPrevious className="static translate-y-0 rounded-md" />
              <CarouselNext className="static translate-y-0 rounded-md" />
            </div>
          </div>
          <CarouselContent className="-ml-1">
            {fakeReviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="hover:shadow-xl transition-all">
                    <CardContent className="flex flex-col items-start p-6">
                      <span className="text-lg font-semibold montser">
                        {review.name}
                      </span>
                      <p className="mt-2 text-sm text-gray-600">
                        {review.review}
                      </p>
                      <div className="mt-4 flex items-center">
                        {Array.from({ length: 5 }).map((_, starIndex) =>
                          starIndex < review.rating ? (
                            <AiFillStar
                              key={starIndex}
                              className="text-yellow-500 w-5 h-5"
                            />
                          ) : (
                            <AiOutlineStar
                              key={starIndex}
                              className="text-gray-400 w-5 h-5"
                            />
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ReviewSection;
