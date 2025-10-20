export const carouselItems = [
    { 
        id: 1, 
        src: '/images/frutasBanner.jpg', 
        alt: 'Mesa con frutas y verduras frescas', 
        titulo: 'Explora HuertoHogar', 
        descripcion: 'Descubre nuestras frutas y verduras 100% naturales.' 
    },
    { 
        id: 2, 
        src: '/images/lacteosBanner.jpg', 
        alt: 'Bandeja de lácteos y quesos', 
        titulo: 'Lácteos y Derivados', 
        descripcion: 'Calidad premium garantizada. Compra ahora.' 
    },
    { 
        id: 3, 
        src: '/images/verdurasBanner.jpg', 
        alt: 'Verduras frescas!', 
        titulo: '¡Todo tipo de verduras, a un solo click!', 
        descripcion: 'Empieza tus comidas con las mejores verduras' 
    },
];

export const getCarouselItems = () => {

    return carouselItems;
};