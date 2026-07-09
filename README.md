# Reno Notice Board

A simple Notice Board web application built for the Reno Platforms Assignment using Next.js, Prisma ORM, and TiDB Cloud (MySQL).

## Features

- Create Notice
- View Notices
- Edit Notice
- Delete Notice (CRUD)
- Server-side Rendering (SSR)
- Prisma ORM with TiDB Cloud

## Tech Stack

- Next.js
- React.js
- Prisma ORM
- TiDB Cloud (MySQL)
- JavaScript

## Run Locally

```bash
git clone <repository-url>
cd reno-notice-board
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_database_connection_string"
```

Run:

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

Open:

```
http://localhost:3000
```

## Future Improvement

With more time, I would add:

- User Authentication
- Search & Filter
- Responsive UI
- Form Validation
- Pagination
