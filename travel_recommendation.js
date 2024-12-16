$('#btnSearch').on('click', function() {
    const searchQuery = $('#search').val().toLowerCase();
    $.ajax({
        url: '/unique_travels/api.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            let results = [];

            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(searchQuery)) {
                        results.push(city);
                    }
                });
            });

            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(searchQuery)) {
                    results.push(temple);
                }
            });

            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(searchQuery)) {
                    results.push(beach);
                }
            });

        
            if (results.length > 0) {
                displayResults(results);
            } else {
                alert('No results found!');
            }
        },
        error: function() {
            alert('Error fetching data');
        }
    });
});

function displayResults(results) {
    let resultsContainer = $('#searchResults');
    resultsContainer.empty();

    results.forEach(result => {
        let resultHTML = `
            <div class="result-item">
                <h3>${result.name}</h3>
                <img src="${result.imageUrl}" alt="${result.name}">
                <p>${result.description}</p>
            </div>
        `;
        resultsContainer.append(resultHTML);
    });
}

