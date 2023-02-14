const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {sequelize} = require('./app/models')

const app = express();

const port = 33;

sequelize.sync({force:true}).then(()=>{
    console.log('데이터베이스 연결 성공');
}).catch((err)=>{
    console.error('sequelize 오류)'+err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/',function(req,res,next){
    //console.log(req.path);
    next();
});


app.use('/api/splatBannerMaker',require('./app/router/splat_banner_router'));


app.use(function (req, res, next) {
    res.status(404).send('Sorry can not find page!');
});

app.use(function (err, req, res, next) {
    //console.error(err.stack);
    res.status(500).send({ 'message': 'Some Error has occured!', 'error': err.message, 'stack': err.stack });
});


app.listen(port, () => {
    console.log('Server is listening on port', port);
})


//불안정 코드로 디버깅일때만 사용하기
process.on('uncaughtException', (err) => {
    console.log('UncaughtException Occured !');
    console.log(err.stack);
})