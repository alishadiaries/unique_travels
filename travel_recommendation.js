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
})