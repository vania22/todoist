const List = require('../models/list');
const Task = require('../models/task');

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

exports.updateList = (req, res) => {
    List.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true },
        (err, list) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.json(list);
            }
        },
    );
};

exports.deleteList = (req, res) => {
    List.findByIdAndRemove(req.params.id, (err, list) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            Task.deleteMany({ listId: req.params.id }, (err, tasks) => {
                if (err) {
                    return res.status(500).json(err);
                }
            });
            return res.json(list);
        }
    });
};
