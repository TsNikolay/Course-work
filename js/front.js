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
            <hr>
            <div class="card-body">
                <h4 class="productTitle">${item.title}</h4>
                <p><small data-products-in-box class="text-muted">${item.kal} ккал</small></p>
                
                <div class="details">
                    
                  <!-- Счётчик -->
                  
                    <div class="product counterWrapper">
                        <div class="productControl" data-action="minus">-</div>
                        <div class="productCurrent" data-counter>1</div>
                        <div class="productControl" data-action="plus">+</div>
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