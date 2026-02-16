// IMPORTANT: Replace 'YOUR_PAYSTACK_PUBLIC_KEY' with your actual Paystack public key
const PAYSTACK_PUBLIC_KEY = 'pk_live_051bcbe2840110639b09a2ef72b70fdbcf6a6220'; // Replace with your key
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz25ecFClKxzKxQqrItFVFThGiPDET0wdsBPNBgKD1h9WPoBwqCWxJEIfF7wkeZ74Uq/exec'; // Replace with your Google Apps Script Web App URL

// Pricing configuration
const pricingConfig = {
    standard: {
        amount: 400000, // Amount in kobo (₦4,000)
        name: 'Weekend Intensive'
    },
    premium: {
        amount: 12000000, // Amount in kobo (₦120,000)
        name: 'Premium Package'
    },
    group: {
        amount: 20000000, // Amount in kobo (₦200,000)
        name: 'Group Package'
    }
};

// Modal functionality
const modal = document.getElementById('paymentModal');
const closeModal = document.querySelector('.close-modal');

function initiatePayment(packageType) {
    modal.style.display = 'block';
    document.getElementById('packageType').value = packageType;
    document.getElementById('amount').value = pricingConfig[packageType].amount;
}

closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Form submission
document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const cohort = document.getElementById('cohort').value;
    const packageType = document.getElementById('packageType').value;
    const amount = document.getElementById('amount').value;
    
    // Validate form
    if (!fullName || !email || !whatsapp || !cohort) {
        alert('Please fill all required fields');
        return;
    }
    
    // Initialize Paystack payment
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amount,
        currency: 'NGN',
        ref: 'LIUSHUB-' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                {
                    display_name: "Full Name",
                    variable_name: "full_name",
                    value: fullName
                },
                {
                    display_name: "WhatsApp",
                    variable_name: "whatsapp",
                    value: whatsapp
                },
                {
                    display_name: "Cohort",
                    variable_name: "cohort",
                    value: cohort
                },
                {
                    display_name: "Package",
                    variable_name: "package",
                    value: pricingConfig[packageType].name
                }
            ]
        },
        callback: function(response) {
            // Payment successful
            handleSuccessfulPayment(response, {
                fullName,
                email,
                whatsapp,
                cohort,
                packageType: pricingConfig[packageType].name,
                reference: response.reference,
                amount: amount / 100 // Convert back to Naira
            });
        },
        onClose: function() {
            alert('Payment cancelled');
        }
    });
    
    handler.openIframe();
});

function handleSuccessfulPayment(paymentResponse, studentData) {
    // Send data to Google Sheets
    fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...studentData,
            paymentReference: paymentResponse.reference,
            timestamp: new Date().toISOString()
        })
    }).then(() => {
        // Store payment success in localStorage
        localStorage.setItem('liushub-payment-verified', 'true');
        localStorage.setItem('liushub-student-email', studentData.email);
        localStorage.setItem('liushub-student-name', studentData.fullName);
        localStorage.setItem('liushub-payment-reference', paymentResponse.reference);
        
        // Close modal
        modal.style.display = 'none';
        
        // Show success message
        showSuccessMessage(studentData);
        
        // Redirect to portal after 3 seconds
        setTimeout(() => {
            window.location.href = 'portal.html';
        }, 3000);
    }).catch(error => {
        console.error('Error saving to Google Sheets:', error);
        // Still allow access even if Google Sheets fails
        localStorage.setItem('liushub-payment-verified', 'true');
        localStorage.setItem('liushub-student-email', studentData.email);
        
        showSuccessMessage(studentData);
        
        setTimeout(() => {
            window.location.href = 'portal.html';
        }, 3000);
    });
}

function showSuccessMessage(studentData) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h2>Payment Successful!</h2>
            <p>Welcome to Lius Hub, ${studentData.fullName}!</p>
            <p>You'll receive a confirmation email shortly. Redirecting to your student portal...</p>
        </div>
    `;
    document.body.appendChild(successDiv);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
        }
        .success-content {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
        }
        .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #7C3AED, #EC4899);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            margin: 0 auto 1.5rem;
        }
        .success-content h2 {
            font-family: 'Syne', sans-serif;
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #1F2937;
        }
        .success-content p {
            color: #6B7280;
            line-height: 1.6;
        }
    `;
    document.head.appendChild(style);
}
