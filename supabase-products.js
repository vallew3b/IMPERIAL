// Supabase connection and product rendering
const SUPABASE_URL = 'https://pyuqebokjhtwyrojwgxd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IUyaOWBuDvTAURD92VCxQQ_AGQN1-pw';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadProducts() {
    const { data, error } = await supabase
        .from('productos')
        .select('*');
    if (error) {
        console.error('Error fetching products:', error);
        return;
    }
    renderProductsByCategory(data);
}

function renderProductsByCategory(products) {
    // Coloca los productos en las secciones existentes por id
    products.forEach(product => {
        const categoriaId = product.categoria ? product.categoria.toLowerCase() : '';
        const section = document.getElementById(categoriaId);
        if (section) {
            const grid = section.querySelector('.grid');
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <p><strong>$${product.precio}</strong></p>
                <p><strong>Código:</strong> ${product.codigo}</p>
                <p><strong>Talla:</strong> ${product.talla}</p>
                <p><strong>Color:</strong> ${product.color}</p>
                <button>AGREGAR AL CARRITO</button>
            `;
            grid.appendChild(card);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});