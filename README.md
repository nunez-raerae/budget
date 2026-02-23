# Budget App 💸

A simple, straightforward budget tracker built with **Expo (React Native)** and **Supabase**.

## Features

- Add **Income** and **Expense** entries (with categories + optional notes)
- Smooth entry form using a **Bottom Sheet**
- Monthly entries fetch (current month)
- Powered by **React Query** for caching/refetching

## Tech Stack

- Expo / React Native
- TypeScript
- Supabase
- @tanstack/react-query
- @gorhom/bottom-sheet

## Getting Started

### 1) Install dependencies

```sh
npm install
```

### 2) Set up environment variables

Create a `.env` file (if you don’t have one) and add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3) Run the app

```sh
npx expo start
```

## Project Structure (high level)

- `app/` – screens & navigation (Expo Router)
- `components/` – UI components (BottomSheet, DateCelendar, etc.)
- `hooks/` – data fetching + auth hooks
- `lib/` – shared utilities (Supabase client, colors)
- `provider/` – app providers (auth provider)

## Notes

- Budget entries are stored in Supabase table: `budget`.
- The “current month” query logic lives in [`fetchTopBudgetEntries`](hooks/fetchData.ts).

---

Built for simplicity ✅
