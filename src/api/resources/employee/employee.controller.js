import Joi from 'joi';
import Employee from './employee.model'

export default {
    findAll(req, res, next) {
        Employee.find().then(employee => res.json(employee))
            .catch(err => res.status(500).json(err));
    },
    create(req, res) {
        const { username, firstName, lastName, email, birthDate, basicSalary, status, group, description } = req.body;
        const schema = Joi.object().keys({
            username: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            birthDate: Joi.date().required(),
            basicSalary: Joi.number().required(),
            status: Joi.string().required(),
            group: Joi.string().required(),
            description: Joi.string().required()
        });

        const { error, value } = Joi.validate(req.body, schema);
        if(error && error.details) {
            return res.status(400).json(error);
        }

        Employee.create({ username, firstName, lastName, email, birthDate, basicSalary, status, group, description })
            .then(employee => res.json(employee))
            .catch(err => res.status(500).json(err));
    },
    findOne(req, res) {
        let {id} = req.params;
        Employee.findById(id).then(employee => {
            if(!employee) {
                return res.status(404).json({err: 'Could not find any employee'});
            }
            return res.json(employee);
        })
        .catch(err => res.status(500).json(err));
    },
    delete(req, res) {
        let {id} = req.params;
        Employee.findByIdAndRemove(id)
            .then(employee => {
                if(!employee) {
                    return res.status(404).json({err: 'Could not delete any employee'});
                }
                return res.json(employee);
            })
            .catch(err => res.status(500).json(err));
    },
    update(req, res) {
        let { id } = req.params;
        const schema = Joi.object().keys({
            username: Joi.string().optional(),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            email: Joi.string().optional(),
            birthDate: Joi.date().optional(),
            basicSalary: Joi.number().optional(),
            status: Joi.string().optional(),
            group: Joi.string().optional(),
            description: Joi.string().optional()
        });

        const { error, value } = Joi.validate(req.body, schema);
        if(error && error.details) {
            return res.status(400).json(error);
        }
        Employee.findOneAndUpdate({ _id: id }, value, { new: true })
            .then(employee => res.json(employee))
            .catch(err => res.status(500).json(err))
    }
    
}