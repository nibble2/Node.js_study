#!/usr/bin/env node
const program = require('commander') ;
const fs = require('fs') ;
const path = require('path') ;
const inquirer = require('inquirer') ;
const chalk = require('chalk') ;

const htmlTemplate = `<DOCTYPE html>
<html>
<head>
    <meta chart="utf-8" />
    <title>Template</title>
</head>
<body>
    <h>Hello</h>
    <p>CLI</p>
</body>
</html>` ;

const routerTemplate = `const express = require('express') ;
const router = express.Router() ;

router.get('/', (req, res, next) => {
    try {
        res.send('ok') ;
    } catch (error) {
        console.error(error) ;
        next(error) ;
    }
}) ;

module.exports = router ; `;

const exist = (dir) => {
 try {
     fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK) ;
     return true ;
 } catch (e) { 
     return false ;
 }
} ;
const mkdirp = (dir) => { // 파일 경로를 만들어 줌
    const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep).filter(p => !!p) ; //상대 경로를 구해 만들어줄 폴더를 파악 , 배열의 undefine 찾아  삭제
    dirname.forEach((d, idx) => {
        const pathBuilder = dirname.slice(0, idx + 1).join(path.sep) ;
        if(!exist(pathBuilder)) {
            fs.mkdirSync(pathBuilder) ;
        }
    }) ;
} ;

const makeTemplate = (type, name, directory) => {
    mkdirp(directory) ; //폴더 경로를 생성 사용자가 맨위에 입력한 경로를 받음
    if(type === 'html') { //만약 html 템플릿을 만들고자 했으면
        const pathToFile = path.join(directory, `${name}.html`) ; //이 파일경로+파일명
        if(exist(pathToFile)) {
            console.error(chalk.bold.red('이미 해당 파일이 존재합니다!!')) ;
        } else {
            fs.writeFileSync(pathToFile, htmlTemplate) ; //한 번만 실행되는 경우에는 Sync 메서드를 써도 되지만, 여러 번 동시에 호출 될 것 같으면 x
            console.log(chalk.green(pathToFile, '생성 완료!!')) ;
        }
    } else if (type === 'express-router') { //만약 사용자가 라우터를 만들고 싶은 경우
        const pathToFile = path.join(directory, `${name}.js`) ;
        if (exist(pathFile)) {
            console.error(chalk.bold.red('이미 해당 파일이 존재합니다!!')) ;
        } else {
            fs.writeFileSync(pathToFile, routerTemplate) ;
            console.log(chalk.green(pathFile, '생성 완료!!')) ;
        }
    } else {
        console.error(chalk.bold.red('html 또는 express-router 둘 중 하나를 입력하세요~  ')) ;
    }
} ;

const copyFile = (name, directory) => {
    if(exist(name)) {
        mkdirp(directory) ;
        fs.copyFileSync(name, path.join(directory, name)) ;
        console.log(chalk.green(`${name} 파일이 복사되었습니다 `)) ;
    } else {
        console.error(chalk.bold.red('파일이 존재하지 않아요!')) ;
    }
} ;

let triggered = false ;  //밑에 action실행 되었으면 트리거들을 툴로 만들 것


program
 .version('0.0.1', '-v, --version' )
 .usage('[option]') ; 

program
 .command('template <type>')
 .usage('--name <name> --path [path]')
 .description('템플릿을 생성합니다.') 
 .alias('tmpl') //템플릿 명령어
 .option('-n, --name <name>', '파일명을 입력하세요 : ', 'index')
 .option('-d, --directory [path]', '생성 경로를 입력하세요 : ', '.')
 .action((type, options) => {
     makeTemplate(type, option.name, option.directory) ;
     trigger = true ; //action이 실행되었으면 inquiredrk vlfdydjqtek
 }) ;

program
 .command('copy <name> <directory>')
 .usage('<name> <directory>') 
 .description('파일을 복사합니다')
 .alias('cp')
 .action((name, directory) => {
    copyFile(name, directory) ;
    triggered = true ;
 }) ;

program 
 .command('*', { noHelp: true }) 
 .action(() => {
    console.log('해당 명령어를 찾을 수 없습니다!!') ;
    program.help() ;
    trigger = true ;
 }) ;

 program
    .parse(process.argv) ;

 if(!triggered) {
     inquirer.prompt([{
       type: 'list',
       name: 'type', 
       message: '템플릿 종류를 선택하세요' ,
        choices: ['html', 'express-router'],
     }, {
         type: 'input',
         name: 'name',
         message: '파일의 이름을 입력하세요.',
         default: 'index',
     }, {
         type: 'input',
         name: 'directory',
         message: '파일이 위치할 폴더의 경로를 입력하세요.',
         default: '.',
     }, {
         type: 'confirm',
         name: 'confirm',
         message: '생성하시겠습니까 ?',
     }])
     .then((answers) => { //질문에 대한 답들
         if(answers.confirm) {
             makeTemplate(answers.type, answers.name, answers.directory) ;
             console.log(chalk.rgb(128,128,128)('터미널을 종료합니다.')) ;
         }
     })
 } 
 //type: 프롬포트 종류
 //name: 질문명
 //message: 메세지
 //choices: 선택지
 //default: 기본값