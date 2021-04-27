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


    var container = document.getElementsByClassName('container')[0]
    connection.promise.then(function (parent) {
        parent.init().then(function (config) {
            container.style.backgroundColor = config && config.backgroundColor;
        })
    })

    document.getElementById('close-button').addEventListener('click', function (event) {
        connection.promise.then(function (parent) {
            parent.closeModal();
        });
    });

    document.getElementById('primary').addEventListener('click', function (event) {
        connection.promise.then(function (parent) {
            parent.primaryClicked({
                message: 'Primary was clicked from inside the widget!'
            });
        });
    })

    document.getElementById('secondary').addEventListener('click', function (event) {
        connection.promise.then(function (parent) {
            parent.secondaryClicked({
                message: 'Secondary was clicked from inside the widget!'
            });
        });
    })
}