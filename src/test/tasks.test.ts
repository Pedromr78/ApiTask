import {app} from '../app';
import request from 'supertest';


describe('GET /tasks', () =>{
    test('El endpoint deberia contener status 200, tipo json y el parametro tasks', async ()=>{
    
       var response = request(app).get('/tasks').send({email : 'peropela333@gmail.com', userID : 1 });
      expect((await response).status).toBe(200);
      expect((await response).header['content-type']).toEqual(
        expect.stringContaining("json")
      )
      expect((await response).body.tasks).toBeDefined();
   
    })
 

})

describe('/tasks/task', () =>{
    describe('GET /tasks/task', () =>{
        test('El endpoint deberia contener status 200, tipo json y el parametro task', async ()=>{
    
            var response = request(app).get('/tasks/task').send({email : 'peropela333@gmail.com', userID : 1, id: 1 });
           expect((await response).status).toBe(200);
           expect((await response).header['content-type']).toEqual(
             expect.stringContaining("json")
           )
           expect((await response).body.task).toBeDefined();
        
         })
    })
    describe('PUT /tasks/task', () =>{
        test('El endpoint deberia contener status 200, tipo json y el parametro oldtask', async ()=>{
    
            var response = request(app).put('/tasks/task').send({email : 'peropela333@gmail.com', userID : 1,id: 1, name : "Tarea 1", date:"12-05-2000", description:"Esta es mi segunda tarea"});
           
           expect((await response).status).toBe(200);
           expect((await response).header['content-type']).toEqual(
             expect.stringContaining("json")
           )
           expect((await response).body.oldtask).toBeDefined();
        
         })
    })
    describe('POST /tasks/task', () =>{
        test('El endpoint deberia contener status 200, tipo json y el parametro task', async ()=>{
    
            var response = request(app).post('/tasks/task').send({email : 'peropela333@gmail.com', userID : "1", name : "Tarea desde test", date:"12-05-2000", description:"Esta es mi segunda tarea", status: "succes"});
          
           expect((await response).status).toBe(200);
           expect((await response).header['content-type']).toEqual(
             expect.stringContaining("json")
           )
           expect((await response).body.task).toBeDefined();
        
         })
    })
    describe('DELETE /tasks/task', () =>{
        test('El endpoint deberia contener status 200, tipo json y el parametro task', async ()=>{
    
            var response = request(app).delete('/tasks/task').send({email : 'peropela333@gmail.com', userID : "1",id: "7"});
           expect((await response).status).toBe(200);
           expect((await response).header['content-type']).toEqual(
             expect.stringContaining("json")
           )
           expect((await response).body.message).toBeDefined();
        
         })
    })
})

