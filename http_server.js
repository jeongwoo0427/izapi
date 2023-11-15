const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {sequelize} = require('./models')

const app = express();

const port = 33;

sequelize.sync({force:false}).then(()=>{
    console.log('DB Connected!');
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


app.use('/api/common',require('./router/common/index'));
app.use('/api/splatBannerMaker',require('./router/splat_banner/index'));


app.use(function (req, res, next) {
    res.status(404).send('Sorry can not find page!');
});

app.use(function (err, req, res, next) {
    //console.error(err.stack);
    res.status(500).send({ 'message': 'Some Error has occured!', 'error': err.message, 'stack': err.stack });
});


app.listen(port, () => {
    console.log('HTTP Server is listening on port', port);
})