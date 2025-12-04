# Newsletter Signup System

Complete newsletter signup system for ZeroToVPN with multiple touchpoints and GDPR compliance.

## Components

### 1. NewsletterForm
**File:** `newsletter-form.tsx`

Reusable newsletter form component with three variants:
- **default**: Full form with labels and detailed layout
- **compact**: Minimal form for sidebars and tight spaces
- **inline**: Single-line form with button next to input

**Props:**
- `variant`: "default" | "compact" | "inline"
- `source`: string (tracks where signup originated)
- `className`: string (additional CSS classes)

**Features:**
- Email validation
- GDPR consent checkbox
- Loading states
- Success/error messages
- Multi-language support via next-intl

### 2. NewsletterPopup
**File:** `newsletter-popup.tsx`

Timed popup that appears after 30 seconds on page.

**Features:**
- Shows once per session (sessionStorage)
- Permanent dismiss option (30 days in localStorage)
- Gradient background styling
- "Don't show again" link
- Uses Dialog component from shadcn/ui

### 3. NewsletterFooter
**File:** `newsletter-footer.tsx`

Compact newsletter signup for the site footer.

**Features:**
- Compact variant of NewsletterForm
- Fits in footer grid layout
- Source tracking: "footer"

### 4. NewsletterBlogCTA
**File:** `newsletter-blog-cta.tsx`

Call-to-action component for end of blog posts.

**Features:**
- Eye-catching card design
- Gradient background
- Mail icon
- Compact form variant
- Source tracking: "blog"

## API Route

**File:** `src/app/api/newsletter/subscribe/route.ts`

**Endpoint:** `POST /api/newsletter/subscribe`

**Request Body:**
```json
{
  "email": "user@example.com",
  "language": "en",
  "source": "popup"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed!"
}
```

**Features:**
- Email validation (regex)
- Rate limiting (5 requests per minute per IP)
- Duplicate prevention
- Database storage via Drizzle ORM
- Error handling

**Rate Limiting:**
- Window: 60 seconds
- Max requests: 5 per IP
- Returns 429 status when exceeded

## Database Schema

Uses existing `subscribers` table from Drizzle schema:

```typescript
{
  id: string (UUID)
  email: string (unique)
  language: string (default: "en")
  source: string (tracks signup origin)
  confirmed: boolean (default: false)
  confirmedAt: timestamp (nullable)
  createdAt: timestamp
}
```

## Integration Points

### 1. Layout (src/app/[locale]/layout.tsx)
Added `<NewsletterPopup />` component

### 2. Footer (src/components/footer.tsx)
Added `<NewsletterFooter />` in 6th column of footer grid

### 3. Blog Posts (manual integration)
Import and add `<NewsletterBlogCTA />` at end of blog articles:

```tsx
import { NewsletterBlogCTA } from "@/components/newsletter/newsletter-blog-cta";

// At end of blog post content
<NewsletterBlogCTA />
```

## Translations

All text is in `src/messages/en.json` under `newsletter` key:

```json
"newsletter": {
  "title": "Stay Updated",
  "subtitle": "Get the latest VPN deals...",
  "placeholder": "Enter your email",
  "emailLabel": "Email address",
  "subscribe": "Subscribe",
  "subscribing": "Subscribing...",
  "success": "Thanks for subscribing!",
  "checkEmail": "Check your email to confirm",
  "error": "Something went wrong",
  "consent": "I agree to receive emails...",
  "consentRequired": "Please agree to receive emails",
  "privacy": "We respect your privacy...",
  "popupTitle": "Get Exclusive VPN Deals! 🔒",
  "popupSubtitle": "Join thousands of users...",
  "dontShowAgain": "Don't show this again",
  "footerTitle": "Newsletter",
  "footerSubtitle": "Get exclusive VPN deals",
  "blogCtaTitle": "Never Miss a VPN Deal",
  "blogCtaSubtitle": "Get weekly VPN reviews..."
}
```

**TODO:** Translate to other languages (nl, de, es, fr, zh, ja, ko, th)

## Usage Examples

### Footer (Already Integrated)
```tsx
import { NewsletterFooter } from "@/components/newsletter/newsletter-footer";

<NewsletterFooter />
```

### Blog Post
```tsx
import { NewsletterBlogCTA } from "@/components/newsletter/newsletter-blog-cta";

// End of article
<NewsletterBlogCTA />
```

### Custom Form
```tsx
import { NewsletterForm } from "@/components/newsletter/newsletter-form";

<NewsletterForm
  variant="compact"
  source="custom-page"
  className="my-4"
/>
```

## GDPR Compliance

✅ Explicit consent checkbox required
✅ Clear privacy text ("We respect your privacy...")
✅ Unsubscribe mention in consent text
✅ Email not submitted unless consent checked
✅ Source tracking for transparency

## Future Enhancements

1. **Email Verification Flow**
   - Send confirmation email
   - Add confirmation token to schema
   - Create confirmation endpoint

2. **Email Service Provider Integration**
   - SendGrid / Mailgun / Mailchimp
   - Automated welcome email
   - Newsletter campaigns

3. **Unsubscribe Functionality**
   - Unsubscribe page
   - One-click unsubscribe links
   - Update database on unsubscribe

4. **Analytics**
   - Track conversion rates by source
   - A/B testing different copy
   - Popup timing optimization

5. **Advanced Features**
   - Preference center (frequency, topics)
   - Double opt-in
   - Segmentation by interest
   - Name collection (optional field)

## Testing

### Manual Testing Checklist

- [ ] Form submits successfully
- [ ] Email validation works
- [ ] Consent checkbox is required
- [ ] Loading state shows during submit
- [ ] Success message displays
- [ ] Error handling works
- [ ] Duplicate emails handled gracefully
- [ ] Rate limiting triggers at 5 requests
- [ ] Popup shows after 30 seconds
- [ ] Popup dismisses and doesn't show again in session
- [ ] "Don't show again" works for 30 days
- [ ] Footer form submits correctly
- [ ] All translations load properly
- [ ] Database stores subscriber correctly
- [ ] Mobile responsive design

### Database Query

Check subscribers in database:
```sql
SELECT * FROM "Subscriber" ORDER BY "createdAt" DESC LIMIT 10;
```

## File Structure

```
src/
├── components/
│   └── newsletter/
│       ├── index.ts                    # Exports
│       ├── newsletter-form.tsx         # Core form component
│       ├── newsletter-popup.tsx        # Timed popup
│       ├── newsletter-footer.tsx       # Footer variant
│       ├── newsletter-blog-cta.tsx     # Blog CTA
│       └── README.md                   # This file
├── app/
│   └── api/
│       └── newsletter/
│           └── subscribe/
│               └── route.ts            # API endpoint
└── messages/
    └── en.json                         # Translations (newsletter key)
```

## Dependencies Used

- **shadcn/ui:** Dialog, Button, Input, Checkbox, Label, Card
- **next-intl:** Translations and locale detection
- **lucide-react:** Icons (Mail, Check, Loader2, X)
- **drizzle-orm:** Database queries
- **@neondatabase/serverless:** Database connection

All dependencies are already in the project.
