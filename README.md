# Job-Portal-Pro

Job-Portal-Pro is a full-stack job board application built with Next.js, a modern React framework. It connects job seekers with employers, providing features for job posting, application management, and user profiles.

## ✨ Features

- **User Authentication**: Secure login/registration with NextAuth.js.
- **Role-Based Access Control**: Different dashboards for job seekers, employers, and an admin.
- **Job Management**: Employers can post, edit, and delete job listings.
- **Application System**: Job seekers can apply for jobs, and employers can manage applications (accept/reject).
- **Saved Jobs**: Job seekers can save job listings to their profile.
- **Admin Dashboard**: Admins have full control to manage user roles and oversee the platform.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience on all devices.
- **Interactive UI**: SweetAlert2 for beautiful, dynamic alerts and notifications.

## 💻 Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **State Management**: React's built-in hooks (`useState`, `useEffect`)
- **UI Components**: React Icons, SweetAlert2

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or a local MongoDB instance)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/Job-Portal-Pro.git](https://github.com/your-username/Job-Portal-Pro.git)
    cd Job-Portal-Pro
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following variables.

    ```env
    # MongoDB Connection URI
    MONGODB_URI=your_mongodb_connection_string

    # NextAuth.js Configuration
    NEXTAUTH_SECRET=a_long_random_string_for_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000

    # Google Provider (Optional)
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    # GitHub Provider (Optional)
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret

    # Base URL for API calls
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

    - Replace `your_mongodb_connection_string` with your MongoDB URI.
    - Generate a secure string for `NEXTAUTH_SECRET`. You can use an online tool or a command like `openssl rand -base64 32`.
    - You can add other providers like Google or GitHub by getting the credentials from their developer consoles.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📄 Project Structure
