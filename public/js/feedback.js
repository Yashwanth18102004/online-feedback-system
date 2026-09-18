const form = document.getElementById('feedbackForm');
const formCard = document.getElementById('formCard');
const successCard = document.getElementById('successCard');
const ratingSelect = document.getElementById('ratingSelect');
const stars = ratingSelect.querySelectorAll('.star');
const serverErrorBox = document.getElementById('formServerError');

let selectedRating = 0;

// Star rating interaction
stars.forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = Number(star.dataset.value);
    updateStars();
    clearFieldError('ratingGroup');
  });
});

function updateStars() {
  stars.forEach((star) => {
    star.classList.toggle('active', Number(star.dataset.value) <= selectedRating);
  });
}

function showFieldError(groupId) {
  document.getElementById(groupId).classList.add('invalid');
}
function clearFieldError(groupId) {
  document.getElementById(groupId).classList.remove('invalid');
}

function validate() {
  let valid = true;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name) {
    showFieldError('nameGroup');
    valid = false;
  } else {
    clearFieldError('nameGroup');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    showFieldError('emailGroup');
    valid = false;
  } else {
    clearFieldError('emailGroup');
  }

  if (!selectedRating) {
    showFieldError('ratingGroup');
    valid = false;
  } else {
    clearFieldError('ratingGroup');
  }

  if (!message || message.length < 5) {
    showFieldError('messageGroup');
    valid = false;
  } else {
    clearFieldError('messageGroup');
  }

  return valid;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  serverErrorBox.style.display = 'none';

  if (!validate()) return;

  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    rating: selectedRating,
    message: document.getElementById('message').value.trim(),
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    formCard.classList.add('hidden');
    successCard.classList.remove('hidden');
  } catch (err) {
    serverErrorBox.textContent = err.message;
    serverErrorBox.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Feedback';
  }
});
