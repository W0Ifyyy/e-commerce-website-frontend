# Buyzaar E-commerce Frontend

A modern, responsive e-commerce website built with Next.js 15 and TypeScript. This project delivers a comprehensive shopping experience with intuitive product browsing, seamless checkout, and a user-friendly interface.

## ✨ Features

### User Authentication

- Secure sign-up and sign-in with validation
- JWT-based authentication with HTTP-only cookies
- Protected routes and session management
- Profile management with user data

### Product Experience

- Category-based product browsing
- Detailed product pages with descriptions and images
- Featured bestseller carousel on homepage
- Product pagination for category views
- Advanced search functionality with real-time results
- Product recommendations

### Shopping & Checkout

- Persistent shopping cart using cookies
- Real-time cart updates across tabs
- Quantity management for cart items
- Cart total calculations
- Stripe payment integration
- Order creation and tracking
- Order history with detailed item breakdowns

### User Account Management

- **Profile Settings**: Update personal information (name, email, phone)
- **Security Settings**: Change password with validation
- **Preferences**: Manage currency, country, and email notification settings
- **Order History**: View all past orders with status tracking
- Member since information display

### Responsive Design

- Mobile-first approach
- Optimized for all device sizes
- Fast loading with Next.js App Router
- Smooth animations and transitions
- Accessible navigation

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 15.2.0** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom animations** - Fade-in, bounce effects
- **Heroicons** - Icon library
- **Swiper** - Carousel/slider components

### State Management & Data

- **Redux Toolkit** - Cart state management
- **Axios** - HTTP client for API calls
- **js-cookie** - Client-side cookie management

### Payment Processing

- **Stripe 18.5.0** - Secure payment integration

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **next-client-cookies** - Cookie utilities

## 📁 Project Structure

```
e-commerce-website-frontend/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                  # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (cart)/                  # Shopping cart
│   ├── (categories)/            # Category pages
│   ├── (profile)/               # User profile
│   ├── (search)/                # Search functionality
│   ├── (settings)/              # User settings
│   │   ├── personal/
│   │   ├── preferences/
│   │   ├── security/
│   │   └── orders/
│   ├── (success)/               # Order success page
│   └── products/                # Product pages
├── components/                   # React components
│   ├── auth/                    # Authentication forms
│   ├── cart/                    # Cart components
│   ├── categories/              # Category components
│   ├── mainPage/                # Homepage sections
│   ├── profilePage/             # Profile components
│   ├── rootLayout/              # Layout components
│   ├── settingsComponents/      # Settings pages
│   └── successPage/             # Success page
├── lib/                         # Utilities and configs
│   ├── api/                     # API helper functions
│   └── axios.ts                 # Axios configuration
├── services/                    # API service functions
│   ├── categories.ts
│   └── products.ts
├── utils/                       # Utility functions
│   ├── CartContext.tsx          # Cart state management
│   ├── displaySinceInfo.ts      # Date formatting
│   └── interfaces.ts            # TypeScript interfaces
└── public/                      # Static assets
```

````

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- Backend API running (default: `http://localhost:5000`)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd e-commerce-website-frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
NEXT_PUBLIC_API_URL=   (backend base URL)
# (legacy fallback also supported): NEST_PUBLIC_API_URL=
NEXT_PUBLIC_BASE_URL=  (frontend basic route)
STRIPE_SECRET_KEY=  (stripe key)
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🔑 Key Features Implementation

### Cart Management
- Cookie-based persistence
- Cross-tab synchronization
- Optimistic UI updates
- Quantity controls

### Authentication Flow
- Server-side session validation
- Protected route middleware
- Automatic redirection
- Secure cookie handling

### Payment Integration
- Stripe checkout sessions
- Order creation workflow
- Payment success handling
- Cart cleanup after purchase

### Settings Management
- Inline editing with validation
- Real-time updates
- Cancel/save functionality
- Password change with security rules

## 📝 TODO

- [ ] Settings implementation polish
- [ ] Consistent styling across all pages
- [ ] Responsive testing on all devices
- [ ] Code optimization (remove console.logs)
- [ ] Enhanced error handling
- [ ] Admin panel implementation (maybe)
- [ ] Product rating system (maybe)
- [ ] Wishlist feature (maybe)
- [ ] Convert Context to Redux (maybe)

## 🙏 Credits

Created by **W0Ifyy**

````
