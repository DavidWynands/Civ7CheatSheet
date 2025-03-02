// Filter for the list
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the text input filter
    document.getElementById('filterInputTable').addEventListener('input', combinedFilter);

    // Event listeners for the checkbox filters
    document.querySelectorAll('input[name="ages"]').forEach(checkbox => {
        checkbox.addEventListener('change', combinedFilter);
    });
    // Event listeners for the checkbox filters
    document.querySelectorAll('input[name="yields"]').forEach(checkbox => {
        checkbox.addEventListener('change', combinedFilter);
    });
});

function combinedFilter() {
    const filterValue = document.getElementById('filterInputTable').value.toLowerCase();
    console.log("filterValue is:", filterValue);
    // Retrieve the checked checkboxes
    const checkboxesAge = document.querySelectorAll('input[name="ages"]:checked');
    const ageValues = Array.from(checkboxesAge).map(checkbox => checkbox.value.toLowerCase());
    console.log("ageValues is:", ageValues);
    const checkboxesYields = document.querySelectorAll('input[name="yields"]:checked');
    const yieldValues = Array.from(checkboxesYields).map(checkbox => checkbox.value.toLowerCase());
    console.log("yieldValues is:", yieldValues);
    // Select all table rows
    const tableRows = document.querySelectorAll('.table-row');

    // Iterate over each table row and apply filtering logic
    tableRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        console.log("rowText is:", rowText);

        // Apply input filter to concatated row text
        let matchesFilter = rowText.includes(filterValue)

        // Apply Age checkbox values filters to concatated row text
        let matchesAge = ageValues.some(value => {
            return rowText.includes(value);
        })

        // Concatenate all alt texts of images in that row ...
        const images = row.querySelectorAll('img');
        let concatenatedAltText = '';
        images.forEach(image => {
            concatenatedAltText += image.getAttribute('alt').toLowerCase() + ' ';
        })
        console.log("concatenatedAltText is:", concatenatedAltText);
        
        // .. and apply the yield checkbox values to the conbined alt text
        let matchesYields = yieldValues.some(value => {
            return concatenatedAltText.includes(value)
        })
        console.log("matchesYields is:", matchesYields);

        // Show or hide the row based on the combined filter
        let shouldDisplay = matchesFilter && matchesAge && matchesYields;
        row.style.display = shouldDisplay ? '' : 'none';
    });
}

// Function to add tooltips to specific words
function addTooltips() {
    const tooltipWords = {
       /* "ageless": "Means that this building can also be build in the susequent ages after it is unlocked. Also means that this building can not be overbuild. So, place carefully, because it is going to stay!",
        "on a river": "Place on (small) river or navigable river tiles. Can therefore be used to place urban districts on navigable river tiles.",
        "quarters": "a district (urban city tile), with two buildings on it.",
        "Age": "The Age in which the building is unlocked and can be build. Only ageless buildings can also be build in the subsequent ages." */
    };
    
    const tooltipTargets = document.querySelectorAll('.tooltip-target, .icon-text');

    tooltipTargets.forEach(target => {
        let html = target.innerHTML;
        for (const [word, tooltipText] of Object.entries(tooltipWords)) {
            const regex = new RegExp(`\\b(${word})\\b`, 'g');
            html = html.replace(regex, `<span class="tooltip">$1<span class="tooltiptext">${tooltipText}</span></span>`);
        }
        console.log("html is:", html);
        target.innerHTML = html;
    });
}

// Call the function to add tooltips on page load
document.addEventListener('DOMContentLoaded', addTooltips);