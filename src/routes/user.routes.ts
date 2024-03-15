import { Router} from 'express';
import { UserController } from '../controllers/user.controller';
// New Router instance
const router = Router();
var usercomponent = new UserController()
// Users routes

router.post("/register", (req, res, next) => usercomponent.save(req, res, next));
router.post("/login", (req, res, next) => usercomponent.login(req, res, next));
// router.get('/:id', (req: Request, res: Response) => {
//   res.send(`User ${req.params.id} route!`);
// });

export default router;