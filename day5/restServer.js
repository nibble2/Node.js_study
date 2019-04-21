const http = require('http') ;
const fs = require('fs') ;

const users = {} ;

http.createServer((req, res) => {
if (req.method === 'GET') {
    if (req.url === '/'){
        return fs.readFile('./restFront.html', (err,data) => {
            if (err) {
                throw err ;
            }
            res.end(data) ;
        }) ;
    } else if (req.url === 'users'){
        return res.end(JSON.stringify(users)) ; //객체를 JSON문자열로 변환
    } 
    return fs.readFile(`.${req.url}`, (err,data) => { //'/'도 아니고 USERS가 아니면, 요청한 URL과 이름이 똑같은 정적파일을 RETURN
        res.end(data) ; //버퍼로 보내줌
    }) ;
} else if (req.method === 'POST'){ //본문을 받을 때 두개의 listener사용
    if (req.url === '/'){

    } else if (req.url === '/users'){
        let body = ''; //CHUNK를 모으기 위해 사용
        req.on('data', (chunk) => { //스트림은 데이터가 크기때문에 조각내서 받는다 그 조각을 data, chunk
            body +=chunk ; //프론트엔드로부터 요청이 들어오면 요청의 본문을 스트림으로 읽어 조각조각낸 청크를 바디라는 곳에 모아줌
        }) ;
        return req.on('end', () => {
            console.log('POST 본문(body) :', body) ;
            const { name } = JSON.parse(body) ; //front.js 에서 받은 name
            const id = +new Date() ;//사용자에게 고유한 키 부여
            users[id] = name ;
            res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'}) ;
            res.end('사용자 등록 성공') ;
        }) ;
    }
} else if (req.method === 'PATCH'){
    if (req.url === '/'){

    } else if (req.url === 'users'){
        
    }
} else if (req.method === 'PUT'){
    if (req.url === '/'){

        } else if (req.url.startsWith('/users/')) {
            const id = req.url.split('/') [2] ; //id를 주소에서 꺼낸다.
            let body ='' ;
            req.on('data', (chunk) => {
                body += chunk ;
            }) ;
            return req.on('end', () => {
                console.log('put', body) ;
                users[id] = JSON.parse(body).name ;
                return res.end(JSON.stringify(users)) ; //수정 완료되면 프론트로 return
            }) ;
        }
} else if (req.method === 'DELETE'){
    if (req.url === '/'){

    } else if (req.url === 'users'){
        const id = req.url.split('/')[2] ;
        let body = '' ;
        req.on('data', (chunk) => {
            body += chunk ;
        }) ;
        return req.on('end', () => {
            console.log('delete', body) ;
            delete users[id] ;
            return res.end(JSON.stringify(users)) ;
        })
    }
}
}).listen(8080, () => {
    console.log('서버 대기즁~') ;
})