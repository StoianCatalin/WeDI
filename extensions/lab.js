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

