function kalCalculator() {
  const boxItems = document.querySelectorAll('.boxItem');
  const totalKal = document.querySelector('.total-kal')
  let productsKal = 0;

   boxItems.forEach(function(item){
    const kalAmount = parseInt(item.querySelector('.productKal').innerText)
    const gramAmount = parseInt(item.getElementsByTagName('input')[0].value)
    const numberForKalCount = 100;
    const currentKal = kalAmount * gramAmount/ numberForKalCount;
    productsKal += currentKal;
})
totalKal.innerText = productsKal;
console.log(totalKal.innerText)

}