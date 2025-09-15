// components/Testimonials.jsx
import React from "react";

const Testimonials = () => {
  const reviews = [
    { name: "Alice", role: "Designer", text: "I found my dream job within a week!" },
    { name: "John", role: "Developer", text: "Great platform for applying to top companies." },
    { name: "Sarah", role: "HR Manager", text: "Posting jobs here helped us find great talent." },
  ];

  return (
    <section className="py-16 bg-gray-100 text-black">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-600 italic mb-4">“{r.text}”</p>
              <h3 className="font-semibold">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
