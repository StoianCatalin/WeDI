(function () {
    'use strict';

    var importButton = document.getElementById('import-button');

    function importExtension() {
        var input, file, fr;

        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('fileinput');
        if (!input) {
            alert("Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
        }

        function receivedText(e) {
            var lines = e.target.result;
            var newArr = JSON.parse(lines);
            chrome.storage.local.get('extensions', function(result) {
                var data;
                if (!result.extensions) {
                    data = [];
                } else {
                    data = result.extensions;
                }
                var alreadyExist = false;
                data.forEach(function (extension) {
                    if (extension.key === newArr.key) {
                        alreadyExist = true;
                        Object.assign(extension, newArr);
                    }
                });
                if (!alreadyExist) {
                    data.push(newArr);
                    newArr.activated = false;
                }
                chrome.storage.local.set({extensions: data});
                input.value = '';
                var visibleTab = document.querySelector('.container.show');
                visibleTab.classList = 'container';
                var tab = document.querySelector('#settings');
                tab.classList = 'container show';
            });
        }
    }

    importButton.addEventListener('click', importExtension);
}());