let currentStep = 1;
let totalPrice = 0;

function changeStep(direction) {
    const steps = document.querySelectorAll('.step');
    steps[currentStep - 1].classList.remove('active');
    currentStep += direction;

    // Ukryj bieżący krok
    steps[currentStep - 1].classList.remove('active');
	
    if (currentStep < 1) currentStep = steps.length;
    if (currentStep > steps.length) currentStep = 1;

    steps[currentStep - 1].classList.add('active');
    updatePreview();
}

function updatePreview() {
    const previewImage = document.getElementById('final-preview');
    const selectedModel = document.getElementById('model');
    const selectedColor = document.getElementById('color');
    const selectedEngine = document.getElementById('engine');
    const selectedWheels = document.getElementById('wheels');
    const selectedTech = document.getElementById('tech');
    const extras = document.querySelectorAll('input[name="extras"]:checked');

    // Pobieranie obrazów opcji
    const modelImage = selectedModel.options[selectedModel.selectedIndex].dataset.image;
    previewImage.src = modelImage;

    generateSummary();
}

function generateSummary() {
    const model = document.getElementById('model');
    const color = document.getElementById('color');
    const engine = document.getElementById('engine');
    const wheels = document.getElementById('wheels');
    const tech = document.getElementById('tech');
    const extras = document.querySelectorAll('input[name="extras"]:checked');

    totalPrice = 0;

    totalPrice += parseInt(model.options[model.selectedIndex].dataset.price) || 0;
    totalPrice += parseInt(color.options[color.selectedIndex].dataset.price) || 0;
    totalPrice += parseInt(engine.options[engine.selectedIndex].dataset.price) || 0;
    totalPrice += parseInt(wheels.options[wheels.selectedIndex].dataset.price) || 0;
    totalPrice += parseInt(tech.options[tech.selectedIndex].dataset.price) || 0;

    extras.forEach(extra => {
        totalPrice += parseInt(extra.dataset.price) || 0;
    });

    const summaryText = `
        <strong>Model:</strong> ${model.value}<br>
        <strong>Kolor:</strong> ${color.value}<br>
        <strong>Silnik:</strong> ${engine.value}<br>
        <strong>Felgi:</strong> ${wheels.value}<br>
        <strong>Technologia:</strong> ${tech.value}<br>
        <strong>Dodatki:</strong> ${extras.length > 0 ? Array.from(extras).map(extra => extra.value).join(', ') : 'Brak'}<br>
    `;

    document.getElementById('summary-details').innerHTML = summaryText;
    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('summary').style.display = 'block';
}
// Dane o modelach
const modelDetails = {
    "Model A": {
        title: "Model A - Klasyczny sedan",
        description: "Model A to idealny wybór dla tych, którzy szukają elegancji i komfortu. Wyposażony w nowoczesne technologie, oferuje doskonałe osiągi i niskie zużycie paliwa.",
    },
    "Model B": {
        title: "Model B - Sportowy",
        description: "Model B to dynamiczny samochód sportowy zaprojektowany dla miłośników prędkości. Posiada zaawansowane systemy kontroli trakcji i napęd na cztery koła.",
    },
    "Model C": {
        title: "Model C - SUV",
        description: "Model C to przestronny SUV, idealny na długie podróże i rodzinne wyprawy. Charakteryzuje się wysokim prześwitem i zaawansowanym systemem bezpieczeństwa.",
    }
};

// Funkcja otwierająca modal
function openModal(modelName) {
    const modal = document.getElementById('model-info-modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');

    // Ustawianie tytułu i opisu w modal
    title.textContent = modelDetails[modelName].title;
    description.textContent = modelDetails[modelName].description;

    modal.style.display = 'block';
}

// Funkcja zamykająca modal
function closeModal() {
    const modal = document.getElementById('model-info-modal');
    modal.style.display = 'none';
}

// Kliknięcie poza modalem zamyka go
window.onclick = function(event) {
    const modal = document.getElementById('model-info-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
