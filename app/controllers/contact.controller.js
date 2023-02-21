const ConstantService = requite("../services/contact.service.js");
const MongoDB = requite("../utils/mongodb.util.js");
const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const contactService = new ConstantService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (erorr) {
        return next(
            new ApiError(500, "An erorr occurred while creating the contact")
        );
    }
};

exports.findALL = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (erorr) {
        return next(
            new ApiError(500, "An erorr occurred while retrieving contacts")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Contact not found"));
        }
        return res.send(document);
    } catch (erorr) {
        return next(
            new ApiError(
                500,
                `Eroor retreving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(400, "Contact can not found"));
        }
        return res.send({ message: "Contact was updated seccessfully"});
    } catch (erorr) {
        return next(
            new ApiError(500, `Erorr updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact can not found"));
        }
        return res.send({ message: "Contact was deleted successfully"});
    } catch (erorr) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};

exports.findALLFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (erorr) {
        return next(
            new ApiError(
                500,
                "An erorr occured while retreving favorite contacts"
            )
        );
    }
};

exports.deleteALL = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteALL();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (erorr) {
        return next(
            new ApiError(500, "An erorr occurred while removing all contacs")
        );
    }
};