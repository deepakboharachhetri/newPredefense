# Application Navigation & Routes

## Routes

### Public Routes

#### `/` - Landing Page
**Components:**
- Header (with navigation to Dashboard)
- Hero (with CTA button linking to Dashboard)
- TrustedBy
- BentoGrid (feature showcase)
- DeepDive (detailed features)
- Testimonials
- Footer

**Navigation:**
- "Get Started" button → `/dashboard`
- "Dashboard" link in header → `/dashboard`
- Logo → `/` (home)

#### `/dashboard` - Dashboard Application
**Components:**
- Sidebar (collapsible, with logo linking to `/`)
- TopBar
- Main Content Area with Widgets:
  - Live Traffic Widget
  - Threat Counter Widget
  - System Vitals Widget
  - Quarantine Widget
  - Historical Analytics Widget

**Navigation:**
- Logo in sidebar → `/` (landing page)
- Sidebar navigation items (Dashboard, Live Traffic, Threats, etc.)

#### `*` - 404 Not Found
**Components:**
- 404 error page
- Buttons to navigate to `/` or `/dashboard`

## User Flow

### New Visitor Flow
1. Land on `/` (Landing Page)
2. Browse features, pricing, testimonials
3. Click "Get Started" or "Dashboard" → `/dashboard`
4. Explore dashboard features

### Returning User Flow
1. Direct to `/dashboard` bookmark
2. Use application
3. Click logo to return to `/` if needed

## Navigation Components

### Header (Landing Page)
- Desktop: Logo, Nav Links, Dashboard link, Get Started button
- Mobile: Logo, Hamburger menu with all links

### Sidebar (Dashboard)
- Logo (links to home)
- Navigation items
- User profile section
- Dark mode toggle
- Collapse/expand toggle

## State Management

### Route State
- Managed by React Router v7
- Browser history for back/forward navigation
- Clean URLs without hash routing

### Component State
- Sidebar collapse state (Dashboard)
- Mobile menu state (Landing Page)
- Active navigation item (Dashboard)
- Dark mode preference (Dashboard)

## Accessibility

- Semantic HTML navigation
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## Future Enhancements

### Suggested Additional Routes
- `/login` - Authentication page
- `/signup` - Registration page
- `/dashboard/settings` - User settings
- `/dashboard/analytics` - Detailed analytics
- `/dashboard/alerts` - Alert management
- `/pricing` - Detailed pricing page
- `/about` - About page
- `/contact` - Contact page
- `/docs` - Documentation

### Protected Routes
When adding authentication:
```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/dashboard/settings" element={<Settings />} />
</Route>
```

### Route Guards
```tsx
const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};
```

## URL Structure Best Practices

Current implementation follows:
- ✅ Clean URLs (no hash)
- ✅ Semantic paths
- ✅ Consistent naming
- ✅ Easy to remember
- ✅ SEO friendly (for landing page)

## Deep Linking

All routes support direct access:
- `http://localhost:8080/` → Landing Page
- `http://localhost:8080/dashboard` → Dashboard
- `http://localhost:8080/any-other-path` → 404

Ensure server configuration redirects all requests to `index.html` for SPA routing to work correctly.
