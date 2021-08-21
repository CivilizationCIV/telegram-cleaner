/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/************************************TELEGRAM BOT FOR CIVILIZATION V0.1*******************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
const { Telegraf } = require("telegraf");
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')
 
const botlink = new Telegraf(process.env.BOTLINK_TOKEN);
const botingresso = new Telegraf(process.env.BOTINGRESSO_TOKEN);
const chatingresso_id = process.env.CHATINGRESSO_ID;
const chatlink_id = process.env.CHATLINK_ID;

/*************************************VARIABILI IMPOSTABILI****************************************************/
const timeExpireLink = 30; //secondi destinati all'expire del link
const timedeletes = 30; //secondi di attesa prima di cancellare il messaggio
var memberlimit = 99999; //limite massimo di membri nella chat per accettare nuove entrate

/*******************************************VARIABILI**********************************************************/
const secondsSinceEpoch = Math.round(Date.now() / 1000);
const chat = process.env.CHAT_ID
var epoch = 0;
var linkok
var data2
var messageId
var messageId2
var countkick = 0
var sec = secondsSinceEpoch;
var y = timeExpireLink;
var timedeletems = timedeletes * 1000;

/********************************************************BOT************************************************************/
//Accetta gli utenti nel primo gruppo e pone il link per il secondo
botlink.start(ctx => {})
botingresso.start(ctx =>{})

botingresso.on('new_chat_member', (ctx) => {
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  var sec = secondsSinceEpoch;
  epoch = sec;
  var y = timeExpireLink;
  var result = epoch + y;
  botlink.telegram.createChatInviteLink(chatlink_id, { expire_date: result }, { members_limit: memberlimit }).then((data) => {
  const stringjson = JSON.stringify(data);
  const obj = JSON.parse(stringjson);
  const menuTemplate = new MenuTemplate(ctx => `Hello ${ctx.from.first_name}, you have 30 seconds to press the button below and join our group. Welcome!`)
  const menuMiddleware = new MenuMiddleware('/', menuTemplate)
  menuMiddleware.replyToContext(ctx)
  menuTemplate.url('Join Group!', obj.invite_link)

  function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
    }
  async function delayKick() {
                            
                            
             countkick = countkick +1;
             await sleep(timedeletems);
             messageId = ctx.message.message_id
             messageId2 = ctx.message.message_id + 1
             ctx.deleteMessage(messageId2)
             ctx.deleteMessage()
             ctx.kickChatMember(ctx.from.id, ctx.chat.id)  
             await sleep(5000)
             ctx.unbanChatMember(ctx.from.id, ctx.chat.id)
    return 0
    }
  delayKick(); 
  })
  
  return false
  
  })
/*botingresso.command('/test', (ctx) => {
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  var sec = secondsSinceEpoch;
  epoch = sec;
  var y = timeExpireLink;
  var result = epoch + y;
  botlink.telegram.createChatInviteLink(chatlink_id, { expire_date: result }, { members_limit: memberlimit }).then((data) => {
  const stringjson = JSON.stringify(data);
  const obj = JSON.parse(stringjson);
  const menuTemplate = new MenuTemplate(ctx => `Hello ${ctx.from.first_name}, you have 30 seconds to press the button below and join our group. Welcome!`)
  const menuMiddleware = new MenuMiddleware('/', menuTemplate)
  menuMiddleware.replyToContext(ctx)
  menuTemplate.url('Join Group!', obj.invite_link)
  console.log(obj.invite_link)
  function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
    }
  async function delayKick() {
                            
                            
             countkick = countkick +1;
             await sleep(timedeletems);
             messageId = ctx.message.message_id
             messageId2 = ctx.message.message_id + 1
             ctx.deleteMessage(messageId2)
             ctx.deleteMessage()
             ctx.kickChatMember(ctx.from.id, ctx.chat.id)  
             await sleep(5000)
             ctx.unbanChatMember(ctx.from.id, ctx.chat.id)
    return 0
    }
  delayKick(); 
  })
  
  return false
  
  })*/
             botingresso.command('settled', (ctx) => {ctx.telegram.sendMessage(ctx.chat.id, 'Bot settled: ' + countkick )})
             botingresso.command('systemstate', (ctx) => {ctx.telegram.sendMessage(ctx.chat.id, 'Online')})
             botlink.command('systemstate', (ctx) => {ctx.telegram.sendMessage(ctx.chat.id, 'Online')})
//****************************************************ONLY FOR TEST PURPOSE*****************************************************//
              /*botlink.command('test', (ctx) => {
               
              const secondsSinceEpoch = Math.round(Date.now() / 1000);
              var sec = secondsSinceEpoch;
              epoch = sec;
              var y = timeExpireLink; 
              var result = epoch + y;
              botlink.telegram.createChatInviteLink(chatlink_id, { expire_date: result }, { members_limit: memberlimit }).then((data) => {
              const stringjson = JSON.stringify(data);
              const obj = JSON.parse(stringjson);
              ctx.telegram.sendMessage(ctx.chat.id, obj.invite_link) 
             })})*/

//***************************************************************************************************************
  botlink.launch() 
  botingresso.launch()
//***************************************************************************************************************