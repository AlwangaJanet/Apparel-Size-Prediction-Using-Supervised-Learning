document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('prediction-form');
    const genderSelect = document.getElementById('gender');
    const measurementLabel = document.getElementById('measurement_label');
    const measurementTooltip = document.getElementById('measurement_tooltip');
    const resultContainer = document.getElementById('result-container');
    const formContainer = document.querySelector('.form-container');
    const sizeValue = document.getElementById('size-value');
    const loadingIndicator = document.getElementById('loading');
    const newPredictionBtn = document.getElementById('new-prediction-btn');
    
    // Update measurement label based on gender selection
    genderSelect.addEventListener('change', function() {
        const gender = this.value;
        if (gender === 'Male') {
            measurementLabel.textContent = 'Chest (cm)';
            measurementTooltip.textContent = 'Measure around the fullest part of your chest';
        } else if (gender === 'Female') {
            measurementLabel.textContent = 'Bust (cm)';
            measurementTooltip.textContent = 'Measure around the fullest part of your bust';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading indicator
        loadingIndicator.classList.remove('hidden');
        
        // Create form data
        const formData = new FormData(form);
        
        // Send prediction request
        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');
            
            if (data.error) {
                showError(data.error);
                return;
            }
            
            // Display the result
            sizeValue.textContent = data.size;
            formContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');
        })
        .catch(error => {
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');
            showError('An error occurred. Please try again.');
            console.error('Error:', error);
        });
    });
    
    // Show a new prediction form
    newPredictionBtn.addEventListener('click', function() {
        resultContainer.classList.add('hidden');
        formContainer.classList.remove('hidden');
        form.reset();
        // Reset measurement label
        measurementLabel.textContent = 'Measurement (cm)';
        measurementTooltip.textContent = 'Select gender first';
    });
    
    // Form validation
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
    
    function validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.getAttribute('min')) || 0;
        const max = parseFloat(input.getAttribute('max')) || Infinity;
        
        if (value < min) {
            input.setCustomValidity(`Value must be at least ${min}`);
        } else if (value > max) {
            input.setCustomValidity(`Value must be at most ${max}`);
        } else {
            input.setCustomValidity('');
        }
    }
    
    // Show error message
    function showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
            <button class="close-error"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '20px';
        errorDiv.style.right = '20px';
        errorDiv.style.backgroundColor = 'var(--error-color)';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '15px';
        errorDiv.style.borderRadius = '8px';
        errorDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        errorDiv.style.zIndex = '1001';
        errorDiv.style.display = 'flex';
        errorDiv.style.alignItems = 'center';
        errorDiv.style.justifyContent = 'space-between';
        errorDiv.style.minWidth = '300px';
        errorDiv.style.animation = 'slideIn 0.3s ease-out forwards';
        
        // Add error content styles
        errorDiv.querySelector('.error-content').style.display = 'flex';
        errorDiv.querySelector('.error-content').style.alignItems = 'center';
        errorDiv.querySelector('.error-content').style.gap = '10px';
        
        // Add close button styles
        const closeBtn = errorDiv.querySelector('.close-error');
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.padding = '0';
        
        // Add to document
        document.body.appendChild(errorDiv);
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Close button event
        closeBtn.addEventListener('click', function() {
            errorDiv.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                errorDiv.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(errorDiv)) {
                errorDiv.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (document.body.contains(errorDiv)) {
                        errorDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Add input validation patterns
    document.getElementById('height_cm').setAttribute('pattern', '\\d+(\\.\\d{1,2})?');
    document.getElementById('weight_kg').setAttribute('pattern', '\\d+(\\.\\d{1,2})?');
    document.getElementById('hips_cm').setAttribute('pattern', '\\d+(\\.\\d{1,2})?');
    document.getElementById('measurement_cm').setAttribute('pattern', '\\d+(\\.\\d{1,2})?');
});