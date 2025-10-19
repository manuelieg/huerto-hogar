export const blogArticles = [
    {
        id: 'BLG001',
        title: 'Las 5 Mejores Verduras para tu Huerto Casero',
        summary: 'Descubre cuáles son las verduras más fáciles de cultivar en espacios reducidos y cómo obtener una cosecha abundante en tu propio hogar.',
        image: '/images/huerto_casero.jpg',
        date: '2025-10-01',
        author: 'Ana Martínez',
        link: '/blog/BLG001',
        content: `
            <p class="lead">Comenzar un huerto en casa puede parecer complicado, pero con las verduras correctas, el éxito está garantizado. Prioriza aquellas que tienen ciclos de crecimiento rápidos y no requieren mucho espacio.</p>
            <h3 class="mt-4">1. Rábanos</h3>
            <p>Son ideales para principiantes. Crecen rápidamente, tardando solo unas 3-4 semanas desde la siembra hasta la cosecha. Necesitan poca profundidad de tierra.</p>
            <h3 class="mt-4">2. Espinacas</h3>
            <p>Se adaptan bien a la sombra parcial, perfectas para balcones. Puedes cosechar las hojas externas constantemente sin matar la planta.</p>
            <h3 class="mt-4">3. Lechugas (Variedades de hoja)</h3>
            <p>Similar a las espinacas, las variedades de hojas sueltas te permiten cortar lo que necesitas sin esperar a que la cabeza madure completamente.</p>
            <h3 class="mt-4">4. Zanahorias Baby</h3>
            <p>Si bien las zanahorias grandes necesitan profundidad, las variedades 'baby' son felices en macetas más pequeñas.</p>
            <h3 class="mt-4">5. Hierbas Aromáticas</h3>
            <p>Albahaca, menta, y orégano no solo son fáciles, sino que mejoran el sabor de cualquier comida. Son resistentes y crecen bien en alféizares.</p>
        `
    },
    {
        id: 'BLG002',
        title: 'Guía Rápida: Los Secretos de la Miel Orgánica',
        summary: 'Aprende a diferenciar la miel orgánica de la procesada y descubre sus beneficios únicos para la salud y el medio ambiente.',
        image: '/images/miel_organica.jpg',
        date: '2025-09-15',
        author: 'Javier Soto',
        link: '/blog/BLG002',
        content: `
            <p class="lead">La miel orgánica no es solo un endulzante, es un superalimento cuyo proceso de recolección respeta la salud de las abejas y el entorno. Su certificación garantiza que no se usaron pesticidas en un radio de acción de las colmenas.</p>
            <h3 class="mt-4">¿Por qué es mejor?</h3>
            <p>Contiene más antioxidantes y nutrientes esenciales que la miel común, ya que no pasa por procesos de pasteurización extrema que eliminan sus propiedades.</p>
            <h3 class="mt-4">Cómo Usarla</h3>
            <p>Ideal para endulzar infusiones (esperando a que se enfríen ligeramente para no dañar sus enzimas), aderezos y mascarillas naturales.</p>
        `
    },
    {
        id: 'BLG003',
        title: 'Cítricos en Invierno: La Dosis de Vitamina C que Necesitas',
        summary: 'Conoce los cítricos que están en su mejor momento durante la temporada fría y cómo incorporarlos para fortalecer tu sistema inmunológico.',
        image: '/images/citricos.jpg',
        date: '2025-08-20',
        author: 'Sofía Reyes',
        link: '/blog/BLG003',
        content: `
            <p class="lead">El invierno requiere un refuerzo de vitamina C. Afortunadamente, muchas variedades de naranjas, limones y pomelos alcanzan su punto máximo de madurez y dulzura justo en esta época.</p>
            <h3 class="mt-4">El Poder del Limón</h3>
            <p>Unas pocas gotas de limón en agua tibia por la mañana pueden ayudar a alcalinizar tu cuerpo y mejorar la digestión.</p>
            <h3 class="mt-4">Naranjas y Mandarinas</h3>
            <p>Son el snack perfecto. Sus aceites esenciales también ayudan a levantar el ánimo y combatir la fatiga estacional.</p>
        `
    }
];

export const getAllArticles = () => {
    return blogArticles;
};

export const getArticleById = (id) => {
    return blogArticles.find(article => article.id === id);
};  