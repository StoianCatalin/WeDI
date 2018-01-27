(function () {
    'use strict';

    var recordingButton = document.getElementById('unchecked');

    var recordingStatus;
    chrome.storage.local.get('recordingStatus', function (result) {
        recordingStatus = result.recordingStatus;
        recordingButton.checked = recordingStatus;
        changeTextBasedOnStatus(recordingStatus);
    });

    function recording() {
        recordingStatus = !recordingStatus;
        recordingButton.checked = recordingStatus;
        chrome.storage.local.set({recordingStatus: recordingStatus});
        changeTextBasedOnStatus(recordingStatus);
    }

    function changeTextBasedOnStatus(value) {
        if (value) {
            document.getElementById('not-recording-text').style.display = 'none';
            document.getElementById('recording-text').style.display = 'inline';
        } else {
            document.getElementById('not-recording-text').style.display = 'inline';
            document.getElementById('recording-text').style.display = 'none';
        }
    }

    recordingButton.addEventListener('click', recording);
}());

