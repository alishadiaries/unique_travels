$('#btnSearch').on('click', function() {
    const searchQuery = $('#search').val().toLowerCase();

    $.ajax({
        url: '/unique_travels/api.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            let results = {
                beaches: [],
                temples: [],
                countries: []
            };

            if (searchQuery.includes("beach")) {
                results.beaches = data.beaches.slice(0, 2); 
            }

            if (searchQuery.includes("temple")) {
                results.temples = data.temples.slice(0, 2); 
            }

            if (searchQuery.includes("country")) {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        if (results.countries.length < 2) {
                            results.countries.push(city);
                        }
                    });
                });
            }

            const allResults = [...results.beaches, ...results.temples, ...results.countries];

            if (allResults.length > 0) {
                displayResults(allResults);
            } else {
                alert('No results found!');
            }
        },
        error: function() {
            alert('Error fetching data');
        }
    });
});

const resultsContainer = $('#searchResults');

function displayResults(results) {
    resultsContainer.empty();

    results.forEach(result => {
        let resultHTML = `
            <div class="result-item">
                <img src="${result.imageUrl}" alt="${result.name}">
                <h3>${result.name}</h3>
                <p>${result.description}</p>
                <button>Visit</button>
            </div>
        `;
        resultsContainer.append(resultHTML);
    });
}

$('#btnClear').on('click', function(){
    resultsContainer.empty();
    $('#search').val('');
});
