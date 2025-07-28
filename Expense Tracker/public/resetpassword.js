document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resetPasswordForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Get the request ID from the URL
    const urlParts = window.location.pathname.split('/');
    const requestId = urlParts[urlParts.length - 1];

    try {
      const res = await fetch(`/password/updatepassword/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Password updated successfully!');
        window.location.href = '/login';
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating password. Please try again.');
    }
  });
});
