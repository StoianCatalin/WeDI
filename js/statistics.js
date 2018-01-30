(function () {
    'use strict';

    chrome.storage.local.get('extensions', function (result) {
        showStatistics(result.extensions);
    });

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        showStatistics(changes['extensions'].newValue);
    });

    function showStatistics(extensions) {
        var domExtensions = document.getElementById('widi-statistics');
        var total = 0;
        if (extensions)
            extensions.forEach(function (extension) {
                if (!extension.data) {
                    extension.data = [];
                }
                var domEl = document.getElementById('wedi-statistics-' + extension.key);
                if (domEl) {
                    domEl.innerHTML = '<span class="left"><i class="fa '+extension.icon+'"  aria-hidden="true"></i> ' + extension.name + '</span>' +
                        '<span class="right"> ' + extension.data.length + '</span>' +
                        '<div class="clearfloat"></div>';
                } else {
                    var item = '<div class="row" id="wedi-statistics-' + extension.key + '">' +
                        '<span class="left"><i class="fa '+extension.icon+'" aria-hidden="true"></i> ' + extension.name + '</span>' +
                        '<span class="right"> ' + extension.data.length+ '</span>' +
                        '<div class="clearfloat"></div>' +
                        '</div>';
                    domExtensions.innerHTML += item;
                }
                total += extension.data.length;
            });
        document.getElementById('total-statistics').innerHTML = total.toString();
    }
}());