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
    const categories = {};
    products.forEach(product => {
        if (!categories[product.categoria]) {
            categories[product.categoria] = [];
        }
        categories[product.categoria].push(product);
    });

    const mainSection = document.querySelector('body');
    Object.keys(categories).forEach(cat => {
        const section = document.createElement('section');
        section.className = 'products';
        section.innerHTML = `<h2>${cat.toUpperCase()}</h2><div class="grid"></div>`;
        const grid = section.querySelector('.grid');
        categories[cat].forEach(prod => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <p><strong>$${prod.precio}</strong></p>
                <p><strong>Código:</strong> ${prod.codigo}</p>
                <p><strong>Talla:</strong> ${prod.talla}</p>
                <p><strong>Color:</strong> ${prod.color}</p>
                <button>AGREGAR AL CARRITO</button>
            `;
            grid.appendChild(card);
        });
        mainSection.appendChild(section);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});