export async function loginOrSignup(email, password, name) {
  const apiBaseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL || '';
  const endpoint = name
    ? `${apiBaseUrl}/api/auth/signup`.replace(/([^:]\/)\/+/g, "$1") // Remove double slashes
    : `${apiBaseUrl}/api/auth/login`.replace(/([^:]\/)\/+/g, "$1");

  console.log("API Base URL:", apiBaseUrl);
  console.log("Endpoint:", endpoint);

  const body = name ? { name, email, password } : { email, password };
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log("Response Status:", res.status);
    return res.json();
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error;
  }
}