@echo off
echo 🦷 Oro-Care Dental - Supabase Setup Helper
echo ==========================================
echo.

REM Check if .env already exists
if exist ".env" (
    echo ⚠️  .env file already exists!
    echo    Please edit it manually or delete it first.
    echo.
    exit /b 1
)

REM Copy .env.example to .env
if exist ".env.example" (
    copy .env.example .env
    echo ✅ Created .env file from .env.example
    echo.
    echo 📝 Now edit .env and add your Supabase credentials:
    echo    REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
    echo    REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
    echo.
    echo 🔗 Get these values from: Supabase Dashboard ^> Settings ^> API
    echo.
    echo 🚀 After updating .env, run: npm start
    echo.
    echo 📋 Don't forget to add the same variables to Vercel:
    echo    Vercel Dashboard ^> Your Project ^> Settings ^> Environment Variables
) else (
    echo ❌ .env.example not found!
    echo    Make sure you're in the project root directory.
)