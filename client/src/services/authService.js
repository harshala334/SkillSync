export async function loginOrSignup(email, password, name) {
  const endpoint = name ? '/api/auth/signup' : '/api/auth/login';
  const body = name ? { name, email, password } : { email, password };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}