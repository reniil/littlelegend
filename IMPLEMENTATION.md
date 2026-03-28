# LittleLegend - Full Implementation Guide

## Overview
This guide provides complete step-by-step instructions for building LittleLegend, a childhood achievement tracker that transforms into a professional CV.

## Step 1: Project Setup

### 1.1 Initialize Project
```bash
cd ~/.openclaw/workspace/projects/littlelegend
rm -rf frontend
npx create-next-app@14 frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd frontend
npm install lucide-react
```

### 1.2 Configure Tailwind
Update `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-purple': {
          50: '#FAF5FF', 100: '#F3E8FF', 200: '#E9D5FF',
          300: '#D8B4FE', 400: '#C084FC', 500: '#A855F7',
          600: '#9333EA', 700: '#6B46C1', 800: '#5B21B6', 900: '#4C1D95',
        },
        'legend-gold': {
          50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A',
          300: '#FCD34D', 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706',
        },
        'cream': { 50: '#FFFBEB' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

### 1.3 Global Styles
Update `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-cream-50 text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-royal-purple-700 text-white px-6 py-3 rounded-xl font-semibold 
           hover:bg-royal-purple-800 transition-all;
  }
  .btn-secondary {
    @apply border-2 border-royal-purple-700 text-royal-purple-700 px-6 py-3 
           rounded-xl font-semibold hover:bg-royal-purple-50 transition-all;
  }
  .card {
    @apply bg-white rounded-2xl shadow-lg p-6 border border-gray-100;
  }
}
```

---

## Step 2: Layout Setup

### 2.1 Root Layout
Create `src/app/layout.tsx`:
```tsx
export const metadata = {
  title: 'LittleLegend - Where Every Legend Begins',
  description: 'Capture every step of your child\'s journey',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-cream-50">{children}</body>
    </html>
  );
}
```

---

## Step 3: Landing Page

Create `src/app/page.tsx` with:
1. Navigation bar with logo
2. Hero section with headline and CTA
3. Features grid (3 cards)
4. CTA section
5. Footer

Use the existing page.tsx as reference.

---

## Step 4: Authentication Pages

### 4.1 Login Page
Create `src/app/login/page.tsx`:
- Email/password form
- Google OAuth button
- Link to signup

### 4.2 Signup Page
Create `src/app/signup/page.tsx`:
- Multi-step form (user info → child info)
- Form validation
- Google OAuth

---

## Step 5: Dashboard

### 5.1 Dashboard Layout
Create `src/app/dashboard/page.tsx`:
- Top navigation bar
- Child profile card
- Stats widgets (activities, categories, this month)
- Recent activities list
- Category breakdown sidebar

### 5.2 Components Needed

#### ActivityCard
```tsx
interface ActivityCardProps {
  title: string;
  date: string;
  category: string;
  icon: string;
}
```

#### ChildCard
```tsx
interface ChildCardProps {
  name: string;
  age: number;
  avatar: string;
  activities: number;
}
```

#### CategoryBar
```tsx
interface CategoryBarProps {
  name: string;
  count: number;
  total: number;
  color: string;
}
```

---

## Step 6: Activity Management

### 6.1 Add Activity Page
Create `src/app/activity/new/page.tsx`:
- Category selector (Sports, Arts, Academic, etc.)
- Activity details form
- File upload (certificates, photos)
- Save button

### 6.2 Activity Form Component
Create `src/components/activity/ActivityForm.tsx`:
```tsx
interface ActivityFormData {
  category: string;
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  grade?: string;
}
```

### 6.3 Timeline View
Create `src/app/child/[id]/page.tsx`:
- Chronological list of activities
- Grouped by year
- Filter by category

---

## Step 7: CV Generation

### 7.1 CV Preview Page
Create `src/app/cv/page.tsx`:
- Age selector (5, 10, 14, 16, 18)
- Live preview of CV
- Professional template
- Download PDF button

### 7.2 CV Template Component
Create `src/components/cv/CVTemplate.tsx`:
```tsx
interface CVData {
  child: Child;
  activities: Activity[];
  age: number;
}
```

---

## Step 8: State Management

### 8.1 Create Auth Context
Create `src/lib/auth.tsx`:
```tsx
interface AuthContext {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

### 8.2 Mock Data
Create `src/lib/mock-data.ts`:
```typescript
export const mockChild = { ... };
export const mockActivities = [ ... ];
export const mockCategories = [ ... ];
```

---

## Step 9: Navigation

### 9.1 Navbar Component
Create `src/components/layout/Navbar.tsx`:
- Logo
- Navigation links
- User menu (dropdown)
- Add button

### 9.2 Sidebar Component
Create `src/components/layout/Sidebar.tsx`:
- Child selector
- Menu items (Dashboard, Timeline, CV, Settings)
- Collapsible on mobile

---

## Step 10: Styling Polish

### 10.1 Responsive Design
- Mobile: Stack everything vertically
- Tablet: 2-column layouts
- Desktop: Full sidebar + content

### 10.2 Animations
- Page transitions (fade)
- Button hover effects
- Card hover shadows
- Loading states

---

## File Checklist

### Pages
- [ ] `/` - Landing
- [ ] `/login` - Login
- [ ] `/signup` - Signup
- [ ] `/dashboard` - Dashboard
- [ ] `/child/[id]` - Child profile
- [ ] `/activity/new` - Add activity
- [ ] `/cv` - CV preview

### Components
- [ ] `Navbar.tsx`
- [ ] `Sidebar.tsx`
- [ ] `Footer.tsx`
- [ ] `ActivityCard.tsx`
- [ ] `ActivityForm.tsx`
- [ ] `ChildCard.tsx`
- [ ] `Timeline.tsx`
- [ ] `CVTemplate.tsx`
- [ ] `CategoryBar.tsx`

### Lib
- [ ] `utils.ts` - Helper functions
- [ ] `auth.ts` - Auth utilities
- [ ] `mock-data.ts` - Mock data
- [ ] `types.ts` - TypeScript types

---

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## Testing

Open browser and navigate:
1. `http://localhost:3000` - Landing page
2. `http://localhost:3000/login` - Login
3. `http://localhost:3000/signup` - Signup
4. `http://localhost:3000/dashboard` - Dashboard

---

## Next Steps After Implementation

1. **Connect Real Backend**
   - Replace mock data with API calls
   - Implement authentication
   - Add file upload

2. **Add Features**
   - Multiple children support
   - Institution verification
   - Sharing functionality
   - PDF export

3. **Polish**
   - Add more animations
   - Improve accessibility
   - Optimize performance
   - Add tests

---

## Reference

- **Design**: See `../design/BRAND_IDENTITY.md`
- **Architecture**: See `../docs/TECHNICAL_ARCHITECTURE.md`
- **WindSurf Guide**: See `../WINDSURF.md`
