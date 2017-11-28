(function () {
    'use strict';

    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function ($event) {
            if ($event.target.attributes['data-target'] && $event.target.attributes['data-target'].value) {
                var visibleTab = document.querySelector('.container.show');
                visibleTab.classList = 'container';
                var tab = document.querySelector('#' + $event.target.attributes['data-target'].value);
                tab.classList = 'container show';
            }
        });
    }

    var backButtons = document.getElementsByClassName('back');
    for (var i = 0; i < backButtons.length; i++) {
        backButtons[i].addEventListener('click', function () {
            var visibleTab = document.querySelector('.container.show');
            visibleTab.classList = 'container';
            var tab = document.querySelector('#dashboard');
            tab.classList = 'container show';
        });
    }
}());