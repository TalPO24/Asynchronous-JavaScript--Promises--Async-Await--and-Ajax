'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//* Ajax Call: XMLHttpRequest
/*
const getCountryData = function(country) {
    const request = new XMLHttpRequest()
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
    request.send()

    request.addEventListener('load', function() {
        const [data] = JSON.parse(this.responseText)
        console.log(data)

        const html = `
    <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.official}</h3>
      <h4 class="country__region">${data.continents[0]}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages.heb}</p>
      <p class="country__row"><span>💰</span>${data.currencies.name}</p>
    </div>
  </article>
    `;
        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1
    })
}

getCountryData('israel')
getCountryData('USA')
*/

const renderCountry = function(data, className = '') {
        const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.continents[0]}</h4>
    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages.heb}</p>
    <p class="country__row"><span>💰</span>${data.currencies.name}</p>
    </div>
    </article>
    `;
        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1
    }
    /*

    const getCountryAndNeighbour = function(country) {

        // Ajax call country 1
        const request = new XMLHttpRequest()
        request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
        request.send()

        request.addEventListener('load', function() {
            const [data] = JSON.parse(this.responseText)
            console.log(data)

            // Render country 1
            renderCountry(data)

            // Get neighbour country
            const [neighbour] = data.borders

            if (!neighbour) return;

            // Ajax call country 2
            const request2 = new XMLHttpRequest()
            request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`)
            request2.send()

            request2.addEventListener('load', function() {
                const [data2] = JSON.parse(this.responseText)
                console.log(data2)

                renderCountry(data2, 'neighbour')
            })
        })
    }

    getCountryAndNeighbour('usa')
        // getCountryAndNeighbour('israel')
    */


/*
//* CallBack Hell
setTimeout(() => {
    console.log('1 second passed')
    setTimeout(() => {
        console.log('2 seconds passed')
        setTimeout(() => {
            console.log('3 seconds passed')
            setTimeout(() => {
                console.log('4 seconds passed')
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)
*/

//* Promises and the fetch API
//The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.


// const request = fetch(`https://restcountries.com/v3.1/name/portugal`) // The global fetch() method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available.
// console.log(request)

// const getCountryData = function(country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response) {
//         console.log(response)
//         return response.json()
//     }).then(function(data) {
//         console.log(data)
//         renderCountry(data[0])
//     })
// }

const getCountryData = function(country) {
        //country 1
        fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then((response) => response.json())
            .then((data) => {
                renderCountry(data[0])
                const neighbour = data[0].borders[0]

                if (!neighbour) return;
                // country 2
                return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
            })
            .then(response => response.json())
            .then(data => renderCountry(data, 'neighbour'))
    }
    // getCountryData('israel')
getCountryData('germany')