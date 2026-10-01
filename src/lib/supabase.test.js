import { getSupabaseConfig } from './supabase';

describe('getSupabaseConfig', () => {
  it('uses REACT_APP_ variables when present', () => {
    const env = {
      REACT_APP_SUPABASE_URL: 'https://example.supabase.co',
      REACT_APP_SUPABASE_ANON_KEY: 'anon-key',
    };

    expect(getSupabaseConfig(env)).toEqual({
      url: 'https://example.supabase.co',
      anonKey: 'anon-key',
      isConfigured: true,
    });
  });

  it('falls back to plain SUPABASE_ variables', () => {
    const env = {
      SUPABASE_URL: 'https://fallback.supabase.co',
      SUPABASE_ANON_KEY: 'fallback-key',
    };

    expect(getSupabaseConfig(env)).toEqual({
      url: 'https://fallback.supabase.co',
      anonKey: 'fallback-key',
      isConfigured: true,
    });
  });

  it('prefers the Vercel-managed Supabase variables when present', () => {
    const env = {
      REACT_APP_VERCEL_SUPABASE_SUPABASE_URL: 'https://vercel-project.supabase.co',
      REACT_APP_VERCEL_SUPABASE_SUPABASE_ANON_KEY: 'vercel-anon-key',
      REACT_APP_SUPABASE_URL: 'https://existing-project.supabase.co',
      REACT_APP_SUPABASE_ANON_KEY: 'existing-anon-key',
    };

    expect(getSupabaseConfig(env)).toEqual({
      url: 'https://vercel-project.supabase.co',
      anonKey: 'vercel-anon-key',
      isConfigured: true,
    });
  });

  it('returns false when values are missing or placeholders', () => {
    const env = {
      REACT_APP_SUPABASE_URL: 'YOUR_SUPABASE_URL',
      REACT_APP_SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',
    };

    expect(getSupabaseConfig(env)).toEqual({
      url: 'YOUR_SUPABASE_URL',
      anonKey: 'YOUR_SUPABASE_ANON_KEY',
      isConfigured: false,
    });
  });
});
