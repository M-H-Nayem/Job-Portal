// components/FAQ.jsx
import React from "react";

const FAQ = () => {
  const faqs = [
    { q: "How do I apply for a job?", a: "Simply create an account, browse jobs, and click apply." },
    { q: "Is it free for job seekers?", a: "Yes, applying to jobs is completely free." },
    { q: "Can employers manage applications?", a: "Yes, employers get a dashboard to track applicants." },
  ];

  return (
    <section className="py-16 bg-gray-50 text-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-5xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
