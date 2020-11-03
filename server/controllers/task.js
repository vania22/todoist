const Task = require('../models/task');

exports.createTask = (req, res) => {
    const task = new Task({ ...req.body, listId: req.params.listId });

    task.save((err, task) => {
        if (err) return res.status(500).json(err);

        return res.json(task);
    });
};

exports.getTask = (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (err) return res.status(500).json(err);

        return res.json(task);
    });
};

exports.updateTask = (req, res) => {
    Task.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true },
        (err, task) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.json(task);
            }
        },
    );
};

exports.deleteTask = (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, task) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.json(task);
        }
    });
};
