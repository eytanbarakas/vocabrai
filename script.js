const fetchDataButton = document.getElementById('fetch-data');
const resultElement = document.getElementById('result');

fetchDataButton.addEventListener('click', async () => {
  // Gather responses from dropdowns
  const q1 = document.getElementById('q1').value;
  const q2 = document.getElementById('q2').value;
  const q3 = document.getElementById('q3').value;

  const userResponses = {
    question1: q1,
    question2: q2,
    question3: q3,
  };

  try {
    // Send user input to the backend
    const response = await fetch('/api/personality', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userResponses),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    resultElement.textContent = data.result;
  } catch (error) {
    console.error('Error:', error);
    resultElement.textContent = 'Error fetching data. Please try again.';
  }
});

