// Shared State
let balance = localStorage.getItem('walletBalance') ? parseInt(localStorage.getItem('walletBalance')) : 0;
let adsWatched = localStorage.getItem('adsWatched') ? parseInt(localStorage.getItem('adsWatched')) : 0;

// DOM Elements
const balanceElements = document.querySelectorAll('#balance, #withdrawBalance');
const watchAdBtn = document.getElementById('watchAdBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const gpaySimulation = document.getElementById('gpaySimulation');
const simAmount = document.getElementById('simAmount');
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');

// Initialize
function init() {
  updateBalance();
  
  // Payment method selection
  const methods = document.querySelectorAll('.method');
  methods.forEach(method => {
    method.addEventListener('click', () => {
      methods.forEach(m => m.classList.remove('active'));
      method.classList.add('active');
    });
  });
  
  // Watch Ad functionality
  if(watchAdBtn) {
    watchAdBtn.addEventListener('click', startAd);
  }
  
  // Withdraw functionality
  if(withdrawBtn) {
    withdrawBtn.addEventListener('click', processWithdrawal);
  }
  
  // GPay simulation
  if(acceptBtn) {
    acceptBtn.addEventListener('click', completeWithdrawal);
  }
  
  if(rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      gpaySimulation.style.display = 'none';
      alert('Withdrawal cancelled. Amount remains in your wallet.');
    });
  }
}

// Update balance display
function updateBalance() {
  balanceElements.forEach(el => {
    if(el) el.textContent = balance;
  });
}

// Start watching ad
function startAd() {
  if(watchAdBtn) {
    watchAdBtn.disabled = true;
    watchAdBtn.textContent = 'Watching...';
    
    // Simulate 15 second ad
    let seconds = 15;
    const timer = setInterval(() => {
      document.getElementById('timer').textContent = 
        `00:${seconds.toString().padStart(2, '0')}`;
      seconds--;
      
      if(seconds < 0) {
        clearInterval(timer);
        completeAd();
      }
    }, 1000);
  }
}

// Complete ad watching
function completeAd() {
  balance += 10;
  adsWatched++;
  localStorage.setItem('walletBalance', balance);
  localStorage.setItem('adsWatched', adsWatched);
  updateBalance();
  
  if(watchAdBtn) {
    watchAdBtn.disabled = false;
    watchAdBtn.textContent = 'Watch Another Ad';
  }
  
  document.getElementById('timer').textContent = '00:15';
  alert('You earned ₹10! Watch more ads to earn more.');
}

// Process withdrawal
function processWithdrawal() {
  const method = document.querySelector('.method.active')?.dataset.method;
  const upiId = document.getElementById('upiId')?.value;
  const amount = parseInt(document.getElementById('amount')?.value);
  
  if(!method) {
    alert('Please select payment method');
    return;
  }
  
  if(!upiId) {
    alert('Please enter UPI ID');
    return;
  }
  
  if(!amount || amount < 100) {
    alert('Minimum withdrawal is ₹100');
    return;
  }
  
  if(amount > balance) {
    alert('Insufficient balance');
    return;
  }
  
  // Show GPay simulation
  if(gpaySimulation) {
    simAmount.textContent = amount;
    gpaySimulation.style.display = 'block';
    gpaySimulation.scrollIntoView({ behavior: 'smooth' });
  }
}

// Complete withdrawal
function completeWithdrawal() {
  const amount = parseInt(simAmount.textContent);
  balance -= amount;
  localStorage.setItem('walletBalance', balance);
  updateBalance();
  
  if(gpaySimulation) {
    gpaySimulation.style.display = 'none';
  }
  
  alert(`Withdrawal successful! ₹${amount} will be sent to your account.`);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);