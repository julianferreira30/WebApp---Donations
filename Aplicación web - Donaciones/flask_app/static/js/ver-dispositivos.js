document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar la tabla
    const table = document.getElementById('tablaDispositivos');
    
    // Agregar un evento de clic a cada fila
    table.addEventListener('click', (event) => {
        // Verificar si el clic ocurri├│ en una fila
        const row = event.target.closest('tr');
        
        if (row) {
            // Redirigir a la URL especificada en data-href
            const dispositivo_id = row.getAttribute('data-id');
            console.log("dispositivo id", dispositivo_id);

            if (dispositivo_id) {
                // Redirigir a la URL de Flask con el dispositivo_id
                window.location.href = `/dispositivo/${dispositivo_id}`;
        }
    }
    });
});
