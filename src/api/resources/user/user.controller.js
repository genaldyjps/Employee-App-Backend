import userService from './user.service';
import { devConfig } from '../../../config/env/development';

export default {
    async login(req, res) {
        try {
            const { error, value } = userService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(400).json(error);
            }
            const user = (value.email == devConfig.userdemo['email'] && value.password == devConfig.userdemo['password']);
            if (!user) {
                return res
                    .status(400)
                    .json({ err: 'invalid email or password' });
            }
            return res.json({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }
};