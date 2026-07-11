/**
 * Validators — Input validation for forms
 */

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  return null;
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
}

export function validateBirthDate(date: Date | null): string | null {
  if (!date) return 'Date of birth is required';
  const now = new Date();
  if (date > now) return 'Date of birth cannot be in the future';
  const age = now.getFullYear() - date.getFullYear();
  if (age > 120) return 'Please enter a valid date';
  return null;
}

export function validateLocation(location: string): string | null {
  if (!location.trim()) return 'Birth location is required';
  if (location.trim().length < 3) return 'Please enter a valid location';
  return null;
}
