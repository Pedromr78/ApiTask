import {app} from '../app';
import request from 'supertest';






describe('GET /tasks', () =>{
  var idtask:any;
  var tocken:any;

  test('El endpoint deberia contener status 200, tipo json y el parametro tasks', async ()=>{
    var response = request(app).post('/users/login')
    .send({ email : "peropela333@gmail.com", password : "P@ssw0rd", gettoken : "true"})
    expect((await response).status).toBe(200);
    expect((await response).header['content-type']).toEqual(
      expect.stringContaining("json")
    )
    expect((await response).body.tocken).toBeDefined();
    tocken=(await response).body.tocken;
  })

 
    test('El endpoint deberia contener status 200, tipo json y el parametro tasks', async ()=>{
    
       var response = request(app).get('/tasks')
       .set('Authorization', tocken)
      expect((await response).status).toBe(200);
      expect((await response).header['content-type']).toEqual(
        expect.stringContaining("json")
      )
      expect((await response).body.tasks).toBeDefined();
        idtask= (await response).body.tasks[0].ID
 
    })
 



describe('/tasks/task', () =>{
    describe('GET /tasks/task', () =>{
        test('El endpoint deberia contener status 200, tipo json y el parametro task', async ()=>{
    
            var response = request(app).get('/tasks/task/'+idtask)
            .set('Authorization', tocken)
           expect((await response).status).toBe(200);
           expect((await response).header['content-type']).toEqual(
             expect.stringContaining("json")
           )
           expect((await response).body.task).toBeDefined();
        
         })
    })

    describe('POST /tasks/task', () =>{
        test('El endpoint deberia contener status 200, tipo json y el parametro task', async ()=>{
    
            var response = request(app).post('/tasks/task')
            .set('Authorization', tocken)
            .send({ name : "Tarea desde test", date:"12-05-2000", description:"Esta es mi segunda tarea", status: "succes"});
          
           expect((await response).status).toBe(200);
           expect((await response).header['content-type']).toEqual(
             expect.stringContaining("json")
           )
           expect((await response).body.task).toBeDefined();
        
         })
    })
    describe('PUT /tasks/task', () =>{
      test('El endpoint deberia contener status 200, tipo json y el parametro oldtask', async ()=>{
  
          var response = request(app).put('/tasks/task/'+idtask)
          .set('Authorization', tocken)
          .send({ name : "Tarea 1", date:"12-05-2000", description:"Esta es mi segunda tarea",   status: ""});
         
         expect((await response).status).toBe(200);
         expect((await response).header['content-type']).toEqual(
           expect.stringContaining("json")
         )
         expect((await response).body.oldtask).toBeDefined();
      
       })
  })
    describe('DELETE /tasks/task', () =>{
        test('El endpoint deberia contener status 200, tipo json y el parametro task', async ()=>{
    
            var response = request(app).delete('/tasks/task/'+idtask)
            .set('Authorization', tocken)
           expect((await response).status).toBe(200);
           expect((await response).header['content-type']).toEqual(
             expect.stringContaining("json")
           )
           expect((await response).body.message).toBeDefined();
        
         })
    })
})

})