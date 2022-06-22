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
        <div>
            <div class="product" data-id="${item.id}">
                <img class="productImg" src="images/${item.imgSrc}" alt="" width="250">
                <div class="productBody">
                    <h4 class="title">${item.title}</h4>
                    <p><small data-kal >${item.kal}</small> <small>ккал/100 грамм</small> </p>
                    <div class="entryField">
                        <!-- Поле -->
                            <input entry-field type="number" min="0" step="100" placeholder="Введите вес продукта" size="10">г
                        <!-- Конец поля -->
                    </div>
                </div>
                <button data-box >в корзину</button>
            </div>
        </div>`
    Container.insertAdjacentHTML('beforeend', HTML);
    });
}
