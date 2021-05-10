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

    var checkForToken = function (callback) {
        var token = localStorage.getItem('token');  
        if (token) {
            console.log('We got a token!')
            callback(token);
        } else {
            setTimeout(function () {
               checkForToken(callback, 1000); 
            });
        }
    }

    document.getElementById('primary').addEventListener('click', function (event) {
        var authWindow = window.open('/auth.html');
        checkForToken(function (token) {
            console.log('you are officially logged in!' + token);
            authWindow.close();
        })
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