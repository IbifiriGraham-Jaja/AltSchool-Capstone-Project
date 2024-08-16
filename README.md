# Shortify

Shortify is a URL shortening application built with Next.js, TypeScript, and Tailwind CSS. It allows users to shorten long URLs, customize the shortened URL, and track their analytics.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **URL Shortening**: Generate short URLs from long URLs.
- **Custom Aliases**: Customize the shortened URL to make it more memorable.
- **Analytics**: Track the number of clicks on your shortened URLs.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Easy-to-Use Interface**: Simple and intuitive user interface built with Tailwind CSS.

## Demo

Check out the live demo: [Shortify Live](#)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/IbifiriGrahamjaja/shortify.git

Navigate to the project directory:


cd shortify
Install the dependencies:


npm install
Running the Application
To start the development server, run:


npm run dev
Open your browser and go to http://localhost:3000 to see the application running.

Project Structure
Here's a brief overview of the project's structure:


shortify/
├── public/                 # Public assets like images and fonts
├── src/
│   ├── app/                # Next.js app directory for routes
│   ├── components/         # Reusable components
│   ├── styles/             # Global and component-specific styles
│   ├── utils/              # Utility functions
│   ├── pages/              # Next.js pages
│   ├── types/              # TypeScript types
│   ├── services/           # Services like API calls
│   ├── middlewares/        # Middleware functions
│   ├── models/             # Database models
│   ├── config/             # Configuration files
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Files to ignore in Git
├── next.config.js          # Next.js configuration
├── postcss.config.js       # PostCSS configuration for Tailwind CSS
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project metadata and dependencies
Technologies Used
Next.js: A React framework for server-side rendering and building static web applications.
TypeScript: A statically typed superset of JavaScript that enhances code quality and developer experience.
Tailwind CSS: A utility-first CSS framework for building custom designs without writing custom CSS.

Contributing
Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.


### Summary:
- **Project Overview**: The README provides an overview of the Shortify app, describing its features, technologies used, and project structure.
- **Getting Started**: Instructions are provided to help new users set up and run the project locally.
- **Contributing**: Guidelines are included for contributing to the project.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
