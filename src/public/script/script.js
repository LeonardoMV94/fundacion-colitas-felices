document.addEventListener('DOMContentLoaded', (event) => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('entry_date').value = today;
    });

    