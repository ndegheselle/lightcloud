/** Modals **/
document.addEventListener('DOMContentLoaded', () => {
    
    const targets = [
        {
            selector: '[data-modal]',
            callback: function(element) {
                const modal = element.dataset.modal;
                const $target = document.getElementById(modal);
                open($target);
            }
        },
        {
            selector: '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button[data-dismiss="modal"]',
            callback: function(element) {
                const $target = element.closest('.modal');
                close($target);
            }
        },
        {
            selector: '.dropdown-trigger [aria-haspopup="true"]',
            callback: function(element) {
                const $target = element.closest('.dropdown');
                open($target);
            }
        }
    ]

    // Functions to open and close
    function open($el) {
        $el.classList.add('is-active');
    }

    function close($el) {
        $el.classList.remove('is-active');
    }

    function closeAll(selector) {
        (document.querySelectorAll(selector) || []).forEach(($modal) => {
            close($modal);
        });
    }

    document.addEventListener("click", function(e){
        for (const target of targets)
        {
            let element = e.target.closest(target.selector);
            if (element) return target.callback(element);
        }

        closeAll('.modal');
        closeAll('.dropdown');
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        // Escape key
        if (e.code === 'Escape') { 
            closeAll('.modal');
            closeAll('.dropdown');
        }
    });
});