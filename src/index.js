window.onload = function () {
   var element1 = document.getElementById('quickfyle1');
   var element2 = document.getElementById('quickfyle2');
   var element3 = document.getElementById('quickfyle3');

   var quickFyle1 = Quickfyle(element1);
   var quickFyle2 = Quickfyle(element2);
   var quickFyle3 = Quickfyle(element3);


   quickFyle1.getData(123).then(console.log);

//    quickFyle1.openModal();
//    setTimeout(()=> {
//        quickFyle1.closeModal();
//    }, 5000);
}