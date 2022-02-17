const state = {
  breweries: []
}

const ulElement = document.querySelector('.breweries-list')
const searchByStateForm = document.querySelector('#select-state-form')
const searchInput = document.querySelector('#select-state')

function renderBrewery(brewery) {
  const breweryElement = ''
  breweryElement.innerHTML = `
  <li>
    <h2>${brewery.name}</h2>
    <div class="type">${brewery.brewery_type}</div>
    <section class="address">
      <h3>Address:</h3>
      <p>${brewery.street}</p>
      <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
    </section>
    <section class="phone">
      <h3>Phone:</h3>
      <p>${brewery.phone}</p>
    </section>
    <section class="link">
      <a href="${brewery.website_url}" target="_blank">Visit Website</a>
    </section>
  </li>`
  ulElement.append(breweryElement)
}

function renderBreweries(breweriesArray) {
  breweriesArray.forEach(brewery => renderBrewery(brewery))
}

function listenToSearchButton () {
  searchByStateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${searchInput.value}`)
    .then(function(response) {
      return response.json()
    }).then(function(breweriesArray) {
      state.breweries.push(breweriesArray)
      renderBreweries(state.breweries)
    })
    searchByStateForm.reset()
  })
}

listenToSearchButton()
