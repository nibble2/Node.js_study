#!/usr/bin/env node
const program = require('commander') ;
const inquirer = require('inquirer') ;

const { version } = require('./package') ;
const { sequelize, Wallet } = requre('./models') ;

program
 .version(version, '-v, --version')
 .usage('[option]') ;

 //수입
 program
  .command('revenue <money> <desc>')
  .description('수입을 기록합니다.')
  .action(async(money, desc) => {
    await sequelize.sync() ;
    await Wallet.create({
      money: parseInt(money,10),
    })
    await sequelize.close() ;
  }) ;

 //지출
program 
  .command('expense <money> <desc>')
  .description('지출을 기록합니다.')
  .action(async(money, desc) => {
    await sequelize.sync() ;
    await sequelize.close() ;
  }) ;

//잔액
program
 .command('balance')
 .description('잔액을 표시합니다.')  
 .action(async(money, desc) => {
  await sequelize.sync() ;
  await sequelize.close() ;
}) ;

 program
  .command('*')
  .action(() => {
      console.log('알 수 없는 명령어입니다.') 
  }) ;

 program.parse(process.argv) ;