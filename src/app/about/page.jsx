import Image from "next/image";

// app/about/page.js
export const metadata = {
  title: "About Us | Job Portal",
  description: "Learn more about our mission, vision, and team at Job Portal.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-3 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Job Portal</h1>
        <p className="text-lg text-gray-600">
          Connecting talents with opportunities — our mission is to make hiring
          and job searching effortless.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to provide a platform where job seekers can find their dream
            jobs and employers can hire the right talent quickly and
            efficiently.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To become the most trusted job portal in Bangladesh and globally,
            helping millions achieve career success while empowering businesses
            to grow with the right people.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our passionate team works hard to bridge the gap between job seekers
          and employers.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            {" "}
          <Image
            src="/p3.png"
            alt="Mahmudul Hasan - Founder & CEO"
            width={96} // Added width
            height={96} // Added height
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
             <h3 className="text-xl font-bold">Mahmudul Hasan</h3>  {" "}
          <p className="text-gray-500">Founder & CEO</p> {" "}
        </div>
          {/* Team Member 2 */} {" "}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            {" "}
          <Image
            src="/p2.png"
            alt="Sarah Ahmed - Head of Marketing"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
             <h3 className="text-xl font-bold">Sarah Ahmed</h3>  {" "}
          <p className="text-gray-500">Head of Marketing</p> {" "}
        </div>
          {/* Team Member 3 */} {" "}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            {" "}
          <Image
            src="/p1.png"
            alt="Rakibul Islam - Lead Developer"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
             <h3 className="text-xl font-bold">Rakibul Islam</h3>  {" "}
          <p className="text-gray-500">Lead Developer</p> {" "}
        </div>
      </div>
    </div>
  );
}
