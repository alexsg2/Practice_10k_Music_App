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

    const convDate = new Date(dob);
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

export function validateEdits(name: string, dob: string, instruments: string[], level: string[], email: string, currPassword: string, oldPassword: string, newPassword: string, confPassword: string): string | null
{
    if (!name || !dob || !instruments || !level || !email) {
        return 'If password is not being changed, the first 5 fields are required.';
    }

    const convDate = new Date(dob);
    if (convDate >= new Date()) {
        return 'Date of birth is invalid.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email format is invalid.';
    }

    if (newPassword) {
        if (currPassword !== oldPassword) {
            return 'Old password is incorrect.';
        }
      
        if (newPassword.length < 8) {
          return 'Password should be at least 8 characters long.';
        }
        
        if (newPassword !== confPassword) {
            return 'Passwords do not match.';
        }
    }
  
    return null; // No validation errors
}
