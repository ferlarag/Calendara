# [Calendara App](https://calendara.app)

## What's [Calendara](https://calendara.app)?

[Calendara](https://calendara.app) is an Appointment and Booking system that helps busineses manage their appoinments, charge for their services, have important business analytics and handle customer data for marketing.

[Calendara](https://calendara.app) also makes it easier for clients to remember events, reschedule them, cancel or pay online.

## The tech stack for this project

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. For an overview of the project structure visit the [T3 Stack Project Structure](https://create.t3.gg/en/folder-structure)

We are using:

- [Typescript:](https://nextjs.org) Type Safety
- [Next.js:](https://nextjs.org) Full Stack React Framework (deployed with Vercel)
- [PlanetScale:](https://nextjs.org) Managed Database Service
- [KindAuth:](https://kinde.com) Thrid Party Auth provider
- [Prisma:](https://prisma.io) Database ORM
- [Tailwind CSS:](https://tailwindcss.com) Utility style classes
- [tRPC:](https://trpc.io) Type Safety from back to front end
- [Resend:](https://trpc.io) Sending and Styling emails

Important: Check out the dependencies in the package.json

## How to run this app?

Copy the code to you Local Development Enviroment

    git clone git@github.com:ferlarag/Calendara.git

Install the dependencies with

    npm install

Change the Database URL to the Development Database URL

    DATABASE_URL="development_database_url"

Run the server

    npm run dev

## Adding new features?

**Every new code push will trigger a redeployment to Vercel**. But before you do it, its important that the database is in sync with the changes made to the codebase

Run the following command:

    npx prisma db generate
    npx prisma db format
    npx prisma db push

Note: We are using PlanetScale, by pushing the changes to the database an Admin will need to aprove the changes before going into prod (like a pull request)
