import { Router,Request,Response,NextFunction} from 'express';
import { TasksController } from '../controllers/tasks.controller';
import { authenticated } from '../middlewares/authenticated';
// New Router instance
const router = Router();
var taskcomponent = new TasksController()
// Users routes
router.get("/", authenticated,(req:Request, res:Response, next:NextFunction) => taskcomponent.getTasks(req, res, next));
router.post("/task", authenticated, (req:Request, res:Response, next:NextFunction) => taskcomponent.newtask(req, res, next));
router.get("/task", authenticated,(req:Request, res:Response, next:NextFunction) => taskcomponent.getTask(req, res, next));
router.delete("/task", authenticated,(req:Request, res:Response, next:NextFunction) => taskcomponent.deleteTask(req, res, next));
router.put("/task", authenticated,(req:Request, res:Response, next:NextFunction) => taskcomponent.updateTask(req, res, next));
// router.get('/:id', (req: Request, res: Response) => {
//   res.send(`User ${req.params.id} route!`);
// });

export default router;