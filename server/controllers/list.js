const List = require('../models/list');

exports.createList = (req, res) => {
    const list = new List(req.body);

    list.save((err, list) => {
        if (err) return res.status(500).json(err);

        return res.json(list);
    });
};

exports.getList = (req, res) => {
    List.findById(req.params.id, (err, list) => {
        if (err) return res.status(500).json(err);

        return res.json(list);
    });
};
