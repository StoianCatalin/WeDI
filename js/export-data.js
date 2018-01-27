(function () {
    'use strict';

    var checkedOptions = {};
    var localExtensions = [];

    chrome.storage.local.get('extensions', function (result) {
        showOptions(result.extensions);
    });

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        showOptions(changes['extensions'].newValue);
    });

    function showOptions(extensions) {
        localExtensions = extensions;
        var domExtensions = document.getElementById('widi-options');
        extensions.forEach(function (extension) {
            checkedOptions[extension.key] = false;
            var domEl = document.getElementById('wedi-options-' + extension.key);
            if (domEl) {
                domEl.innerHTML = '<input type="checkbox" id="'+extension.key+'" value="'+extension.key+'"/>' +
                    '<label>'+extension.name+'</label>';
            } else {
                var item = '<span id="widi-options-'+extension.key+'">' +
                    '<input type="checkbox" id="'+extension.key+'" value="'+extension.key+'"/>' +
                    '<label>'+extension.name+'</label>' +
                    '</span>';
                domExtensions.innerHTML += item;
            }
        });
        updateListeners();
    }

    function checkBoxListener(e) {
        checkedOptions[e.target.id] = e.target.checked;
    }

    function updateListeners() {
        var fields = document.querySelectorAll('#widi-options input');
        fields.forEach(function (field) {
            field.removeEventListener('change', checkBoxListener);
            field.addEventListener('change', checkBoxListener)
        });
    }

    function startExport() {
        var format = document.getElementById('widi-format').value;
        if (format === 'json') {
            downloadJson();
        } else {
            downloadHTML();
        }
    }

    function downloadJson() {
        var data = {};
        localExtensions.forEach(function(extension) {
            if (checkedOptions[extension.key]) {
                data[extension.key] = extension.data;
            }
        });
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
        element.setAttribute('download', 'widi-export-' + new Date(Date.now()).toLocaleString()+'.json');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function downloadHTML() {
        var html = '';
        localExtensions.forEach(function(extension) {
            if (checkedOptions[extension.key]) {
                html += '<div class="'+extension.key+'s">';
                extension.data.forEach(function(item) {
                    html += '<div itemscope itemtype="http://schema.org/' + extension.itemType +'">';
                    Object.keys(item).forEach(function(key) {
                        html += '<span itemprop="'+key+'">'+item[key]+'</span>';
                    });
                    html += '</div>';
                });
                html += '</div>';
            }
        });
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));
        element.setAttribute('download', 'widi-export-' + new Date(Date.now()).toLocaleString()+'.html');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    document.getElementById('startFormat').addEventListener('click', startExport);
}());