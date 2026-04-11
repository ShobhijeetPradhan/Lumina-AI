import { supabase } from '../lib/supabaseClient';

/**
 * @param {string} email 
 * @param {string} password 
 * @param {string} fullName 
 */
export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName, 
      },
    },
  });
  if (error) throw error;
  return data;
};

/**
 * @param {string} email 
 * @param {string} password 
 */
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};