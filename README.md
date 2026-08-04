# 🦷 Oro-Care Dental Clinic Website

A polished, responsive dental clinic website for **Dr. Shashank Kumar** at **Oro-Care Dental Clinic, Mumbai**.

🌐 Live site: https://oro-care-dental.vercel.app/

## ✨ Highlights

- Beautiful animated hero section with clear calls to action
- Full treatment showcase with consultation buttons
- Smooth appointment form flow for patient bookings
- Admin dashboard for managing appointments
- Responsive design for mobile, tablet, and desktop
- SEO-friendly structure and metadata

---

## 🚀 Quick Start

This project is a React-based clinic website. The main flow is:
1. Open the homepage
2. Browse treatments and services
3. Scroll to the appointment form
4. Submit a booking request

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
# Run the setup helper (Windows)
setup-supabase.bat

# Or manually:
cp .env.example .env
```
Then edit `.env` and paste your Supabase URL and anon key.

> If you deploy on Vercel, add these same values under **Project Settings → Environment Variables**:
> - `REACT_APP_SUPABASE_URL`
> - `REACT_APP_SUPABASE_ANON_KEY`
>
> After setting environment variables in Vercel, redeploy the site.

### Step 5 — Create admin user in Supabase
1. Go to your Supabase project dashboard.
2. Open **Authentication → Users**.
3. Create a new user with a secure admin email and password.
4. Sign in at `https://<your-domain>/admin/login`.

### Step 6 — Start the development server
```bash
npm start
```

Open http://localhost:3000 🎉

### Step 7 — Deploy
This project is ready for Vercel deployment. Connect the repository and deploy the app from the main branch.

### Step 8 — Test the setup
1. Visit http://localhost:3000 and book a test appointment
2. Visit http://localhost:3000/admin/login and sign in with your admin credentials
3. Check that appointments appear in the admin dashboard

---

## 🔍 Google Search Console & SEO
To make sure Google finds your website:

1. Verify your site in Google Search Console.
2. Use the file or meta verification method in `public/index.html`.
3. Confirm that `https://oro-care-dental.vercel.app/robots.txt` is accessible and includes `Disallow: /admin` and `Disallow: /admin/login`.
4. Confirm that `https://oro-care-dental.vercel.app/sitemap.xml` is accessible and includes only the public website pages.

> Note: The admin routes `/admin` and `/admin/login` are intentionally hidden from search engines using robots rules and admin page metadata.

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

Visit `https://<your-domain>/admin/login` to:
- Sign in with your Supabase admin credentials
- View all appointment requests
- Filter by status (pending / confirmed / completed / cancelled)
- Filter by date
- Confirm or cancel appointments
- Update appointment status

> **Note**: The admin routes `/admin` and `/admin/login` are intentionally hidden from search engines using robots rules and page metadata.

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

## 📝 Release Notes

- Improved site copy to make the booking flow clearer and more welcoming.
- Added better form validation messaging and accessibility hints.
- Updated admin dashboard wording to guide Supabase setup.
- Refined review and service copy for a warmer, more personal tone.
- Verified production build succeeds after the changes.

---

## 📞 Clinic Info

- **Doctor**: Dr. Shashank Kumar, BDS (Mum), CCOS (Delhi)
- **Reg No**: A-20141
- **Address**: G-17/B, Ganeshwadi CHS Ltd., Bldg. No. 5, Near Akruti Star, MIDC Central Road, Andheri (E), Mumbai – 400 093
- **Phone**: +91 99678 69453
- **Email**: shashank.kumar606@gmail.com
- **Rating**: 5.0 ⭐ (140 Google Reviews)
