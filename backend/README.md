# STRATO Backend Engine™

This is the core backend for the STRATO ecosystem.

## Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database & Auth**: Supabase
- **Payments**: Stripe
- **Email**: Resend
- **AI**: OpenAI
- **Analytics**: PostHog
- **Validation**: Zod
- **Testing**: Vitest & Supertest

## Getting Started

1.  Navigate to the `backend` directory.
2.  Create a `.env` file by copying the variables below.
3.  Install dependencies: `npm install`
4.  Run the development server: `npm run @dev:backend`

## Environment Variables

Create a `.env` file in this directory (`/backend`) and add the following variables. Do not commit this file to version control.

```
# -- Application Settings --
NODE_ENV=development
PORT=3001
LOG_LEVEL=info

# -- Supabase --
# Used for database access and authentication.
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# -- Stripe --
# Used for payment processing and subscription management.
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# -- Resend --
# Used for sending transactional emails.
RESEND_API_KEY=re_...

# -- OpenAI --
# Used for AI-powered features.
OPENAI_API_KEY=sk_...

# -- PostHog --
# Used for product analytics and feature flagging.
POSTHOG_API_KEY=phc_...
```
