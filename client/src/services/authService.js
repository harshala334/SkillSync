export async function loginOrSignup(email, password, name) {
  const apiBaseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL || '';
  const endpoint = name ? `${apiBaseUrl}/api/auth/signup` : `${apiBaseUrl}/api/auth/login`;
  const body = name ? { name, email, password } : { email, password };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}