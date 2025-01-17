document.addEventListener('DOMContentLoaded', (event) => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('entry_date').value = today;
    });

    const solicitudesBody = document.getElementById('solicitudesBody');

    const sortTable = (columnIndex, asc = true) => {
        const rows = Array.from(solicitudesBody.querySelectorAll('tr'));
        rows.sort((a, b) => {
            const aText = a.children[columnIndex].innerText.toLowerCase();
            const bText = b.children[columnIndex].innerText.toLowerCase();
            return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });
        rows.forEach(row => solicitudesBody.appendChild(row));
    };

    document.getElementById('sortMascotaAsc').addEventListener('click', () => sortTable(1, true));
    document.getElementById('sortMascotaDesc').addEventListener('click', () => sortTable(1, false));
    document.getElementById('sortUsuarioAsc').addEventListener('click', () => sortTable(2, true));
    document.getElementById('sortUsuarioDesc').addEventListener('click', () => sortTable(2, false));
