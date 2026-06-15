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

module.exports = { getPasswordStrength };
