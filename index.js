const state = {
	breweries: [],
};

const ulElement = document.querySelector('#breweries-list');
const searchInput = document.querySelector('#select-state');
const filterDropdown = document.querySelector('#filter-by-type');
const searchBreweriesBar = document.querySelector('.search-bar');
const h1El = document.querySelector('#main-list-heading');
const asideElement = document.querySelector('.filters-section');
searchBreweriesBar.hidden = true;
h1El.hidden = true;
asideElement.hidden = true;

function renderBrewery(brewery) {
	const breweryElement = document.createElement('li');
	breweryElement.innerHTML = `
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
    </section>`;
	ulElement.append(breweryElement);
}

function renderBreweriesSearch(breweriesArray) {
	ulElement.innerHTML = '';
	breweriesArray.forEach((brewery) => {
		if (checkBreweryType(brewery)) {
			renderBrewery(brewery);
		}
	})
}

function checkBreweryType(brewery) {
	if (
		brewery.brewery_type === 'micro' ||
		brewery.brewery_type === 'regional' ||
		brewery.brewery_type === 'brewpub'
	)
	return true
}

function listenToSearchBar() {
	const searchInput = document.querySelector('#search-breweries');
	searchInput.addEventListener('input', function () {});
}

function listenToSearchButton() {
	const searchByStateForm = document.querySelector('#select-state-form');
	searchByStateForm.addEventListener('submit', function (e) {
		e.preventDefault();
		fetchOpenBreweryAPI();
		showUI()
	});
}

function listenToDropDown() {
	filterDropdown.addEventListener('change', function (event) {
		fetchOpenBreweryAPI()
		showUI()
	});
}

function fetchOpenBreweryAPI() {
	let url = `https://api.openbrewerydb.org/breweries?by_state=${searchInput.value}`
	if (filterDropdown.value) {
		url += `&by_type=${filterDropdown.value}`
	}
	fetch(url)
		.then((response) => response.json())
		.then(function (breweriesArray) {
			state.breweries = breweriesArray;
			renderBreweriesSearch(breweriesArray);
		});
}

function showUI() {
	const mainHeading = 'List of breweries in';
	h1El.innerText = `${mainHeading} ${
		searchInput.value.charAt(0).toUpperCase() + searchInput.value.substring(1)
	}`;
	searchBreweriesBar.hidden = false;
	h1El.hidden = false;
	asideElement.hidden = false;
}

function listenToUserEvents() {
	listenToSearchButton();
	listenToSearchBar();
	listenToDropDown();
}

listenToUserEvents();
