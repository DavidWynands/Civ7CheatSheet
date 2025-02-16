// Filter for the list
document.getElementById('filterInput').addEventListener('input', function() {
    var filterValue = this.value.toLowerCase();
    var listItems = document.querySelectorAll('.list-item');

    listItems.forEach(function(item) {
        if (item.textContent.toLowerCase().includes(filterValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

// Filter for the table
document.getElementById('filterInputTable').addEventListener('input', function() {
    var filterValue = this.value.toLowerCase();
    var tableRows = document.querySelectorAll('.table-row');

    tableRows.forEach(function(row) {
        if (row.textContent.toLowerCase().includes(filterValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Function to add tooltips to specific words
function addTooltips() {
    const tooltipWords = {
        "Item": "a thing",
        "food": "Stuff to eat",
        "terrain": "one hexagon tile"
    };
    
    const tooltipTargets = document.querySelectorAll('.tooltip-target, .icon-text');

    tooltipTargets.forEach(target => {
        let html = target.innerHTML;
        for (const [word, tooltipText] of Object.entries(tooltipWords)) {
            const regex = new RegExp(`\\b(${word})\\b`, 'g');
            html = html.replace(regex, `<span class="tooltip">$1<span class="tooltiptext">${tooltipText}</span></span>`);
        }
        target.innerHTML = html;
    });
}

// Call the function to add tooltips on page load
document.addEventListener('DOMContentLoaded', addTooltips);