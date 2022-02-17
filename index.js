const state = {
	breweries: [],
};

const ulElement = document.querySelector('#breweries-list');
const searchInput = document.querySelector('#select-state');

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
	state.breweries = breweriesArray;
	breweriesArray.forEach((brewery) => renderBrewery(brewery));
}

function listenToSearchButton() {
	const searchByStateForm = document.querySelector('#select-state-form');
	searchByStateForm.addEventListener('submit', function (e) {
		e.preventDefault();
		fetch(
			`https://api.openbrewerydb.org/breweries?by_state=${searchInput.value}`
		)
			.then((response) => response.json())
			.then((breweriesArray) => renderBreweriesSearch(breweriesArray));
	});
}

function listenToDropDownMenu() {
	const filterDropdown = document.querySelector('#filter-by-type');
	filterDropdown.addEventListener('change', function (event) {
		if (searchInput.value !== '') {
			fetch(
				`https://api.openbrewerydb.org/breweries?by_state=${searchInput.value}&by_type=${filterDropdown.value}`
			)
				.then((response) => response.json())
				.then((breweriesArray) => renderBreweriesSearch(breweriesArray));
		} else alert('Please choose a state first')
	});
}

function listenToUserEvents() {
	listenToSearchButton();
	listenToDropDownMenu();
}

listenToUserEvents();
