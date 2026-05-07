// auth.js — localStorage session layer
// Swap this file's internals for Supabase calls when ready; all page code stays the same.

const _DEMO = {
  id: 'demo',
  email: 'demo@virtualpersonal.ai',
  password: 'Demo1234',
  firstName: 'Alex',
  lastName: 'Williams',
  company: 'ScaleFlow Inc.',
  role: 'client'
};

function vpGetSession() {
  try { return JSON.parse(localStorage.getItem('vp-session')); }
  catch { return null; }
}

function _vpSetSession(u) {
  localStorage.setItem('vp-session', JSON.stringify({
    userId: u.id,
    email: u.email,
    name: u.firstName + ' ' + u.lastName,
    firstName: u.firstName,
    lastName: u.lastName,
    company: u.company || '',
    role: u.role || 'client'
  }));
}

function vpRequireAuth() {
  const s = vpGetSession();
  if (!s) { window.location.replace('login.html'); return null; }
  return s;
}

function vpSignOut() {
  localStorage.removeItem('vp-session');
  window.location.href = 'login.html';
}

function vpSignIn(email, password) {
  const e = email.trim().toLowerCase();
  if (e === _DEMO.email.toLowerCase() && password === _DEMO.password) {
    _vpSetSession(_DEMO);
    return { ok: true };
  }
  const users = JSON.parse(localStorage.getItem('vp-users') || '[]');
  const u = users.find(x => x.email === e && x.password === password);
  if (u) { _vpSetSession(u); return { ok: true }; }
  return { ok: false, error: 'Invalid email or password.' };
}

function vpSignUp(data) {
  const users = JSON.parse(localStorage.getItem('vp-users') || '[]');
  const e = data.email.trim().toLowerCase();
  if (e === _DEMO.email.toLowerCase() || users.find(u => u.email === e)) {
    return { ok: false, error: 'An account with this email already exists.' };
  }
  const u = {
    id: 'u_' + Date.now(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: e,
    password: data.password,
    company: data.company || '',
    role: data.role || 'client',
    createdAt: new Date().toISOString()
  };
  users.push(u);
  localStorage.setItem('vp-users', JSON.stringify(users));
  _vpSetSession(u);
  return { ok: true };
}

// Populate any element with data-vp-name / data-vp-email / data-vp-initials / data-vp-company
function vpFillProfile() {
  const s = vpGetSession();
  if (!s) return;
  document.querySelectorAll('[data-vp-name]').forEach(el => el.textContent = s.name);
  document.querySelectorAll('[data-vp-firstname]').forEach(el => el.textContent = s.firstName);
  document.querySelectorAll('[data-vp-email]').forEach(el => el.textContent = s.email);
  document.querySelectorAll('[data-vp-company]').forEach(el => el.textContent = s.company || 'My Company');
  document.querySelectorAll('[data-vp-initials]').forEach(el => {
    el.textContent = ((s.firstName[0] || '') + (s.lastName[0] || '')).toUpperCase();
  });
}
