document.addEventListener('DOMContentLoaded', () => {
  const token = sessionStorage.getItem('token');
  if (!token) return window.location.href = '/login';

  const form = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');
  const submitBtn = document.getElementById('submitBtn');
  const buyPremiumBtn = document.getElementById('buyPremium');
  const usernameBox = document.getElementById('usernameBox');

  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');
  const pageSize = document.getElementById('pageSize');

  let editingId = null;
  let currentPage = 1;
  let limit = parseInt(pageSize.value);

  pageSize.addEventListener('change', () => {
    limit = parseInt(pageSize.value);
    currentPage = 1;
    fetchExpenses();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const expense = {
      amount: document.getElementById('amount').value,
      description: document.getElementById('description').value,
      note: document.getElementById('note').value, 
      category: document.getElementById('category').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value
    };
    const url = editingId ? `/api/expenses/${editingId}` : '/api/expenses';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(expense)
    });

    editingId = null;
    submitBtn.textContent = 'Add Expense';
    form.reset();
    fetchExpenses();
  });

  async function fetchExpenses() {
    const res = await fetch(`/api/expenses?page=${currentPage}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    expenseList.innerHTML = '';

    data.expenses.forEach(exp => {
      const li = document.createElement('li');
      li.className = 'expense-item';
      li.innerHTML = `
        <div>₹${exp.amount} — ${exp.description} (${exp.category}) ${exp.date} <br><small>Note: ${exp.note || '-'}</small></div>
        <div class="expense-actions">
          <button data-id="${exp.id}" class="btn btn-sm btn-lightbrown edit-btn">Edit</button>
          <button data-id="${exp.id}" class="btn btn-sm btn-darkbrown delete-btn">Delete</button>
        </div>
      `;
      expenseList.appendChild(li);
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.onclick = () => {
        const exp = data.expenses.find(e => e.id == btn.dataset.id);
        document.getElementById('amount').value = exp.amount;
        document.getElementById('description').value = exp.description;
        document.getElementById('note').value = exp.note || ''; 
        document.getElementById('category').value = exp.category;
        document.getElementById('date').value = exp.date;
        document.getElementById('time').value = exp.time || '';
        editingId = exp.id;
        submitBtn.textContent = 'Update Expense';
      };
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = async () => {
        await fetch(`/api/expenses/${btn.dataset.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchExpenses();
      };
    });

    pageInfo.textContent = `Page ${currentPage} of ${data.totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= data.totalPages;
  }

  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchExpenses();
    }
  };

  nextBtn.onclick = () => {
    currentPage++;
    fetchExpenses();
  };

  buyPremiumBtn.onclick = async () => {
    const res = await fetch('/api/pay', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.paymentSessionId) {
      const cashfree = Cashfree({ mode: "sandbox" });
      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self"
      });
    } else {
      alert(data.message || 'Payment failed.');
    }
  };

  fetch('/api/user', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      usernameBox.textContent = data.name || 'User';
    });

  fetchExpenses();
});
