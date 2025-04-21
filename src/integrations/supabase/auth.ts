import { supabase } from './client';

/**
 * Handles the OAuth redirect by checking for a hash in the URL and processing it
 * @returns {Promise<boolean>} True if the redirect was handled successfully, false otherwise
 */
export const handleOAuthRedirect = async (): Promise<boolean> => {
  try {
    // Check if we have a hash in the URL (for OAuth redirects)
    if (window.location.hash) {
      console.log("Processing OAuth redirect with hash:", window.location.hash);
      
      // Extract the access token and refresh token from the hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken) {
        console.log("Access token found in URL hash");
        
        // Set the session using the access token
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });
        
        if (error) {
          console.error("Error setting session:", error);
          return false;
        }
        
        console.log("Session set successfully:", data.session);
        return true;
      }
    }
    
    // If we don't have a hash or couldn't process it, try to get the session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Error getting session:", error);
      return false;
    }
    
    if (session) {
      console.log("Session retrieved successfully:", session);
      return true;
    }
    
    console.log("No session found");
    return false;
  } catch (error) {
    console.error("Error handling OAuth redirect:", error);
    return false;
  }
}; 