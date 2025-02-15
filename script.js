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