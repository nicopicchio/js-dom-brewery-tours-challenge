const state = {
	breweries: [],
	cities: [],
	filteredBreweries: [],
};

const ulElement = document.querySelector('#breweries-list');
const searchInput = document.querySelector('#select-state');
const filterDropdown = document.querySelector('#filter-by-type');
const searchNameInput = document.querySelector('#search-breweries');
const cityForm = document.querySelector('#filter-by-city-form');
const clearCheckboxBtn = document.querySelector('.clear-all-btn');

const searchBreweriesBar = document.querySelector('.search-bar');
searchBreweriesBar.hidden = true;

const h1El = document.querySelector('#main-list-heading');
h1El.hidden = true;

const asideElement = document.querySelector('.filters-section');
asideElement.hidden = true;

const renderBrewery = (brewery) => {
	let phone = brewery.phone;
	if (phone === null) phone = 'N/A';
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
      <p>${phone}</p>
    </section>
    <section class="link">
      <a href="${brewery.website_url}" target="_blank">Visit Website</a>
    </section>`;
	ulElement.append(breweryElement);
};

const renderBreweriesSearch = (breweriesArray) => {
	clearPreviousSearch();
	for (const brewery of state.breweries) {
		renderCityFilter(brewery);
	}
	breweriesArray.forEach((brewery) => {
		if (checkBreweryType(brewery)) {
			renderBrewery(brewery);
		}
	});
};

const renderCityFilter = (brewery) => {
	const cityLabelsArray = cityForm.querySelectorAll('label');
	for (const label of cityLabelsArray) {
		if (label.innerText === brewery.city) return;
	}
	const checkbox = document.createElement('input');
	const cityLabel = document.createElement('label');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', brewery.city.toLowerCase());
	checkbox.setAttribute('value', brewery.city.toLowerCase());
	cityLabel.setAttribute('for', brewery.city.toLowerCase());
	cityLabel.innerText = brewery.city;
	cityForm.append(checkbox, cityLabel);

	clearCheckboxBtn.addEventListener('click', () => {
		fetchOpenBreweryDB();
	});

	checkbox.addEventListener('change', (event) => {
		if (checkbox.checked) {
			checkbox.checked = true;
			state.filteredBreweries = state.breweries.filter(
				(brewery) => brewery.city.toLowerCase() === event.target.value
			);
			renderBreweriesSearch(state.filteredBreweries);
		}
	});
};

const checkBreweryType = (brewery) => {
	if (
		brewery.brewery_type === 'micro' ||
		brewery.brewery_type === 'regional' ||
		brewery.brewery_type === 'brewpub'
	)
		return true;
};

const listenToSearchBar = () => {
	searchNameInput.addEventListener('input', () => {
		state.filteredBreweries = state.breweries.filter((brewery) =>
			brewery.name.includes(searchNameInput.value)
		);
		renderBreweriesSearch(state.filteredBreweries);
	});
};

const listenToSearchButton = () => {
	const searchByStateForm = document.querySelector('#select-state-form');
	searchByStateForm.addEventListener('submit', (event) => {
		event.preventDefault();
		fetchOpenBreweryDB();
		showUI();
	});
};

const listenToDropDown = () => {
	filterDropdown.addEventListener('change', () => {
		fetchOpenBreweryDB();
		showUI();
	});
};

const fetchOpenBreweryDB = () => {
	let url = `https://api.openbrewerydb.org/breweries?by_state=${searchInput.value}&per_page=50`;
	if (filterDropdown.value) {
		url += `&by_type=${filterDropdown.value}`;
	}
	fetch(url)
		.then((response) => response.json())
		.then((breweriesArray) => {
			state.breweries = breweriesArray;
			renderBreweriesSearch(breweriesArray);
		});
};

const showUI = () => {
	const mainHeading = 'List of breweries in';
	h1El.innerText = `${mainHeading} ${
		searchInput.value.charAt(0).toUpperCase() + searchInput.value.substring(1)
	}`;
	searchBreweriesBar.hidden = false;
	h1El.hidden = false;
	asideElement.hidden = false;
};

const clearPreviousSearch = () => {
	ulElement.innerHTML = '';
	cityForm.innerHTML = '';
};

const listenToUserEvents = () => {
	listenToSearchButton();
	listenToSearchBar();
	listenToDropDown();
};

listenToUserEvents();
