window.addEventListener('click', function(event){
    if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus"){
        const countWrap = event.target.closest('.counterWrapper');
        const productCounter = countWrap.querySelector('[data-counter]');
        
        if (event.target.dataset.action === "plus"){
            productCounter.innerText++;
        }
        if (event.target.dataset.action === "minus" && productCounter.innerText > 0){
            productCounter.innerText--;
        }
    }
});