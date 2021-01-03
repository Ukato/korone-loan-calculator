// Listen for submit
document.querySelector('#calculate').addEventListener('click', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loading image
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate results
function calculateResults(e) {

  console.log('Calculating...');
  //UI Variables
  const loanAmount = document.getElementById('loan-amount');
  const interestAmount = document.getElementById('interest-amount');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(loanAmount.value);
  const calculatedInterest = parseFloat(interestAmount.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // show results
    document.getElementById('results').style.display = 'block';

    // hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    console.log('Please check your numbers.');
    showError('Correct your error. Yubi Yubi!')
  }
}

function showError(error) {

  // hide results
  document.getElementById('results').style.display = 'none';

  // hide loader
  document.getElementById('loading').style.display = 'none';

  // create div to show error message
  const errorDiv = document.createElement('div');

  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error message above heading
  card.insertBefore(errorDiv, heading);

  // clear error message after 3 seconds
  setTimeout(clearErrorMessage, 3000);
}

// clear error message
function clearErrorMessage() {
  document.querySelector('.alert').remove();
}