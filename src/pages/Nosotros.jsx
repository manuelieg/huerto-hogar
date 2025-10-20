import React from 'react';

function Nosotros() {
    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">¿Qué es HuertoHogar?</h2>
            <p>
                HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo 
                directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos 
                en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt, 
                Villarica, Nacimiento, Viña del Mar, Valparaíso, y Concepción. Nuestra misión es conectar a las 
                familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
            </p>

            <h2 className="mt-4 text-center">Misión</h2>
            <p>
                Nuestra misión es proporcionar productos frescos y de calidad directamente desde el campo hasta 
                la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos 
                comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores 
                locales, apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en 
                todos los hogares chilenos.
            </p>

            <h2 className="mt-4 text-center">Visión</h2>
            <p>
                Nuestra visión es ser la tienda online líder en la distribución de productos frescos y naturales en 
                Chile, reconocida por nuestra calidad excepcional, servicio al cliente y compromiso con la 
                sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional e internacional, 
                estableciendo un nuevo estándar en la distribución de productos agrícolas directos del productor al 
                consumidor.
            </p>
            
            <div className="text-center mt-5">
                <img 
                    src="/images/logo_header.png" 
                    alt="HuertoHogar - productos del campo" 
                    className="img-fluid rounded shadow-sm" 
                    style={{ maxWidth: '250px', height: 'auto' }}
                />
            </div>
        </div>
    );
}

export default Nosotros;


