export function usernameErrors(username: string) {
  let regex = /^[a-zA-Z0-9]{4,10}$/;
  if (!username) return 'Name is required';
  if (regex.test(username) === false)
    return 'Username must be between 4 and 10 characters long and can contain only letters and numbers';
  //check doublon
  return '';
}

export function emailErrors(email: string) {
  let regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  if (!email)
    return ' The email address must contain only alphanumeric characters, periods, underscores, and hyphens before the @ symbol, and the domain name must have at least two characters before the period and between two to four characters after the period.';
  if (regex.test(email) === false) return `invalid email`;
  return '';
}

export function passwordErrors(password: string) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if (!password) return 'Password is required';
  if (regex.test(password) === false)
    return 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number';
  //check password confirm
  return '';
}
