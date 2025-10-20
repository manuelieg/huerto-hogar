import { productos } from './productos.js';

export const ordenes = [
    {
        id: "ORD-10001",
        cliente: { nombre: "Juan", apellidos: "Pérez", correo: "juan@mail.com" },
        items: [
            { id: "FR001", cantidad: 3 },
            { id: "VR001", cantidad: 2 }
        ],
        total: 3 * productos.find(p => p.id === "FR001").precio 
             + 2 * productos.find(p => p.id === "VR001").precio,
        estado: "Pagado"
    },
    {
        id: "ORD-10002",
        cliente: { nombre: "María", apellidos: "Gómez", correo: "maria@mail.com" },
        items: [
            { id: "FR003", cantidad: 5 },
            { id: "PO001", cantidad: 1 }
        ],
        total: 5 * productos.find(p => p.id === "FR003").precio 
             + 1 * productos.find(p => p.id === "PO001").precio,
        estado: "Pagado"
    },
    {
        id: "ORD-10003",
        cliente: { nombre: "Pedro", apellidos: "López", correo: "pedro@mail.com" },
        items: [
            { id: "FR002", cantidad: 4 },
            { id: "VR003", cantidad: 3 }
        ],
        total: 4 * productos.find(p => p.id === "FR002").precio 
             + 3 * productos.find(p => p.id === "VR003").precio,
        estado: "Pendiente"
    }
];

export const getAllOrders = () => ordenes;