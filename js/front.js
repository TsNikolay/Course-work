const Container = document.querySelector('#container');
getData();
async function getData() {
    fetch('./js/products.json')
    .then(data => data.json())
    .then(array => makeHTML(array))
}
function makeHTML(array) {
    array.forEach(function (item) {
        const HTML = `
        <div class="col-md-5">
        <div class="productCard" data-id="${item.id}">
            <img class="product-img" src="images/${item.imgSrc}" alt="" width="250">
            <div class="card-body">
                <h4 class="productTitle">${item.title}</h4>
                <p><small data-products-in-box class="text-muted">${item.kal} ккал/100 грамм</small></p>
                <div class="details">
                    
                  <!-- Счётчик -->
                  
                    <div class=" counterWrapper">
                    <form><input type="number" min="1" placeholder="Введите вес продукта" size="10">г</form>
                    </div>
                  <!-- Конец счётчика -->
                </div>
            </div>
            <button data-box >в корзину</button>
        </div>
    </div>`;
        Container.insertAdjacentHTML('beforeend', HTML);
    });
}