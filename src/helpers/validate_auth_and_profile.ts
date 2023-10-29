/*
 * Helper functions to validate user information format during login, registration and edit profile.
 */

export function validateLoginFormat(email: string, password: string): string | null
{
    if (!email || !password) {
        return 'All fields are required.';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email format is invalid.';
    }
  
    return null; // No validation errors
}

export function validateRegistrationFormat(name: string, dob: string, instruments: string[], level: string[], email: string, newPassword: string, confPassword: string): string | null
{
    if (!name || !dob || !instruments || !level || !email || !newPassword || !confPassword) {
        return 'All fields are required.';
    }

    const dateElem = dob.split("/");
    const convDate  = new Date(parseInt(dateElem[2]), parseInt(dateElem[0]) - 1, parseInt(dateElem[1]));
    if (convDate >= new Date()) {
        return 'Date of birth is invalid.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email format is invalid.';
    }
  
    if (newPassword.length < 8) {
      return 'Password should be at least 8 characters long.';
    }
    
    if (newPassword !== confPassword) {
        return 'Passwords do not match.';
    }
  
    return null; // No validation errors
}

export function validateEdits(name: string, dob: string, instruments: string[], level: string): string | null
{
    if (!name || !dob || !instruments || !level) {
        return 'All fields are required.';
    }

    const dateElem = dob.split("/");
    const convDate  = new Date(parseInt(dateElem[2]), parseInt(dateElem[0]) - 1, parseInt(dateElem[1]));
    if (convDate >= new Date()) {
        return 'Date of birth is invalid.'
    }
  
    return null; // No validation errors
}
