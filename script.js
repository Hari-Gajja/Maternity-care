 const rotatingText = document.getElementById('rotating-text');
const textOptions = ['Empathy','Excellence', 'Community', 'Comfort'];
let currentTextIndex = 0;

setInterval(() => {
  currentTextIndex = (currentTextIndex + 1) % textOptions.length;
  rotatingText.textContent = textOptions[currentTextIndex];
}, 500);


document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    
    alert(data.message);
    // Implement your login logic here (e.g., redirect to the dashboard)
});

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    
    alert(data.message);
    // Implement your signup logic here (e.g., redirect to the login page)
});

async function handleEmergency() {
    try {
        // Get the user's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                // Get user details from localStorage (assuming the user is already logged in)
                const email = localStorage.getItem('email'); // or wherever you store user email
                const name = localStorage.getItem('name'); // or wherever you store user name

                if (!email || !name) {
                    alert('User is not logged in.');
                    return;
                }

                // Make a request to the server
                const response = await fetch('http://localhost:3000/emergency', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        location: {
                            latitude,
                            longitude
                        }
                    })
                });
                
                const data = await response.json();
                alert(data.message);
            }, (error) => {
                alert('Error getting location: ' + error.message);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending the emergency alert. Please try again.');
    }
}
