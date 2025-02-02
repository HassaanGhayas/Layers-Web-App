import HomeHero from "../containers/home-page/homeHero";
import HomeCategory from "../containers/home-page/category-sec";
import NewArrival from "../containers/home-page/newArrival";
import ReviewSection from "../containers/home-page/review-sec";

export default function Home() {
  return (
    <div className="min-h-screen">
    <HomeHero />
    <HomeCategory />
    <NewArrival />
    <ReviewSection />
    </div>
  );
}
