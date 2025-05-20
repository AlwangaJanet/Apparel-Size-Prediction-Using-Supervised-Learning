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
    const fitMessage = document.getElementById('fit-message');
    const clothingGrid = document.getElementById('clothing-grid');
    const sizeChart = document.getElementById('size-chart');
    const fitPreference = document.getElementById('fit_preference');
    
    // Size mapping data
    const sizeData = {
        male: {
            XXS: {
                chest: "76-81 cm",
                waist: "61-66 cm",
                hips: "86-91 cm",
                items: {
                    shirt: "Collar size: 33-34 cm",
                    tshirt: "Chest: 76-81 cm",
                    pants: "Waist: 61-66 cm",
                    jacket: "Chest: 76-81 cm",
                    sweater: "Chest: 76-81 cm",
                    suit: "Chest: 76-81 cm"
                }
            },
            XS: {
                chest: "81-86 cm",
                waist: "66-71 cm",
                hips: "91-96 cm",
                items: {
                    shirt: "Collar size: 35-36 cm",
                    tshirt: "Chest: 81-86 cm",
                    pants: "Waist: 66-71 cm",
                    jacket: "Chest: 81-86 cm",
                    sweater: "Chest: 81-86 cm",
                    suit: "Chest: 81-86 cm"
                }
            },
            S: {
                chest: "86-91 cm",
                waist: "71-76 cm",
                hips: "96-101 cm",
                items: {
                    shirt: "Collar size: 37-38 cm",
                    tshirt: "Chest: 86-91 cm",
                    pants: "Waist: 71-76 cm",
                    jacket: "Chest: 86-91 cm",
                    sweater: "Chest: 86-91 cm",
                    suit: "Chest: 86-91 cm"
                }
            },
            M: {
                chest: "91-97 cm",
                waist: "76-81 cm",
                hips: "101-106 cm",
                items: {
                    shirt: "Collar size: 39-40 cm",
                    tshirt: "Chest: 91-97 cm",
                    pants: "Waist: 76-81 cm",
                    jacket: "Chest: 91-97 cm",
                    sweater: "Chest: 91-97 cm",
                    suit: "Chest: 91-97 cm"
                }
            },
            L: {
                chest: "97-102 cm",
                waist: "81-86 cm",
                hips: "106-111 cm",
                items: {
                    shirt: "Collar size: 41-42 cm",
                    tshirt: "Chest: 97-102 cm",
                    pants: "Waist: 81-86 cm",
                    jacket: "Chest: 97-102 cm",
                    sweater: "Chest: 97-102 cm",
                    suit: "Chest: 97-102 cm"
                }
            },
            XL: {
                chest: "102-107 cm",
                waist: "86-91 cm",
                hips: "111-116 cm",
                items: {
                    shirt: "Collar size: 43-44 cm",
                    tshirt: "Chest: 102-107 cm",
                    pants: "Waist: 86-91 cm",
                    jacket: "Chest: 102-107 cm",
                    sweater: "Chest: 102-107 cm",
                    suit: "Chest: 102-107 cm"
                }
            },
            XXL: {
                chest: "107-112 cm",
                waist: "91-97 cm",
                hips: "116-121 cm",
                items: {
                    shirt: "Collar size: 45-46 cm",
                    tshirt: "Chest: 107-112 cm",
                    pants: "Waist: 91-97 cm",
                    jacket: "Chest: 107-112 cm",
                    sweater: "Chest: 107-112 cm",
                    suit: "Chest: 107-112 cm"
                }
            },
            XXXL: {
                chest: "112-117 cm",
                waist: "97-102 cm",
                hips: "121-126 cm",
                items: {
                    shirt: "Collar size: 47-48 cm",
                    tshirt: "Chest: 112-117 cm",
                    pants: "Waist: 97-102 cm",
                    jacket: "Chest: 112-117 cm",
                    sweater: "Chest: 112-117 cm",
                    suit: "Chest: 112-117 cm"
                }
            }
        },
        female: {
            XXS: {
                bust: "76-78 cm",
                waist: "58-60 cm",
                hips: "84-86 cm",
                items: {
                    dress: "Bust: 76-78 cm",
                    top: "Bust: 76-78 cm",
                    blouse: "Bust: 76-78 cm",
                    skirt: "Waist: 58-60 cm",
                    pants: "Waist: 58-60 cm",
                    jacket: "Bust: 76-78 cm"
                }
            },
            XS: {
                bust: "78-82 cm",
                waist: "60-64 cm",
                hips: "86-90 cm",
                items: {
                    dress: "Bust: 78-82 cm",
                    top: "Bust: 78-82 cm",
                    blouse: "Bust: 78-82 cm",
                    skirt: "Waist: 60-64 cm",
                    pants: "Waist: 60-64 cm",
                    jacket: "Bust: 78-82 cm"
                }
            },
            S: {
                bust: "82-86 cm",
                waist: "64-68 cm",
                hips: "90-94 cm",
                items: {
                    dress: "Bust: 82-86 cm",
                    top: "Bust: 82-86 cm",
                    blouse: "Bust: 82-86 cm",
                    skirt: "Waist: 64-68 cm",
                    pants: "Waist: 64-68 cm",
                    jacket: "Bust: 82-86 cm"
                }
            },
            M: {
                bust: "86-90 cm",
                waist: "68-72 cm",
                hips: "94-98 cm",
                items: {
                    dress: "Bust: 86-90 cm",
                    top: "Bust: 86-90 cm",
                    blouse: "Bust: 86-90 cm",
                    skirt: "Waist: 68-72 cm",
                    pants: "Waist: 68-72 cm",
                    jacket: "Bust: 86-90 cm"
                }
            },
            L: {
                bust: "90-94 cm",
                waist: "72-76 cm",
                hips: "98-102 cm",
                items: {
                    dress: "Bust: 90-94 cm",
                    top: "Bust: 90-94 cm",
                    blouse: "Bust: 90-94 cm",
                    skirt: "Waist: 72-76 cm",
                    pants: "Waist: 72-76 cm",
                    jacket: "Bust: 90-94 cm"
                }
            },
            XL: {
                bust: "94-98 cm",
                waist: "76-80 cm",
                hips: "102-106 cm",
                items: {
                    dress: "Bust: 94-98 cm",
                    top: "Bust: 94-98 cm",
                    blouse: "Bust: 94-98 cm",
                    skirt: "Waist: 76-80 cm",
                    pants: "Waist: 76-80 cm",
                    jacket: "Bust: 94-98 cm"
                }
            },
            XXL: {
                bust: "98-102 cm",
                waist: "80-84 cm",
                hips: "106-110 cm",
                items: {
                    dress: "Bust: 98-102 cm",
                    top: "Bust: 98-102 cm",
                    blouse: "Bust: 98-102 cm",
                    skirt: "Waist: 80-84 cm",
                    pants: "Waist: 80-84 cm",
                    jacket: "Bust: 98-102 cm"
                }
            },
            XXXL: {
                bust: "102-106 cm",
                waist: "84-88 cm",
                hips: "110-114 cm",
                items: {
                    dress: "Bust: 102-106 cm",
                    top: "Bust: 102-106 cm",
                    blouse: "Bust: 102-106 cm",
                    skirt: "Waist: 84-88 cm",
                    pants: "Waist: 84-88 cm",
                    jacket: "Bust: 102-106 cm"
                }
            }
        }
    };
    
    // Size conversion for fit preference
    const fitAdjustments = {
        standard: 0,   // No adjustment
        loose: 1,      // One size larger
        tight: -1      // One size smaller
    };
    
    // Size order to enable size adjustments
    const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    
    // Icons for clothing items
    const clothingIcons = {
        male: {
            shirt: "fa-shirt",
            tshirt: "fa-tshirt",
            pants: "fa-socks",
            jacket: "fa-vest",
            sweater: "fa-vest-patches",
            suit: "fa-user-tie"
        },
        female: {
            dress: "fa-person-dress",
            top: "fa-shirt",
            blouse: "fa-shirt",
            skirt: "fa-vest-patches",
            pants: "fa-socks",
            jacket: "fa-vest"
        }
    };
    
    // Size meanings and descriptions
    const sizeDescriptions = {
        XXS: "Extra Extra Small",
        XS: "Extra Small",
        S: "Small",
        M: "Medium",
        L: "Large",
        XL: "Extra Large",
        XXL: "Extra Extra Large",
        XXXL: "Extra Extra Extra Large"
    };
    
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
            
            // Get the original predicted size
            const originalSize = data.size;
            
            // Get gender and fit preference
            const gender = formData.get('gender').toLowerCase();
            const fit = formData.get('fit_preference');
            
            // Adjust size based on fit preference
            const adjustedSize = adjustSizeForFit(originalSize, fit);
            
            // Display the result with adjusted size
            displayResults(originalSize, adjustedSize, gender, fit);
            
            // Hide form and show results
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
    
    // Function to adjust size based on fit preference
    function adjustSizeForFit(size, fitPreference) {
        const currentIndex = sizeOrder.indexOf(size);
        
        if (currentIndex === -1) return size; // If size not found in order, return original
        
        const adjustment = fitAdjustments[fitPreference];
        const newIndex = Math.min(Math.max(0, currentIndex + adjustment), sizeOrder.length - 1);
        
        return sizeOrder[newIndex];
    }
    
    // Function to display results with all the enhancements
    function displayResults(originalSize, adjustedSize, gender, fitPreference) {
        // Set the main size display
        sizeValue.textContent = adjustedSize;
        
        // Set the fit message
        let fitMessageText = `Based on your measurements, your recommended size is ${adjustedSize} (${sizeDescriptions[adjustedSize]}).`;
        
        // Add fit adjustment message if applicable
        if (originalSize !== adjustedSize) {
            const action = fitPreference === 'loose' ? 'increased' : 'decreased';
            fitMessageText += `<div class="fit-recommendation"><i class="fas fa-info-circle"></i>Your size was ${action} from ${originalSize} to ${adjustedSize} based on your preference for a ${fitPreference} fit.</div>`;
        }
        
        fitMessage.innerHTML = fitMessageText;
        
        // Generate clothing type grid
        generateClothingItems(adjustedSize, gender);
        
        // Generate size chart
        generateSizeChart(adjustedSize, gender);
    }
    
    // Function to generate clothing items grid
    function generateClothingItems(size, gender) {
        clothingGrid.innerHTML = '';
        
        const genderKey = gender === 'male' ? 'male' : 'female';
        const items = sizeData[genderKey][size].items;
        const icons = clothingIcons[genderKey];
        
        for (const [itemName, itemDescription] of Object.entries(items)) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'clothing-item';
            
            const icon = icons[itemName] || 'fa-tshirt'; // Default icon if not found
            
            itemDiv.innerHTML = `
                <i class="fas ${icon}"></i>
                <h4>${capitalizeFirstLetter(itemName)}</h4>
                <p>${itemDescription}</p>
            `;
            
            clothingGrid.appendChild(itemDiv);
        }
    }
    
    // Function to generate size chart
    function generateSizeChart(currentSize, gender) {
        sizeChart.innerHTML = '';
        
        const genderKey = gender === 'male' ? 'male' : 'female';
        const sizeEntries = sizeData[genderKey];
        
        // Create table
        const table = document.createElement('table');
        
        // Create header row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `<th>Size</th>`;
        
        // Determine measurements based on gender
        let measurements = [];
        if (genderKey === 'male') {
            measurements = ['chest', 'waist', 'hips'];
        } else {
            measurements = ['bust', 'waist', 'hips'];
        }
        
        // Add measurement headers
        measurements.forEach(measurement => {
            headerRow.innerHTML += `<th>${capitalizeFirstLetter(measurement)}</th>`;
        });
        
        table.appendChild(headerRow);
        
        // Add size rows
        for (const [sizeName, sizeInfo] of Object.entries(sizeEntries)) {
            const row = document.createElement('tr');
            
            // Highlight current size
            if (sizeName === currentSize) {
                row.className = 'highlighted';
            }
            
            row.innerHTML = `<td>${sizeName} (${sizeDescriptions[sizeName]})</td>`;
            
            // Add measurement values
            measurements.forEach(measurement => {
                row.innerHTML += `<td>${sizeInfo[measurement]}</td>`;
            });
            
            table.appendChild(row);
        }
        
        sizeChart.appendChild(table);
    }
    
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
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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