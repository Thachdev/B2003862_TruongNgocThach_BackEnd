exports.create = (req, res) => {
    res.send({ message: "create hendler"});
};

exports.findALL = (req, res) => {
    res.send({ message: "findAll handler"});
};

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler"});
};

exports.update = (req, res) => {
    res.send({ message: "update handler"});
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler"});
};

exports.deleteALL = (req, res) => {
    res.send({ message: "deleteAll handler"});
};

exports.findALLFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler"});
};