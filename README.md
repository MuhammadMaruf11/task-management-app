# Task Management App

A clean and responsive Task Manager web application with complete CRUD functionality, filtering, sorting, dark/light mode, and animated transitions.

## Tech Stack

- **Framework**: [Next.js (App Router)]
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Form Handling**: React Hook Form + Zod Schema Validation
- **Date Formatting**: dayjs
- **Routing**: next/navigation
- **State**: useState / useEffect
- **Animation**: Framer Motion
- **API**: MockAPI with RESTful endpoints (imported via Postman Collection)

## Folder Structure

src/
├── app/
│ ├── page.tsx
│ └── (pages)/tasks/
│ ├── [id]/page.tsx
│ ├── [id]/edit/page.tsx
│ └── new/page.tsx
├── components/
│ ├── common/ ← Header
│ ├── Dashboard/ ← Dashboard view
│ ├── Task/ ← View, Edit, New, Card components
│ ├── Theme/ ← Dark/Light logic
│ ├── motion/ ← Page motion wrapper
│ └── ui/ ← Button, Modal, Spinner
├── lib/ ← API handlers
├── schema/ ← Zod validation schema
├── types/ ← TypeScript types
└── styles/
└── globals.css

## Setup Instructions

`npm install `

then

`npm run dev`

Visit: `http://localhost:3000`
