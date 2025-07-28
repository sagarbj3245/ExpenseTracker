// signup.js

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert('✅ Signup successful! Please login.');
      window.location.href = '/login';
    } else {
      const data = await res.json();
      alert(data.message || '❌ Signup failed.');
    }
  } catch (err) {
    console.error('Signup error:', err);
    alert('Something went wrong. Please try again.');
  }
});
