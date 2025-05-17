const express=require('express');

const bodyParser=require('body-parser');
const{PORT}=require('./config/serverConfig');

const{createChannel, subscribeMessage}=require('./utils/messageQueue');
const{REMINDER_BINDING_KEY}=require('./config/serverConfig');

const {sendBasicEmail}=require('./services/email-service');
const jobs=require('./utils/job');
const TicketController=require('./controllers/ticket-controller');

const EmailService=require('./services/email-service'); 

const startAndSetUpServer=async()=>{

    const app=express();
    
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true}));

    const channel=await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);
    
    app.post('/api/v1/tickets',TicketController.create);
    app.listen(PORT,()=>{
        console.log(`Server started at Port ${PORT}`);
        //jobs();

        // sendBasicEmail(
        //     'support@admin.com',
        //     'lakshaybansal1905@gmail.com',
        //     'This is testing email',
        //     'Hey!how are you? I hope you like the support'
        // );
    });
}
startAndSetUpServer();