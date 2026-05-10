// src/lib/supabase.js
// ==========================================
// SETUP INSTRUCTIONS:
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Go to Settings > API and copy your URL and anon key
// 4. Replace the values below
// 5. Run this SQL in Supabase SQL Editor to create the table:
//
// CREATE TABLE appointments (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   name TEXT NOT NULL,
//   phone TEXT NOT NULL,
//   email TEXT,
//   service TEXT NOT NULL,
//   date DATE NOT NULL,
//   time_slot TEXT NOT NULL,
//   message TEXT,
//   status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- Enable Row Level Security
// ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
//
// -- Allow anyone to insert (for booking form)
// CREATE POLICY "Anyone can book" ON appointments FOR INSERT WITH CHECK (true);
//
// -- Only authenticated users (you) can view/update
// CREATE POLICY "Auth users can view all" ON appointments FOR SELECT USING (auth.role() = 'authenticated');
// CREATE POLICY "Auth users can update" ON appointments FOR UPDATE USING (auth.role() = 'authenticated');
// ==========================================

import { createClient } from '@supabase/supabase-js';

// Force rebuild with env vars v2
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Check if Supabase is properly configured
export const isSupabaseConfigured = SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY' && SUPABASE_URL.startsWith('https://');

// Create client only if configured
let supabase = null;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
}

export { supabase };

export async function signInAdmin(email, password) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not configured. Please set up Supabase in .env file.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

export async function signOutAdmin() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not configured. Please set up Supabase in .env file.');
  }

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return data?.user || null;
}

// ---- Appointment Functions ----

export async function createAppointment(data) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not configured. Please set up Supabase in .env file.');
  }

  const { data: result, error } = await supabase
    .from('appointments')
    .insert([{
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service,
      date: data.date,
      time_slot: data.time_slot,
      message: data.message || null,
      status: 'pending'
    }])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getAllAppointments() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not configured. Please set up Supabase in .env file.');
  }

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateAppointmentStatus(id, status) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not configured. Please set up Supabase in .env file.');
  }

  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAppointmentsByDate(date) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not configured. Please set up Supabase in .env file.');
  }

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('date', date)
    .order('time_slot');

  if (error) throw error;
  return data;
}
