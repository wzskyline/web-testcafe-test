/*

测试github 的登陆
测试更新 setting

*/


const opts = {
    errorEventName:'error',
        logDirectory:'./log', // NOTE: folder must exist and be writable...
        fileNamePattern:'roll-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );


import { Selector } from 'testcafe';

const user = {
    name :"wzskyline",
    password :"wzlove123", 
}

const data = {
    bio :"风景依旧在最美是情怀",
    url :"https://wzskyline.github.io/",
    company :"wzskyline",
}

fixture `Getting Started`
    .page `https://github.com/login`;

 
test('LOGIN OK', async t => {
   ////////////////////////////////////////
   // open page and login
   ////////////////////////////////////////     
    await t
        .typeText("input[name='login']", user.name)
		.typeText("input[name='password']",user.password)
        .click("input[name='commit']")
        .wait(5000)
        .expect(Selector('.avatar').exists).ok()   
        log.info('login success ', new Date().toJSON());


   ////////////////////////////////////////
   // click avatar and click Settings
   ////////////////////////////////////////     
   await t   
        .click(Selector('.Header').child(7))
        .wait(1000)
        .click(Selector('a').withText('Settings'))
        log.info('open profile success ', new Date().toJSON());


   ////////////////////////////////////////
   // input value and wait success
   ////////////////////////////////////////     
  await t
        .typeText("#user_profile_bio", data.bio)
        .wait(1000)
        .typeText("#user_profile_blog", data.url)
        .wait(1000)
        .typeText("#user_profile_company", data.company)
        .click(Selector('button').withText('Update profile'))
        .wait(10000)
        .expect(Selector('.octicon').exists).ok()  //if update success , here a svg on page head
        log.info('save profile success ', new Date().toJSON());
         
});