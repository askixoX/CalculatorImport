const data = {
    country1: {
      type1: { duty: 0.01, tax: 0.05 },
      type2: { duty: 0.02, tax: 0.1 },
      type3: { duty: 0.15, tax: 0.08 },
      type4: { duty: 0.15, tax: 0.06 },
      type5: { duty: 0.18, tax: 0.2 }
    },
    country2: {
      type1: { duty: 0.03, tax: 0.15 },
      type2: { duty: 0.05, tax: 0.12 },
      type3: { duty: 0.12, tax: 0.09 },
      type4: { duty: 0.11, tax: 0.06 },
      type5: { duty: 0.28, tax: 0.14 }
    },
    country3: {
      type1: { duty: 0.02, tax: 0.1 },
      type2: { duty: 0.1, tax: 0.05 },
      type3: { duty: 0.09, tax: 0.06 },
      type4: { duty: 0.08, tax: 0.09 },
      type5: { duty: 0.2, tax: 0.12 }
    }
  };
  
  function calculateImportCost(event) {
    event.preventDefault();
  
    const country = document.getElementById('country').value;
    const productType = document.getElementById('productType').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const price = parseFloat(document.querySelector(`#productType option[value="${productType}"]`).dataset.price);
    const vatRate = (parseFloat(document.getElementById('vatRate').value) * price / 100).toFixed(2);
  
    const duty = data[country][productType].duty;
    const tax = data[country][productType].tax;
    const vatAmount = (quantity * vatRate / 100).toFixed(2);
  
    const quantityError = document.getElementById('quantityError');
    const vatRateError = document.getElementById('vatRateError');
  
    quantityError.textContent = '';
    vatRateError.textContent = '';
  
    if (isNaN(quantity) || quantity <= 0) {
      quantityError.textContent = 'Введите корректное количество товаров.';
      document.getElementById('result').textContent = '';
      return;
    }
  
    if (isNaN(vatRate) || vatRate < 0 || vatRate > 100) {
      vatRateError.textContent = 'Введите корректную ставку НДС.';
      document.getElementById('result').textContent = '';
      return;
    }
  
    const totalDuty = (quantity * price * duty).toFixed(2);
    const totalTax = (quantity * price * tax).toFixed(2);
    const totalCost = (quantity * price + parseFloat(totalDuty) + parseFloat(totalTax) + parseFloat(vatAmount)).toFixed(2);
  
    const result = `Стоимость товара: ${price.toFixed(2)} ₽<br>
                    Стоимость пошлины: ${totalDuty} ₽<br>
                    Стоимость налога: ${totalTax} ₽<br>
                    Стоимость НДС: ${vatAmount} ₽<br>
                    Общая стоимость импорта: ${totalCost} ₽`;
  
    document.getElementById('result').innerHTML = result;
  }
  
  function clearForm() {
    document.getElementById('importForm').reset();
    document.getElementById('result').textContent = '';
    document.getElementById('quantityError').textContent = '';
    document.getElementById('vatRateError').textContent = '';
  }
  
  document.getElementById('importForm').addEventListener('submit', calculateImportCost);  