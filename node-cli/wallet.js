#!/usr/bin/env node
const program = require('commander') ;
const inquirer = require('inquirer') ;

const { version } = require('./package') ;

program
 .version(version, '-v, --version')
 .usage('[option]') ;

 //수입
 program
  .command('revenue <money> <desc>')
  .description('수입을 기록합니다.')
  .action(() => {

  }) ;

 //지출
program 
  .command('expense <money> <desc>')
  .description('지출을 기록합니다.')
  .action(() => {

  }) ;

//잔액
program
 .command('balance')
 .description('잔액을 표시합니다.')  
 .action(() => {

 }) ;

 program
  .command('*')
  .action(() => {
      console.log('알 수 없는 명령어입니다.') 
  }) ;

 program.parse(process.argv) ;