import Task from '../models/task';

export const createTask = (req: any, res: any) => {
    const task = new Task({ ...req.body, listId: req.params.listId });

    task.save((err, task) => {
        if (err) return res.status(500).json(err);

        return res.json(task);
    });
};

export const getTask = (req: any, res: any) => {
    Task.findById(req.params.id, (err, task) => {
        if (err) return res.status(500).json(err);

        return res.json(task);
    });
};

export const updateTask = (req: any, res: any) => {
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

export const deleteTask = (req: any, res: any) => {
    Task.findByIdAndRemove(req.params.id, (err, task) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.json(task);
        }
    });
};
