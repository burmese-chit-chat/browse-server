import express from 'express';
import SearchController from '../controllers/SearchController';
import UserController from '../controllers/UserController';

const UserRoutes = express.Router();

UserRoutes.get('', SearchController.index);
UserRoutes.get('/:username', UserController.show_with_username);

export default UserRoutes;