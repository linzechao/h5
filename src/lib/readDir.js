var fs = require('fs');

function readSync(path) {
    let html = {};

    read(path);
    function read(_path) {
        let files = fs.readdirSync(_path);

        files.forEach(file => {

            let filename = _path + '/' + file,
                stat = fs.statSync(filename);

            if (stat.isDirectory()) {
                read(filename);
            } else {
                html[file.split('.')[0]] = filename;
            }

        });
    }

    return html;
};


module.exports = {
    read: readSync
};

