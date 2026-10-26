/* Macro Wholefoods front end. Each page sets <body data-page="..."> and the matching function runs. */
const $ = (s, r = document) => r.querySelector(s);

// Escape text before putting it in HTML (stops script injection; PHP will use htmlspecialchars)
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rm = n => 'RM' + n.toFixed(2);

// ---------- Product and cart helpers (cart lives in localStorage for this prototype) ----------
const findP = id => PRODUCTS.find(p => p.id === Number(id));
const sizeOf = (pid, label) => (findP(pid) || {sizes: []}).sizes.find(s => s.label === label);
const lowest = p => Math.min(...p.sizes.map(s => s.price));
const getCart = () => {
  try { return (JSON.parse(localStorage.getItem('mw_cart')) || []).filter(i => sizeOf(i.pid, i.size)); }
  catch { return []; }
};
const saveCart = c => { try { localStorage.setItem('mw_cart', JSON.stringify(c)); } catch {} updateBadge(); };
const cartCount = () => getCart().reduce((n, i) => n + i.qty, 0);
const subtotal = () => getCart().reduce((t, i) => t + sizeOf(i.pid, i.size).price * i.qty, 0);
const updateBadge = () => { const b = $('#badge'); if (b) b.textContent = cartCount(); };

function addToCart(pid, size, qty) {
  const c = getCart(), max = sizeOf(pid, size).stock, it = c.find(i => i.pid === pid && i.size === size);
  if (it) it.qty = Math.min(max, it.qty + qty); else c.push({pid, size, qty: Math.min(max, qty)});
  saveCart(c);
}

const card = p => `<a class="card" href="product.html?id=${p.id}"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy">
  <h3>${esc(p.name)}</h3><p class="price">${p.sizes.length > 1 ? 'From ' : ''}${rm(lowest(p))}</p>
  <p class="muted sz">${p.sizes.map(s => esc(s.label)).join(' · ')}</p></a>`;

// ---------- Shared header, footer and mobile contact bar (become PHP includes in Phase 4) ----------
const ico = d => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const mapSrc = () => 'https://www.google.com/maps?q=' + encodeURIComponent(SHOP.mapQuery) + '&output=embed';

function layout() {
  const pg = document.body.dataset.page, cur = on => on ? ' aria-current="page"' : '';
  const cats = [...new Set(PRODUCTS.map(p => p.cat))];
  document.body.insertAdjacentHTML('afterbegin', `<div class="ann">Free pickup at our Bukit Beruang shop · Flat ${rm(DELIVERY_FEE)} delivery</div>
  <header class="top"><div class="wrap hd">
    <button class="menu" id="menu" aria-label="Menu" aria-expanded="false" aria-controls="nav">${ico('<path d="M4 7h16M4 12h16M4 17h16"/>')}</button>
    <a class="logo" href="index.html">
      <img src="assets/img/logo.png" alt="Macro Wholefoods">
    </a>
    <form class="search" action="shop.html" role="search"><input name="q" type="search" placeholder="Search products" aria-label="Search products"><button aria-label="Search">${ico('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>')}</button></form>
    <a class="cart" href="cart.html" aria-label="Cart">${ico('<path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>')}<span id="badge" class="badge">0</span></a></div>
  <nav class="nav" id="nav" aria-label="Main"><div class="wrap">
    <a href="index.html"${cur(pg === 'home')}>Home</a>
    <a href="shop.html"${cur(pg === 'shop' || pg === 'product')}>Shop</a>
    <a href="info.html"${cur(pg === 'info')}>Info</a>
    <a href="contact.html"${cur(pg === 'contact')}>Contact</a>
  </div></nav></header>`);
  $('#menu').onclick = e => { const o = $('#nav').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); };
  document.body.insertAdjacentHTML('beforeend', `<footer><div class="wrap fgrid">
    <div><p class="flogo"><img src="assets/img/logo.png" alt="Macro Wholefoods"></p><p>Macro Organic Sdn. Bhd.<br>Organic products and vegetarian dining in Bukit Beruang, Melaka.</p></div>
    <div><h3>Shop</h3><a href="shop.html">All products</a><a href="cart.html">Cart</a><a href="${SHOP.shopee}" target="_blank" rel="noopener">Also on Shopee</a></div>
    <div><h3>Info</h3><a href="info.html">About and location</a><a href="contact.html">Contact us</a></div>
    <div><h3>Visit us</h3><p>${esc(SHOP.address)}<br>${esc(SHOP.hours)}</p><a href="tel:${SHOP.tel}">${esc(SHOP.phone)}</a></div></div>
    <div class="wrap fine">Prototype: checkout is a demo and no real payments are taken.</div></footer>
    <div class="bar"><a class="btn alt" href="tel:${SHOP.tel}">Call shop</a><a class="btn green" href="https://wa.me/${SHOP.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></div>`);
  document.querySelectorAll('[data-shop]').forEach(e => e.textContent = SHOP[e.dataset.shop]);
  document.querySelectorAll('[data-map]').forEach(e => e.src = mapSrc());
  updateBadge();
}

// ---------- Pages ----------
function home() {
  $('#featured').innerHTML = PRODUCTS.map(card).join('');
  const cats = [...new Set(PRODUCTS.map(p => p.cat))];
  $('#cats').innerHTML = cats.map(c => { const ps = PRODUCTS.filter(p => p.cat === c);
    return `<a class="cat" href="shop.html?cat=${encodeURIComponent(c)}"><img src="${ps[0].img}" alt=""><span>${esc(c)}<small>${ps.length} product${ps.length > 1 ? 's' : ''}</small></span></a>`; }).join('');
}

// Contact form: prototype only, nothing is sent until the PHP backend exists (Phase 4)
function contact() {
  $('#cform').onsubmit = e => { e.preventDefault(); $('#cmsg').textContent = 'Prototype: your message was not sent. Please call or WhatsApp us for now.'; };
}

function shop() {
  const cats = [...new Set(PRODUCTS.map(p => p.cat))];
  const chips = $('#chips');
  const grid = $('#grid');
  const search = $('#search');
  const priceForm = $('#price-range');
  const sortBy = $('#sort-by');
  const params = new URLSearchParams(location.search);

  let cat = cats.includes(params.get('cat')) ? params.get('cat') : 'All';
  let query = (params.get('q') || '').toLowerCase();
  let minPrice = null;
  let maxPrice = null;

  search.value = params.get('q') || '';

  chips.innerHTML = ['All', ...cats].map(category => {
    const label = category === 'All' ? 'All Products' : category;
    const href = category === 'All'
      ? 'shop.html'
      : `shop.html?cat=${encodeURIComponent(category)}`;

    return `<a href="${href}" data-category="${esc(category)}">${esc(label)}</a>`;
  }).join('');

  const draw = () => {
    chips.querySelectorAll('a').forEach(link => {
      if (link.dataset.category === cat) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    let products = PRODUCTS.filter(product => {
      const price = lowest(product);
      return (cat === 'All' || product.cat === cat)
        && product.name.toLowerCase().includes(query)
        && (minPrice === null || price >= minPrice)
        && (maxPrice === null || price <= maxPrice);
    });

    if (sortBy.value === 'low-high') {
      products.sort((a, b) => lowest(a) - lowest(b));
    } else if (sortBy.value === 'high-low') {
      products.sort((a, b) => lowest(b) - lowest(a));
    }

    grid.innerHTML = products.length
      ? products.map(card).join('')
      : '<p>No products found.</p>';
  };

  chips.addEventListener('click', event => {
    const link = event.target.closest('a[data-category]');
    if (!link) return;
    event.preventDefault();
    cat = link.dataset.category;
    draw();
  });

  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    draw();
  });

  priceForm.addEventListener('submit', event => {
    event.preventDefault();
    const min = $('#min-price').value;
    const max = $('#max-price').value;
    minPrice = min === '' ? null : Number(min);
    maxPrice = max === '' ? null : Number(max);
    draw();
  });

  sortBy.addEventListener('change', draw);
  draw();
}

function product() {
  const p = findP(new URLSearchParams(location.search).get('id')), box = $('#detail');
  if (!p) { box.innerHTML = '<p>Product not found. <a href="shop.html">Back to shop</a></p>'; return; }
  let size = p.sizes[0], qty = 1;
  const draw = () => {
    const out = size.stock < 1;
    box.innerHTML = `<img class="pimg" src="${p.img}" alt="${esc(p.name)} ${esc(size.label)}"><div>
      <h1>${esc(p.name)}</h1><p class="price big">${rm(size.price)}</p>
      <p>${out ? 'Sold out' : size.stock <= 5 ? 'Low stock' : 'In stock'}</p>
      <h2>Size</h2><div class="chips">${p.sizes.map(s => `<button class="chip" data-l="${esc(s.label)}" aria-pressed="${s === size}">${esc(s.label)}</button>`).join('')}</div>
      <h2>Quantity</h2><div class="qty"><button aria-label="Decrease" data-d="-1">−</button><span>${qty}</span><button aria-label="Increase" data-d="1">+</button></div>
      <p><button class="btn" id="add" ${out ? 'disabled' : ''}>Add to cart · ${rm(size.price * qty)}</button></p>
      <p id="note" role="status"></p>
      <p class="muted">Delivery ${rm(DELIVERY_FEE)} flat, or free pickup at our Melaka shop.</p><p>${esc(p.desc)}</p></div>`;
  };
  box.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.l) { size = p.sizes.find(s => s.label === b.dataset.l); qty = 1; draw(); }
    else if (b.dataset.d) { qty = Math.max(1, Math.min(size.stock, qty + Number(b.dataset.d))); draw(); }
    else if (b.id === 'add') { addToCart(p.id, size.label, qty); $('#note').textContent = 'Added to cart.'; }
  };
  draw();
}

function cart() {
  const box = $('#cart');
  const draw = () => {
    const c = getCart();
    if (!c.length) { box.innerHTML = '<p>Your cart is empty.</p><a class="btn" href="shop.html">Browse products</a>'; return; }
    box.innerHTML = c.map((i, n) => { const p = findP(i.pid), s = sizeOf(i.pid, i.size); return `<div class="line">
      <div class="grow"><strong>${esc(p.name)}</strong><br><span class="muted">${esc(i.size)} · ${rm(s.price)}</span></div>
      <div class="qty"><button aria-label="Decrease" data-n="${n}" data-d="-1">−</button><span>${i.qty}</span><button aria-label="Increase" data-n="${n}" data-d="1">+</button></div>
      <strong>${rm(s.price * i.qty)}</strong><button class="lnk" data-n="${n}" data-rm="1">Remove</button></div>`; }).join('')
      + `<p class="row total"><span>Subtotal</span><span>${rm(subtotal())}</span></p><a class="btn" href="checkout.html">Proceed to checkout</a>`;
  };
  box.onclick = e => {
    const b = e.target.closest('button'); if (!b || b.dataset.n === undefined) return;
    const c = getCart(), i = c[b.dataset.n];
    if (b.dataset.rm) c.splice(b.dataset.n, 1);
    else i.qty = Math.max(1, Math.min(sizeOf(i.pid, i.size).stock, i.qty + Number(b.dataset.d)));
    saveCart(c); draw();
  };
  draw();
}

function checkout() {
  document.body.classList.add('nobar');
  if (!getCart().length) { $('#step-details').innerHTML = '<h1>Checkout</h1><p>Your cart is empty.</p><a class="btn" href="shop.html">Browse products</a>'; return; }
  const form = $('#form'), steps = ['step-details', 'step-pay', 'step-wait', 'step-done'];
  const show = id => { steps.forEach(s => $('#' + s).hidden = s !== id); window.scrollTo(0, 0); };
  let orderNo = '';

  // Order summary + address fields react to the Pickup/Delivery choice. Returns the delivery fee.
  const drawSum = () => {
    const fee = form.delivery.value === 'delivery' ? DELIVERY_FEE : 0;
    $('#addr').hidden = fee === 0;
    ['address', 'postcode', 'city'].forEach(id => $('#' + id).required = fee > 0);
    $('#sum').innerHTML = '<h2>Order summary</h2>' + getCart().map(i => `<div class="row"><span>${esc(findP(i.pid).name)} ${esc(i.size)} × ${i.qty}</span><span>${rm(sizeOf(i.pid, i.size).price * i.qty)}</span></div>`).join('')
      + `<hr><div class="row"><span>Subtotal</span><span>${rm(subtotal())}</span></div><div class="row"><span>Delivery</span><span>${rm(fee)}</span></div>
      <div class="row total"><span>Total</span><span>${rm(subtotal() + fee)}</span></div>`;
    return fee;
  };
  form.onchange = drawSum; drawSum();

  // Step 1 -> 2: the browser has already validated required/pattern fields before this fires
  form.onsubmit = e => {
    e.preventDefault();
    const total = subtotal() + drawSum();
    orderNo = 'MW-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(Math.floor(Math.random() * 9000) + 1000);
    $('#pay-order').textContent = 'Order ' + orderNo;
    $('#pay-amt').textContent = rm(total);
    $('#pay').textContent = 'Pay ' + rm(total);
    show('step-pay');
  };
  $('#back').onclick = () => show('step-details');

  // Step 2 -> 3 -> 4: MOCK payment. Nothing is charged or sent anywhere.
  $('#pay').onclick = () => {
    show('step-wait');
    setTimeout(() => {
      const home = form.delivery.value === 'pickup';
      $('#d-name').textContent = $('#name').value;
      $('#d-no').textContent = orderNo;
      $('#d-how').textContent = home ? `Collect at: ${SHOP.address} (${SHOP.hours}).`
        : `We will deliver to: ${$('#address').value}, ${$('#postcode').value} ${$('#city').value}.`;
      saveCart([]);
      show('step-done');
    }, 2000);
  };
}

layout();
({home, shop, product, cart, checkout, contact})[document.body.dataset.page]?.();
