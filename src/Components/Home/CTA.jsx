// components/CTA.jsx
import React from "react";

const CTA = () => {
  return (
    <section className="py-16 bg-indigo-700 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="mb-8">Join thousands of job seekers and employers today!</p>
        <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition">
          Sign Up Now
        </button>
      </div>
    </section>
  );
};

export default CTA;
