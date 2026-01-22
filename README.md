# Buyzaar e-commerce Frontend 

Hey! This is the frontend for my e-commerce project. I spent a lot of time on this and honestly learned so much about Next.js and React along the way. It's built with Next.js 15, TypeScript, Redux and Tailwind CSS. The whole thing connects to my backend API for authentication, products, and payments through Stripe.

## Quick Start

First, install the dependencies:

```bash
npm install
```

Then set up your environment variables. Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Make sure your backend is running, then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) -> you should see a frontpage, unless your backend isn't running.

If auth feels “stuck”, it’s usually cookies/credentials stuff: make sure requests are sending cookies (axios `withCredentials: true`) and your backend CORS origin matches `http://localhost:3000`.

## What I Built

Here's what frontend does:

- **Authentication** - Sign up, sign in, forgot password, email verification. All the tokens are handled with httpOnly cookies so it's secure
- **Product Browsing** - Homepage with a hero section and bestsellers section, category pages with pagination, search(works)
- **Shopping Cart** - Managed with Redux but also saved to cookies so it survives page refreshes
- **Checkout** - Stripe integration, users can pay for products and get redirected to a success page
- **User Settings** - Profile page, change password, preferences (currency, country, email notifications), order history

## Tech Stack

Here's what I used:

- **Next.js 15**,
- **React 19**,
- **TypeScript**,
- **Tailwind CSS**,
- **Redux Toolkit**,
- **Axios**,
- **Stripe**,

## Folder Structure

```
e-commerce-website-frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Login, signup, forgot password, etc
│   ├── (cart)/            # Shopping cart page
│   ├── (categories)/      # Category listing and individual category
│   ├── (profile)/         # User profile page
│   ├── (search)/          # Search results
│   ├── (settings)/        # All the settings pages
│   │   ├── personal/      # Update name, email, phone
│   │   ├── preferences/   # Currency, country, notifications
│   │   ├── security/      # Change password
│   │   └── orders/        # Order history
│   ├── (success)/         # After successful payment
│   └── products/          # Product pages
├── components/            # All the React components
│   ├── auth/              # Login/signup forms
│   ├── cart/              # Cart stuff
│   ├── categories/        # Product grids, pagination
│   ├── mainPage/          # Hero, bestsellers, categories section
│   ├── profilePage/       # Profile components
│   ├── rootLayout/        # Navbar, footer
│   ├── settingsComponents/ # Settings forms
│   └── successPage/       # Success page content
├── lib/                   # API clients and utilities
├── services/              # API service functions
├── store/                 # Redux store, slices, selectors
└── utils/                 # Helper functions and interfaces
```

## How Some Stuff Works

### Cart

The cart is stored in cookies and managed with Redux. When you add something, it updates the store and the cookies. 

### Authentication

Everything goes through httpOnly cookies so JavaScript can't access the tokens directly. The backend handles all the JWT stuff, and the frontend just makes requests. Protected routes redirect to login if you're not authenticated.

### Payments

1. User fills their cart
2. Clicks checkout
3. Frontend creates an order through the API
4. Backend creates a Stripe Checkout Session
5. User gets redirected to Stripe's payment page
6. After payment, they land on the success page
7. Cart gets cleared automatically

### Settings

Settings are split into a few focused pages:

- **Personal** – Update your name, email and phone. You can toggle edit mode, change the fields, and either save or cancel. There’s basic validation for things like email format, name length and phone digits, plus small success/error banners so you know if it actually saved.
- **Preferences** – Pick your country, preferred currency and whether you want email notifications. Same inline edit pattern: click edit, change the values, save or cancel. Simple validation makes sure you don’t leave important stuff empty.
- **Orders** – Read‑only list of your past orders and their statuses, accessible from the settings area.
- **Security** – Dedicated page for changing your password. It checks current password, enforces a strong new password and makes sure both new password fields match before sending anything to the backend.

## Environment Variables

```env
# Your backend URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# This frontend's URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional (only if you later add Stripe Elements on the frontend)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

## Building for Production

```bash
npm run build
npm start
```

## Things I Still Wanna Do

- [ ] Maybe add an admin panel?
- [ ] Product reviews and ratings

## Bugs? Questions?

If something's broken or confusing, feel free to open an issue. Im still learning after all!

