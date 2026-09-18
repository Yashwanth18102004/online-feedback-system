const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const loginBtn = document.getElementById('loginBtn');
const passcodeInput = document.getElementById('passcode');
const loginError = document.getElementById('loginError');
const logoutLink = document.getElementById('logoutLink');

const searchInput = document.getElementById('searchInput');
const ratingFilter = document.getElementById('ratingFilter');
const sortOrder = document.getElementById('sortOrder');
const tableBody = document.getElementById('feedbackTableBody');

const statTotal = document.getElementById('statTotal');
const statAvg = document.getElementById('statAvg');
const statFiveStar = document.getElementById('statFiveStar');

const SESSION_KEY = 'cf_admin_authed';

// NOTE: This is a simple demo-level passcode gate stored in this file's
// companion backend check is NOT performed here — for a real production
// admin panel, verify the passcode against a hashed value on the server
// and issue a signed session/JWT instead of trusting the client alone.
async function checkPasscode(value) {
  try {
    const res = await fetch('/api/feedback/stats');
    // We don't actually validate the passcode server-side in this simple
    // demo; the passcode is compared against a value baked in at build time
    // via a meta tag, falling back to a default for local testing.
    const expected = document.querySelector('meta[name="admin-passcode"]')?.content || 'admin123';
    return value === expected;
  } catch {
    return false;
  }
}

function showDashboard() {
  loginView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  loadStats();
  loadFeedback();
}

function showLogin() {
  dashboardView.classList.add('hidden');
  loginView.classList.remove('hidden');
}

if (sessionStorage.getItem(SESSION_KEY) === 'true') {
  showDashboard();
}

loginBtn.addEventListener('click', async () => {
  const ok = await checkPasscode(passcodeInput.value);
  if (ok) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    loginError.style.display = 'none';
    showDashboard();
  } else {
    loginError.style.display = 'block';
  }
});

passcodeInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') loginBtn.click();
});

logoutLink.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem(SESSION_KEY);
  showLogin();
});

async function loadStats() {
  try {
    const res = await fetch('/api/feedback/stats');
    const data = await res.json();
    statTotal.textContent = data.total ?? 0;
    statAvg.textContent = data.avgRating ?? 0;
    statFiveStar.textContent = data.fiveStar ?? 0;
  } catch {
    // silently ignore stat load failures
  }
}

function starsHtml(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

async function loadFeedback() {
  tableBody.innerHTML = '<tr><td colspan="6" class="empty-state">Loading feedback...</td></tr>';

  const params = new URLSearchParams();
  if (searchInput.value.trim()) params.set('search', searchInput.value.trim());
  if (ratingFilter.value) params.set('rating', ratingFilter.value);
  params.set('sort', sortOrder.value);

  try {
    const res = await fetch(`/api/feedback?${params.toString()}`);
    const data = await res.json();
    const list = data.feedback || [];

    if (list.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No feedback found.</td></tr>';
      return;
    }

    tableBody.innerHTML = list
      .map(
        (f) => `
        <tr>
          <td>${escapeHtml(f.name)}</td>
          <td>${escapeHtml(f.email)}</td>
          <td class="stars-display">${starsHtml(f.rating)}</td>
          <td>${escapeHtml(f.message)}</td>
          <td>${new Date(f.createdAt).toLocaleDateString()}</td>
          <td><button class="btn btn-danger small" data-id="${f._id}">Delete</button></td>
        </tr>`
      )
      .join('');

    tableBody.querySelectorAll('button[data-id]').forEach((btn) => {
      btn.addEventListener('click', () => handleDelete(btn.dataset.id));
    });
  } catch (err) {
    tableBody.innerHTML = '<tr><td colspan="6" class="empty-state">Error loading feedback.</td></tr>';
  }
}

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this feedback?')) return;
  try {
    await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
    loadStats();
    loadFeedback();
  } catch {
    alert('Failed to delete feedback.');
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

let searchDebounce;
searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(loadFeedback, 300);
});
ratingFilter.addEventListener('change', loadFeedback);
sortOrder.addEventListener('change', loadFeedback);
