import CTA from "./cta";
import Features from "./features";
import Hero from "./hero";
import Insight from "./insight";
import Testimonials from "./testimonials";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Insight />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;
