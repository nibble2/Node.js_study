#!/usr/bin/env node
//console.log("Hello CLI", process.argv) ;

//process.argv는 사용자가 입력한 내용을 배열로 출력한다
//parcess.argv[0] : 노드 설치 경로
//process.argv[1] : 파일 위치 경로

const readline = require('readline') ;

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
}) ;

console.clear() ;

const answerCallback = (answer) => {
    if (answer === 'y') {
        console.log('신나는 node!!') ;
        rl.close() ;
    } else if (answer ==='n') {
        console.log('재미없는 node@! ~') ;
        rl.close() ;
    } else {
        console.clear() ;
        console.log('y 또는 n 만 입력하세요 ') ;
        rl.question('노드가 재밌습니까? (y/n)', answerCallback) ;
    }
} ;

rl.question('Node.js 재밌습니까 ? (y/n) : ', answerCallback) ;
