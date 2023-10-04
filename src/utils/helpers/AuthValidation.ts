/*
 * Helper functions to validate user information (i.e., Name, Email,
 * Password) format during login and registration.
 */


export function validateRegistrationFormat(name: string, email: string, newPassword: string, confPassword: string): string | null
{
    if (!name || !email || !newPassword || !confPassword) {
        return 'All fields are required.';
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
