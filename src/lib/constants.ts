export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROTECTED: "/protected",
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid login credentials",
  USER_NOT_FOUND: "User not found",
  EMAIL_NOT_CONFIRMED: "Email not confirmed",
  WEAK_PASSWORD: "Password should be at least 6 characters",
} as const;
