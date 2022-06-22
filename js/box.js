const box =  document.querySelector('#box');

window.addEventListener('click', function (event) {

  if (event.target.hasAttribute('data-box')) {
		const product = event.target.closest('.product');
    const productData = {
			id: product.dataset.id,
			imgSrc: product.querySelector('.productImg').getAttribute('src'),
			title: product.querySelector('.title').innerText,
      kal: product.querySelector('[data-kal]').innerText,
			ves: product.getElementsByTagName('input')[0].value,
		};
    const productInBox = box.querySelector(`[data-id="${productData.id}"]`);
		
    if (productInBox && productData.ves > 0) {
      const result = parseInt(productInBox.getElementsByTagName('input')[0].value) + parseInt(productData.ves);
      
      productInBox.getElementsByTagName('input')[0].value = result;

		} else if(productData.ves > 0) {
      const HTML = `
        <div class="product" data-id="${productData.id}">
          <div class="boxItem">
            <img class="boxImg" src="${productData.imgSrc}">
            <div class="boxDesc">
              <div class="boxTitle">${productData.title}</div>
              <div class="productKal">${productData.kal} ккал/100 грамм</div>
              <div>
                <!-- Счётчик -->
                <div>
                  <input type="number" min="0" step="100" value="${productData.ves}" size="10"> г.
                </div>
                <!-- Конец счётчика -->
              </div>
              <div class="boxButtons"> 
              <button data-change>изменить</button>
              <button box-delete>удалить из корзины</button>
              </div>  
            </div> 
          </div>
        </div>`;
        box.insertAdjacentHTML('beforeend', HTML);
		}

    product.getElementsByTagName('input')[0].value = '';
		kalCalculator();
	}
  
  if (event.target.hasAttribute('box-delete')){
    event.target.closest('.product').remove();
    kalCalculator();
  }

  if (event.target.hasAttribute('data-change')){
    kalCalculator();
  }
});