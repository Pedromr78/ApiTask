import { Router} from 'express';
import { TasksController } from '../controllers/tasks.controller';
// New Router instance
const router = Router();
var taskcomponent = new TasksController()
// Users routes
router.get("/", (req, res, next) => taskcomponent.getTasks(req, res, next));
router.post("/task", (req, res, next) => taskcomponent.newtask(req, res, next));
router.get("/task", (req, res, next) => taskcomponent.getTask(req, res, next));
router.delete("/task", (req, res, next) => taskcomponent.deleteTask(req, res, next));
router.put("/task", (req, res, next) => taskcomponent.updateTask(req, res, next));
// router.get('/:id', (req: Request, res: Response) => {
//   res.send(`User ${req.params.id} route!`);
// });

export default router;