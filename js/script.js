//* Declaração das Variáveis.
const cardCurrencies = document.querySelectorAll('.card-currency');
const exchange = document.querySelector('.exchange');
const inputs = document.querySelectorAll('.input');
let currencyOneValue = inputs[0].value;
let currencyOne;
let currencyTwo;

//* Atualiza as moedas.
function updateCurrencies() {
  currencyOne = cardCurrencies[0].value;
  currencyTwo = cardCurrencies[1].value;
  inputs[1].value = '';
}

//* Adiciona as moedas com seus valores como option de cada select.
//* Deixa selecionado inicialmente a conversão de USD para EUR.
fetch('https://openexchangerates.org/api/currencies.json?app_id=a74d69143e6242698bb55ebb1250862c')
  .then((response) => response.json())
  .then((currencies) => {
    cardCurrencies.forEach((card, index) => {
      card.innerHTML = '';
      Object.keys(currencies).forEach((code) => {
        const option = document.createElement('option');
        option.value = code;
        option.text = `${code} - ${currencies[code]}`;
        if (index === 0 && code === 'USD') {
          option.setAttribute('selected', true);
        } else if (index === 1 && code === 'EUR') {
          option.setAttribute('selected', true);
        }
        card.add(option);
        updateCurrencies();
      });
    });
  });

//* Realizar a conversão dos valores.
function convert() {
  currencyOneValue = inputs[0].value;
  fetch(`https://openexchangerates.org/api/latest.json?app_id=a74d69143e6242698bb55ebb1250862c&base=USD&symbols=${currencyOne},${currencyTwo}`)
    .then((response) => response.json())
    .then((data) => {
      const rateOne = data.rates[currencyOne];
      const rateTwo = data.rates[currencyTwo];
      const usdValue = currencyOneValue / rateOne;
      const convertedValue = usdValue * rateTwo;
      inputs[1].value = convertedValue.toFixed(2);
    })
    .catch((error) => {
      console.error(error);
      alert('Houve um erro ao converter a moeda. Por favor, tente novamente mais tarde.');
    });
}

//* Adiciona  a função updateCurrencies para cada select.
cardCurrencies.forEach((currency) => {
  currency.addEventListener('change', updateCurrencies);
});

//* Ativa a função convert ao clicar no botão exchange.
exchange.addEventListener('click', convert);
