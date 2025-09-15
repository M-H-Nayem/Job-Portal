import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-[90vh] bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Find Your <span className="text-yellow-300">Dream Job</span> <br />
          or Hire the Best <span className="text-yellow-300">Talent</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
          Connecting applicants with employers in just a few clicks. 
          Explore thousands of job opportunities or post a new job today!
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/jobs"
            className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Browse Jobs
          </Link>
          <Link
            href="/dashboard/employer/jobs/new"
            className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
}
