/*
 * Helper functions to validate user information format during login, registration, edit profile
 * and add/edit practice plan.
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

export function validateEdits(name: string, dob: string, instruments: string[], level: string, oldPassword: string, newPassword: string, confPassword: string): string | null
{
    if (!name || !dob || !instruments || !level) {
        return 'All fields, except the ones related to passwords, are required.';
    }

    const dateElem = dob.split("/");
    const convDate  = new Date(parseInt(dateElem[2]), parseInt(dateElem[0]) - 1, parseInt(dateElem[1]));
    if (convDate >= new Date()) {
        return 'Date of birth is invalid.'
    }

    if (oldPassword && newPassword && confPassword) {
        if (newPassword.length < 8) {
            return 'New password should be at least 8 characters long.';
        }
          
        if (newPassword !== confPassword) {
            return 'New and confirmed passwords do not match.';
        }
    }
    else if (oldPassword || newPassword || confPassword) {
        return 'To change your password, all three password fields are required.'
    }
  
    return null; // No validation errors
}

export function validatePracticePlan(title: string, piece: string, composer: string, instrument: string): string | null
{
    if (!title || !piece || !composer || !instrument) {
        return 'All editable fields are required.';
    }
  
    return null; // No validation errors
}
