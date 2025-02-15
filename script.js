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