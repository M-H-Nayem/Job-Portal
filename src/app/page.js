import CTA from "@/Components/Home/CTA";
import FAQ from "@/Components/Home/FAQ";
import Features from "@/Components/Home/Features";
import Hero from "@/Components/Home/Hero";
import JobCategories from "@/Components/Home/JobCategories";
import Testimonials from "@/Components/Home/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      
     <Hero/>
     <Features/>
     <JobCategories></JobCategories>
     <Testimonials></Testimonials>
     <CTA></CTA>
     <FAQ></FAQ>
    </div>
  );
}
