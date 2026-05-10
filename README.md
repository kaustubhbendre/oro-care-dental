# 🦷 Oro-Care Dental Clinic Website

A professional, animated dental clinic website for **Dr. Shashank Kumar** at **Oro-Care Dental Clinic, Mumbai**.

## ✨ Features

- **Animated Hero Section** with floating stats and doctor info
- **9 Services** displayed in beautiful animated cards
- **About Section** with live counters (5000+ patients, 15+ years)
- **6 Patient Reviews** pulled from Google reviews
- **Appointment Booking Form** with full validation
- **Admin Dashboard** at `/admin` to manage all bookings
- **Database** powered by Supabase (free tier available)
- **Fully Responsive** — works on mobile, tablet, desktop
- **SEO Ready** — proper meta tags, semantic HTML

---

## 🚀 Quick Start (VS Code)

### Step 1 — Install Node.js
Download from https://nodejs.org (version 18+ recommended)

### Step 2 — Install dependencies
```bash
cd oro-care-dental
npm install
```

### Step 3 — Set up Supabase (Database)
1. Go to https://supabase.com and create a free account
2. Create a new project (choose Mumbai/Singapore region)
3. Go to **SQL Editor** and run this SQL:

```sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can book" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can view all" ON appointments FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update" ON appointments FOR UPDATE USING (auth.role() = 'authenticated');
```

4. Go to **Settings > API** and copy your **Project URL** and **anon key**

### Step 4 — Configure environment
```bash
cp .env.example .env
```
Then edit `.env` and paste your Supabase URL and anon key.

> If you deploy on Vercel, add these same values under **Project Settings → Environment Variables**:
> - `REACT_APP_SUPABASE_URL`
> - `REACT_APP_SUPABASE_ANON_KEY`
>
> After setting environment variables in Vercel, redeploy the site.

### Step 5 — Start the development server
```bash
npm start
```

Open http://localhost:3000 🎉

---

## 🔍 Google Search Console & SEO
To make sure Google finds your website:

1. Verify your site in Google Search Console.
2. Use the file or meta verification method in `public/index.html`.
3. Confirm that `https://oro-care-dental.vercel.app/robots.txt` is accessible and includes `Disallow: /admin`.
4. Confirm that `https://oro-care-dental.vercel.app/sitemap.xml` is accessible and includes only the public website pages.

> Note: The admin route `/admin` is intentionally hidden from search engines using robots rules and admin page metadata.

---

## 🛠️ VS Code Extensions (Recommended)

Install these for the best development experience:

| Extension | Purpose |
|-----------|---------|
| **ES7+ React/Redux/React-Native** | React snippets |
| **Prettier** | Auto code formatting |
| **ESLint** | Code quality |
| **Auto Rename Tag** | HTML/JSX tags |
| **Tailwind CSS IntelliSense** | (future use) |
| **GitLens** | Git tracking |

---

## 📦 Tech Stack

| Package | Purpose |
|---------|---------|
| **React 18** | UI framework |
| **React Router v6** | Page routing |
| **Framer Motion** | Smooth animations |
| **React Hook Form** | Form validation |
| **Supabase** | Database + backend |
| **React Hot Toast** | Notifications |
| **Lucide React** | Icons |
| **React CountUp** | Animated numbers |
| **React Intersection Observer** | Scroll animations |

# Redeploy trigger

---

## 📁 Project Structure

```
oro-care-dental/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky navigation
│   │   ├── Hero.jsx          # Animated hero section
│   │   ├── Services.jsx      # 9 service cards
│   │   ├── About.jsx         # Doctor info + stats
│   │   ├── Reviews.jsx       # Patient testimonials
│   │   ├── AppointmentForm.jsx  # Booking form
│   │   └── Contact.jsx       # Map + footer
│   ├── pages/
│   │   ├── Home.jsx          # Main website page
│   │   └── AdminDashboard.jsx   # Appointment manager
│   ├── lib/
│   │   └── supabase.js       # Database functions
│   ├── styles/
│   │   └── global.css        # Global styles & variables
│   ├── App.js                # Routes setup
│   └── index.js              # Entry point
├── .env.example              # Environment template
├── .gitignore
└── package.json
```

---

## 🔐 Admin Dashboard

Visit http://localhost:3000/admin to:
- View all appointment requests
- Filter by status (pending / confirmed / completed / cancelled)
- Filter by date
- Confirm or cancel appointments
- Update appointment status

> **Note**: For production, add authentication to protect the admin route.

---

## 🚢 Deployment (Free Options)

### Option 1 — Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Add your `.env` variables in Vercel dashboard > Settings > Environment Variables

### Option 2 — Netlify
```bash
npm run build
# Upload the /build folder to netlify.com
```

---

## 📞 Clinic Info

- **Doctor**: Dr. Shashank Kumar, BDS (Mum), CCOS (Delhi)
- **Reg No**: A-20141
- **Address**: G-17/B, Ganeshwadi CHS Ltd., Bldg. No. 5, Near Akruti Star, MIDC Central Road, Andheri (E), Mumbai – 400 093
- **Phone**: +91 99678 69453
- **Email**: shashank.kumar606@gmail.com
- **Rating**: 5.0 ⭐ (140 Google Reviews)
