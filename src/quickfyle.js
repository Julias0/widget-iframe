var hasClass = function (el, className) {
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

var addClass = function (el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

var removeClass = function (el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

var createAddExpensebutton = function () {
    var button = document.createElement('button');
    button.innerText = 'Add Expense';
    return button;
}

var createModal = function () {
    var modal = document.createElement('div');
    modal.className = 'quickfyle-modal'
    modal.innerHTML = '<iframe class="quickfyle-modal-frame" src="/widget.html" frameborder="0"></iframe>'
    return modal;
}

var createStyleSheet = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = `
       #quickfyle > button {
           color: #fff;
           background-color: #f36;
           border-radius: 4px;
           min-wdth: 120px;
       } 

       .quickfyle-modal {
        position: fixed;
        top: 10px;
        left: 10px;
        height: calc(100% - 20px);
        width: calc(100% - 20px);
        background-color: #fff;
        border: 1px solid black;
        border-radius: 4px;
       }

       .quickfyle-modal-frame {
           height: 100%;
           width: 100%;
       }

       .quickfyle-modal.invisible{
         display: none;
        }

       .quickfyle-modal.visible {
         display: block;
       }
    `;
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    return style;
}

var style = createStyleSheet();

function Quickfyle(element, config) {
    var addExpenseButton = createAddExpensebutton();
    var modal = createModal();
    element.appendChild(addExpenseButton);
    document.body.appendChild(modal);
    document.body.appendChild(style);
    var iframe = modal.getElementsByClassName('quickfyle-modal-frame')[0];
    var setInvisible = function () {
        addClass(modal, 'invisible');
        removeClass(modal, 'visible');
    };

    var setVisible = function (params) {
        addClass(modal, 'visible');
        removeClass(modal, 'invisible');
    };

    setInvisible(); 
    addExpenseButton.addEventListener('click', function (event) {
        setVisible();
    });

    connection = Penpal.connectToChild({
        iframe: iframe,
        methods: {
            openModal: function () {
                setVisible();
            },
            closeModal: function () {
                setInvisible();
            },
            init: function () {
               return config; 
            }
        }
    });
    return {
        element: element,
        modal: modal,
        openModal: function () {
            setVisible();
        },
        closeModal: function () {
            setInvisible();
        },
        getData: function (arg) {
            return connection.promise.then(function (child) {
              return child.getData(arg); 
            });
        }
    };
}

window.Quickfyle = Quickfyle;