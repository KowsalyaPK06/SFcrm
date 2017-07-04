function MyCustomStorage() {
}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    if (err) return cb(err)
    console.log(file);
    return cb(null, file);
}

module.exports.MyCustomStorage = MyCustomStorage;