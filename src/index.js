window.onload = function () {
    var element1 = document.getElementById('quickfyle1');
    var element2 = document.getElementById('quickfyle2');
    var element3 = document.getElementById('quickfyle3');

    var quickFyle1 = Quickfyle(element1, { backgroundColor: 'red' });
    var quickFyle2 = Quickfyle(element2, {
        backgroundColor: 'green',
        onPrimaryClickedHook: function (args) {
            console.log(args);
        }
    });
    var quickFyle3 = Quickfyle(element3, {
        backgroundColor: 'blue', onSecondaryClickedHook: function (args) {
            console.log(args);
        }
    });

    quickFyle1.getData(123).then(console.log);
}