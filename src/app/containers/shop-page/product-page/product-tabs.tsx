import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const ProductTabs = ({ reviews }: { reviews: { user: string; rating: number; comment?: string }[] }) => {
  return (
    <Tabs defaultValue="reviews" className="w-full mx-auto">
      <TabsList className="flex h-12">
        <TabsTrigger value="reviews" className="w-full h-full">Reviews</TabsTrigger>
        <TabsTrigger value="faqs" className="w-full h-full">FAQs</TabsTrigger>
      </TabsList>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="p-4 border rounded-md shadow-sm">
              <h3 className="font-semibold">{review.user}</h3>
              <p className="text-yellow-500">⭐ {review.rating}/5</p>
              {review.comment && <p className="text-gray-500">{review.comment}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </TabsContent>

      {/* FAQs Tab */}
      <TabsContent value="faqs">
        <Accordion type="single" collapsible>
          <AccordionItem value="q1">
            <AccordionTrigger>What is the return policy?</AccordionTrigger>
            <AccordionContent>
              You can return any product within 30 days of purchase, provided it is unused and in its original packaging.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
            <AccordionContent>
              Yes, we ship internationally! Delivery times vary based on location.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger>How can I track my order?</AccordionTrigger>
            <AccordionContent>
              After placing an order, you will receive a tracking number via email to monitor your shipment.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept Visa, MasterCard, PayPal, and other major payment methods.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
