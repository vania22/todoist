import List from '../models/list';
import Task from '../models/task';

export const createList = (req: any, res: any) => {
    const list = new List(req.body);

    list.save((err, list) => {
        if (err) return res.status(500).json(err);

        return res.json(list);
    });
};

export const getList = (req: any, res: any) => {
    List.findById(req.params.id, (err, list) => {
        if (err) return res.status(500).json(err);

        return res.json(list);
    });
};

export const updateList = (req: any, res: any) => {
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

export const deleteList = (req: any, res: any) => {
    List.findByIdAndRemove(req.params.id, (err, list) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            Task.deleteMany({ listId: req.params.id }, (err: any): void => {
                if (err) {
                    return res.status(500).json(err);
                }
            });
            return res.json(list);
        }
    });
};
