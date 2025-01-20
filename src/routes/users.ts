import express from 'express';
import SearchController from '../controllers/SearchController';

const UserRoutes = express.Router();

UserRoutes.get('', SearchController.index);

export default UserRoutes;