window.onload = function () {
    console.log('Connecting to parent');
    var connection = Penpal.connectToParent({
        methods: {
            getData: function (d) {
                return new Promise(function (resolve) {
                   resolve({
                       name: 'Some Data',
                       d
                   }); 
                });
            }
        }
    });

    connection.promise.then(parent => {
        parent.openModal().then(function () {
           console.log('Opened modal from inside the iframe'); 
        });

        setTimeout(()=> {
            parent.closeModal().then(function () {
                console.log('Closed modal from inside the iframe'); 
            });
        }, 3000);
    })
}