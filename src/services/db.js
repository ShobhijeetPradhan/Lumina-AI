import { supabase } from '../lib/supabaseClient';

/**
 * @param {string} userId - The UUID of the authenticated user.
 * @param {string} title - The title provided by the user or generated.
 * @param {string} content - The AI-generated summary text.
 * @param {string} type - 'text', 'pdf', or 'url'.
 * @param {string} sourceUrl - Optional URL if the type is 'url'.
 */
export const saveSummary = async (userId, title, content, type, sourceUrl = null) => {
  try {
    const { data, error } = await supabase
      .from('summaries')
      .insert([
        {
          user_id: userId,
          title: title || `Untitled ${type.toUpperCase()} Summary`,
          content: content,
          type: type,
          source_url: sourceUrl,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Database Save Error:", error.message);
    throw new Error("Summary generated, but Lumina Core couldn't save it to your history.");
  }
};

export const getUserHistory = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('summaries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Database Fetch Error:", error.message);
    throw new Error("Could not retrieve your summary history.");
  }
};

export const deleteSummary = async (summaryId) => {
  try {
    const { error, count } = await supabase
      .from('summaries')
      .delete({ count: 'exact' }) // Add this to see if any row was actually hit
      .eq('id', summaryId);

    if (error) throw error;
    
    if (count === 0) {
      throw new Error("Permission denied or record not found.");
    }

    return true;
  } catch (error) {
    console.error("Database Delete Error:", error.message);
    throw new Error(error.message || "Failed to delete the summary.");
  }
};