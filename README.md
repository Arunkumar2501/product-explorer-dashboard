# Product Explorer Dashboard

A production-ready web application built with Next.js App Router for browsing and exploring products with comprehensive filtering, search, sorting, and favorites functionality.

## Project Overview

Product Explorer Dashboard is a full-featured product browsing application that enables users to discover products, view detailed information, and manage their favorite items. The application fetches product data from the Fake Store API and provides an intuitive interface with real-time client-side filtering, search, sorting capabilities, and persistent favorites management.

## Features Implemented

### Core Features

- **Product Listing Page**
  - Responsive grid layout displaying products with images, titles, prices, and categories
  - Loading states with skeleton placeholders
  - Error handling with user-friendly error messages

- **Product Details Page**
  - Dynamic routing using Next.js App Router (`/products/[id]`)
  - Detailed product information including full description, rating, and category
  - Large product image display
  - Back navigation to product listing

- **Search & Filtering**
  - Real-time search by product title (client-side filtering)
  - Category filtering via dropdown menu
  - Combined search and category filtering
  - Results counter showing filtered vs total products

- **Price Sorting**
  - Sort products by price in ascending or descending order
  - Sorting applied after filtering, maintaining filter state
  - Works seamlessly with search, category, and favorites filters

- **Favorites Feature**
  - Heart icon toggle on each product card
  - Persistent favorites storage using localStorage (survives page refresh and browser restart)
  - "Show Favorites Only" filter option to view only favorited products
  - Favorites count display in filter section
  - Single source of truth state management prevents data inconsistencies

- **Dark Mode**
  - System preference detection on first visit
  - Manual theme toggle button in header
  - Persistent theme preference in localStorage
  - Smooth theme transitions across all UI components

### UX Enhancements

- **Responsive Design**
  - Mobile-first approach with breakpoints for tablet, desktop, and large screens
  - Adaptive grid layout (1-5 columns based on screen size)
  - Touch-friendly interactions

- **Empty States**
  - Friendly messages when no products match search/filters
  - Context-aware messaging for favorites (when none exist)
  - Visual icons for better user guidance

- **Accessibility**
  - Keyboard navigation support
  - ARIA labels on interactive elements
  - Focus states for all form controls
  - Semantic HTML structure

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Runtime**: React 19.2.3
- **API**: Fake Store API (https://fakestoreapi.com)

## Setup Instructions

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-explorer-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Architecture Decisions

### Component Architecture

- **Server Components by Default**: The main page (`page.tsx`) is a Server Component that fetches data, reducing client-side JavaScript
- **Client Components Where Needed**: Only interactive components (filters, favorites) use `"use client"` directive
- **Prop-Driven State**: Favorites state is managed in a single `FavoritesProvider` component and passed down via props to avoid state isolation issues

### State Management

- **localStorage for Favorites**: Client-side persistence using localStorage with proper error handling and SSR safety checks
- **React Hooks**: Custom `useFavorites` hook encapsulates favorites logic with proper initialization and sync
- **No Global State Library**: Intentionally avoided Redux/Zustand as the application doesn't require complex state management

### Data Fetching

- **Server-Side Fetching**: Products are fetched in Server Components for better SEO and initial load performance
- **Error Handling**: Comprehensive error handling with custom `ApiError` class for typed error messages
- **Type Safety**: Full TypeScript coverage for API responses and component props

### File Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions (API calls)
└── types/            # TypeScript type definitions
```

### Styling Approach

- **Tailwind CSS v4**: Utility-first CSS with CSS-based configuration
- **Responsive Design**: Mobile-first approach with breakpoints for tablet, desktop, and large screens
- **Dark Mode**: Class-based dark mode using Tailwind's `dark:` variant system with theme persistence

## Assumptions & Trade-offs

### Assumptions

1. **API Reliability**: Assumes Fake Store API is available and returns consistent data structure
2. **Browser Support**: Targets modern browsers with localStorage and ES6+ support
3. **User Behavior**: Assumes users prefer instant client-side filtering over server-side search for this use case
4. **Data Volume**: Client-side filtering is suitable given the API returns ~20 products

### Trade-offs

1. **Client-Side Filtering and Sorting**: 
   - Pros: Instant feedback, no server requests, optimal UX for small datasets
   - Cons: Not scalable for large product catalogs; would require server-side implementation

2. **localStorage for Favorites**:
   - Pros: No authentication required, works offline, simple implementation, persists across sessions
   - Cons: Not synced across devices or browsers, cleared when browser data is deleted

3. **Single State Source Pattern**:
   - Pros: Prevents state isolation bugs, easier to debug, ensures data consistency
   - Cons: Requires prop drilling (acceptable for current component tree depth)

4. **No Tests Included**:
   - Trade-off for faster development; unit and integration tests should be added for production use

5. **No Pagination**:
   - All products load at once, acceptable for ~20 items but would require pagination or infinite scroll for larger datasets

## Future Improvements

### Features

- **Pagination or Infinite Scroll**: For handling larger product catalogs
- **Server-Side Search**: Implement full-text search with backend support
- **Additional Sorting Options**: Sort by rating or name in addition to price
- **Product Comparison**: Compare multiple products side-by-side
- **User Authentication**: Sync favorites across devices with user accounts
- **Product Reviews**: Display and submit product reviews

### Technical

- **Unit Tests**: Add Jest and React Testing Library for component testing
- **E2E Tests**: Playwright or Cypress for end-to-end testing
- **Performance Optimization**: 
  - Image optimization and lazy loading
  - Code splitting for better initial load
- **Error Tracking**: Integrate error monitoring (e.g., Sentry)
- **Analytics**: Add user behavior tracking
- **PWA Support**: Make it a Progressive Web App for offline functionality

### UX

- **Loading Skeletons**: More detailed skeleton states during data fetching
- **Toast Notifications**: Confirm actions like adding/removing favorites
- **Keyboard Shortcuts**: Quick navigation and search shortcuts
- **Accessibility Audit**: Full WCAG compliance review and improvements

## Live Demo

Live demo URL will be available after deployment.

---

*This project was developed as a frontend assignment submission.*
