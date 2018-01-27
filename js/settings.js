(function () {
    'use strict';

    var localExtensions = [];

    chrome.storage.local.get('extensions', function (result) {
        parseExtensions(result.extensions);
    });

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        parseExtensions(changes['extensions'].newValue);
    });

    function parseExtensions(extensions) {
        if (extensions) {
            localExtensions = extensions;
            var domExtensions = document.getElementById('extensions');
            extensions.forEach(function (extension) {
                var domEl = document.getElementById('extension-' + extension.key);
                if (domEl) {
                    domEl.innerHTML = '<span><input type="checkbox" id="' + extension.key + '" /></span><span> ' + extension.name + '</span>';
                } else {
                    var item = '<div class="row" id="extension-'+extension.key+'">' +
                        '<span><input type="checkbox" id="' + extension.key + '" /></span><span> ' + extension.name + '</span>' +
                        '</div>';
                    domExtensions.innerHTML += item;
                }
                var input = domExtensions.querySelector('#' + extension.key);
                input.checked = extension.activated;
            });
            updateListeners();
        }
    }

    function checkBoxListener(e) {
        localExtensions.forEach(function(extension) {
            if (e.target.id === extension.key) {
                extension.activated = !extension.activated;
            }
        });
        chrome.storage.local.set({extensions: localExtensions});
    }

    function updateListeners() {
        var fields = document.querySelectorAll('#extensions .row');
        fields.forEach(function (field) {
            field.removeEventListener('change', checkBoxListener);
            field.addEventListener('change', checkBoxListener)
        });
    }
}());