// components/Features.jsx
import React from "react";

const Features = () => {
  const features = [
    { title: "Easy Job Search", desc: "Find jobs by category, location, or skill." },
    { title: "Secure Hiring", desc: "Employers can post and manage job listings easily." },
    { title: "Dashboard Access", desc: "Manage your applications or job posts in one place." },
  ];

  return (
    <section className="py-16 bg-gray-50 text-black">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
