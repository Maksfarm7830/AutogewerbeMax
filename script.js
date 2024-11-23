let currentStep = 1;
let totalPrice = 0;

function changeStep(direction) {
    const steps = document.querySelectorAll('.step');
    steps[currentStep - 1].classList.remove('active');
    currentStep += direction;

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
