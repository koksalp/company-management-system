function getPasswordStrength(password) {
  if (typeof password !== "string") {
    return { score: 0, label: "invalid" };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let label = "weak";

  if (score >= 5) label = "strong";
  else if (score >= 3) label = "medium";

  return { score, label };
}

function validateUsername(username) {
  if (typeof username !== "string") {
    return "username must be a string";
  }

  if (username.length < 3 || username.length > 30) {
    return "username must be between 3 and 30 characters";
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "username can only contain letters, numbers, and underscores";
  }

  return null;
}

function validatePassword(password) {
  if (typeof password !== "string") {
    return "password must be a string";
  }

  if (password.length < 8) {
    return "password must be at least 8 characters long";
  }

  if (!/[A-Z]/.test(password)) {
    return "password must contain at least one uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "password must contain at least one lowercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "password must contain at least one number";
  }

  const strength = getPasswordStrength(password);

  if (strength.label === "weak") {
    return "password is too weak";
  }

  return null;
}

module.exports = {
  validateUsername,
  validatePassword,
  getPasswordStrength
}; 

