import express from 'express';
import UserDataController from '../controllers/UserDataController';


const UserDataRoutes = express.Router();

UserDataRoutes.get('/:user_id', UserDataController.show_with_user_id);


export default UserDataRoutes;
