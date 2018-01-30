(function() {
    return function (param) {
        var data = [];
        var numbers = param.text.match(/([0-9]{3,4}[-. ]?[0-9]{3,4}[-. ]?[0-9]{3,4})/gi);
        if (numbers) {
            data = numbers.map(function(number) {
                return {
                    number: number,
                    url: param.url
            }
            });
        }
        var uniq = new Set(data.map(function(e) {return JSON.stringify(e); } ));

        var res = Array.from(uniq).map(function(e) { return JSON.parse(e)});

        return res;
    };
}());

(function() {
    return function (param) {
        var data = [];
        var emails = param.text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (emails) {
            data = emails.map(function(email) {
                return {
                    email: email,
                    url: param.url
                }
            });
        }
        var uniq = new Set(data.map(function(e) {return JSON.stringify(e); } ));

        var res = Array.from(uniq).map(function(e) { return JSON.parse(e)});

        return res;
    };
}());

(function() {
    return function (param) {
        var data = [];
        if (param.url.includes('facebook.com')) {
            var el = document.createElement('div');
            el.innerHTML = param.text;
            el.style.display = 'none';
            var span = el.querySelector('#fb-timeline-cover-name');
            var link = span.querySelector('a');
            data.push({url: link.href, name: span.innerText});
        }

        return data;
    };
}());