// components/JobCategories.jsx
import React from "react";

const JobCategories = () => {
  const categories = [
    "Software Development",
    "Design & Creative",
    "Marketing",
    "Sales",
    "Customer Support",
    "Finance",
  ];

  return (
    <section className="py-16 bg-white text-black">
      <div className="container mx-auto px-6 text-center ">
        <h2 className="text-3xl font-bold mb-10">Browse Job Categories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="p-6 bg-blue-50 rounded-lg shadow hover:bg-blue-100 transition">
              <h3 className="text-xl font-semibold">{cat}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
