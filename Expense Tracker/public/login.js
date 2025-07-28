// LOGIN form logic
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('isPremium', data.isPremium);

      if (data.isPremium) {
        window.location.href = '/premium'; // Premium dashboard
      } else {
        window.location.href = '/expenses'; // Normal dashboard
      }
    } else {
      alert(data.message || 'Login failed. Please check your credentials.');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please try again later.');
  }
});

// Show Forgot Password form
document.getElementById('showForgot').addEventListener('click', () => {
  document.getElementById('forgotPasswordForm').classList.remove('d-none');
});

// Hide Forgot Password form
document.getElementById('cancelForgot').addEventListener('click', () => {
  document.getElementById('forgotPasswordForm').classList.add('d-none');
});

// Forgot Password form logic
document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('forgotEmail').value.trim();

  try {
    const res = await fetch('/password/forgotpassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    await res.json();

    alert('If your email is valid, a reset link has been sent.');
    document.getElementById('forgotPasswordForm').classList.add('d-none');
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please try again.');
  }
});
