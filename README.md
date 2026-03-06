# ResumeSync — Frontend

A modern, monochromatic dark-themed frontend for the Resume Synchronization System. Built with React, TypeScript, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-cyan?logo=tailwindcss)

---

## Features

- **Upload Resumes** — Drag-and-drop or browse file upload with progress indicator
- **View Resumes** — Expandable card-based list with metadata (size, date, checksum)
- **Download Resumes** — One-click download via storage path
- **Delete Resumes** — Delete with confirmation dialog
- **Dashboard Stats** — Total files, storage used, latest upload at a glance
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Monochromatic Theme** — Premium UI with noise texture, glow effects, and smooth animations

---

## Tech Stack

| Layer       | Technology              |
|-------------|------------------------|
| Framework   | React 18 + TypeScript  |
| Bundler     | Vite 5                 |
| Styling     | Tailwind CSS 3         |
| HTTP Client | Axios                  |
| Backend     | FastAPI (separate repo)|

---

## Prerequisites

- **Node.js** >= 18.x (recommended 20.x+)
- **npm** >= 9.x
- **Backend API** running at `http://localhost:8000`

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/resume-sync-ui.git
cd resume-sync-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

### 4. Build for production

```bash
npm run build
```

Output will be in the `dist/` directory.

### 5. Preview production build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── App.tsx                    # Main app shell — header, stats, layout
├── main.tsx                   # Entry point
├── index.css                  # Tailwind directives
│
├── api/
│   └── client.ts              # Axios client — GET, POST, DELETE endpoints
│
├── components/
│   ├── Atmosphere.tsx         # Background effects — noise, glow, grid, keyframes
│   ├── ResumeCard.tsx         # Expandable resume card with actions
│   ├── ResumeList.tsx         # List wrapper — loading, error, empty states
│   ├── Spinner.tsx            # Reusable SVG spinner
│   ├── StatCard.tsx           # Dashboard stat card
│   └── UploadForm.tsx         # Drag-and-drop upload form with progress
│
├── hooks/
│   └── useResumes.ts          # Custom hook — fetch, parse, refetch
│
├── lib/
│   ├── palette.ts             # Monochromatic color tokens
│   └── utils.ts               # formatBytes, formatDate, getFileExtension
│
└── types/
    └── resume.ts              # TypeScript interfaces
```

---

## API Endpoints

The frontend connects to a FastAPI backend at `http://localhost:8000/api/v1`.

| Method | Endpoint                | Description          |
|--------|------------------------|----------------------|
| GET    | `/api/v1/resumes`      | List all resumes     |
| POST   | `/api/v1/resumes/upload`| Upload a resume      |
| DELETE | `/api/v1/resumes/:id`  | Delete a resume      |
| GET    | `/api/v1/resumes/download/:path` | Download a file |

### GET /resumes response format

```json
{
  "sync_version": 1,
  "server_time": "2026-03-05T11:45:11.906591Z",
  "total_files": 2,
  "files": {
    "Resume11__Copy_.pdf": {
      "id": "b9fed0c9-9cf0-4a51-8e70-29143ceff34c",
      "title": "Resume11__Copy_",
      "checksum": "abc123...",
      "size": 46177,
      "updated_at": "2026-03-05T11:45:11Z",
      "storage_path": "uuid/filename.pdf"
    }
  }
}
```

### POST /resumes/upload payload

```
Content-Type: multipart/form-data

file:  <binary>
title: <string>
```

---

## Configuration

To change the backend URL, edit `src/api/client.ts`:

```ts
const client = axios.create({
  baseURL: "http://localhost:8000/api/v1",  // ← change this
});
```

### CORS Setup (Backend)

Ensure your FastAPI backend allows requests from the frontend origin:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Scripts

| Command            | Description                    |
|--------------------|--------------------------------|
| `npm run dev`      | Start dev server (port 5173)   |
| `npm run build`    | Production build to `dist/`    |
| `npm run preview`  | Preview production build       |
| `npm run lint`     | Run ESLint                     |

---

## License

MIT