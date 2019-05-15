#!/usr/bin/env node
const fs = require('fs') ;
const path = require('path') ;

const type = process.argv[2] ;
const name = process.argv[3] ;
const directory = process.argv[4] || '.' ;

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
const router = expressRouter() ;

router.get('/', (req, res, nexxt) => {
    try {
        res.send('ok') ;
    } catch (error) {
        console.log(error) ;
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
    const dirname = path.relative('.', path.normalize(dir)).split(path.sep).filter(p => !!p) ; //상대 경로를 구해 만들어줄 폴더를 파악 , 배열의 undefine 찾아  삭제
    dirname.forEach((d, idx) => {
        const pathBuilder = dirname.slice(0, idx + 1).join(path.sep) ;
        if(!exist(pathBuilder)) {
            fs.mkdirSync(pathBuilder) ;
        }
    }) ;
} ;

const makeTemplate = () => {
    mkdirp(directory) ; //폴더 경로를 생성 사용자가 맨위에 입력한 경로를 받음
    if(type == 'html') { //만약 html 템플릿을 만들고자 했으면
        const pathToFile = path.join(directory, `${name}.html`) ; //이 파일경로+파일명
        if(exist(pathToFile)) {
            console.error('이미 해당 파일이 존재합니다') ;
        } else {
            fs.writeFileSync(pathToFile, htmlTemplate) ; //한 번만 실행되는 경우에는 Sync 메서드를 써도 되지만, 여러 번 동시에 호출 될 것 같으면 x
            console.log(pathToFile, '생성 완료') ;
        }
    } else if (type == 'express-router') { //만약 사용자가 라우터를 만들고 싶은 경우
        const pathToFile = path.join(directory, `${name}.js`) ;
        if (exist(pathFile)) {
            console.error('이미 해당 파일이 존재합니다') ;
        } else {
            fs.writeFileSync(pathToFile, routerTemplate) ;
            console.log(pathFile, '생성 완료') ;
        }
    } else {
        console.error('html 또는 express-router 둘 중 하나를 입력하세요') ;
    }
} ;

const program = () => {
    if (!type || !name) {
        console.error('사용방법 cli html|express-router 파일명 [생성 경로]') ;
    } else {
        makeTemplate() ; //template 만드는 코드
    }
};

program() ;