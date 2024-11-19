document.getElementById('emiForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  // Get form values
  let principal = document.getElementById('principal').value;
  let rate = document.getElementById('rate').value;
  let time = document.getElementById('time').value;
  
  // Calculate EMI
  let monthlyRate = rate / (12 * 100);
  let n = time * 12;
  let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  emi = Math.round(emi)
  
  // Calculate total payment and interest
  let totalPayment = emi * n;
  totalPayment = Math.round(totalPayment);
  let interest = totalPayment - principal;
  interest = Math.round(interest);

  // Display EMI result
  document.getElementById('emiResult').innerText = `Monthly EMI: ₹${emi.toFixed(2)}`;
  document.getElementById('totalPayment').innerText = `Total Payment: ₹${totalPayment.toFixed(2)}`;
  document.getElementById('interestAmount').innerText = `Total Interest: ₹${interest}`;
  
  // Prepare data for pie chart
  let ctx = document.getElementById('emiChart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Principal', 'Interest'],
          datasets: [{
              data: [principal, interest],
              backgroundColor: ['#4caf50', '#ff6f61']
          }]
      },
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'EMI Breakdown'
          }
      }
  });
});
