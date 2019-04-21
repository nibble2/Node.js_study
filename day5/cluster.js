//만약 코어가 여러개인 cpu에서 싱글스레드를 사용하면 많은 손해가 발생한다.
//그런 경우 clustering을 사용한다 : 노는 코어들을 전부다 사용하게끔 => 멀티

//cluster에는 master(관리자) 프로세스 worker(일꾼)프로세스가 있다.
const cluster = require('cluster') ;
const os = require('os') ;
const http = require('http') ;
const numCPUs = os.cpus().length ;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPU 개수만큼 워커를 생산
    for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        cluster.fork();
      });
} else { //워커들은 실제 서버에 리스닝
    http.createServer((req, res) => {
        res.end('http server') ;
    }).listen(8080) ;
    console.log(process.pid, '워커 실행') ;
}