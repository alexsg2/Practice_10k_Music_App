/*
 * Helper functions to validate user information during edit mode.
 */

export function validateProfileEditFormat(name: string, dob: string, instruments: string[], level: string[], email: string, oldPassword: string, newPassword: string, confPassword: string): string | null
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

    // TODO : check against password in DB
    // if (oldPassword.length !== newPassword) {
    //     return 'Old password is incorrect.';
    // }    
  
    if (newPassword.length < 8) {
      return 'Password should be at least 8 characters long.';
    }
    
    if (newPassword !== confPassword) {
        return 'Passwords do not match.';
    }
  
    return null; // No validation errors
}
