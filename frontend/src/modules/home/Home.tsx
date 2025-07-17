import { Hero, Insight, Features, Testimonials, CTA } from "./index";

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
