const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./configs/key");
const mongoose = require("mongoose");
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const camelCaseReq = require('./middlewares/camelCaseReq');
const omitReq = require('./middlewares/omitReq');
const snakeCaseRes = require('./middlewares/snakeCaseRes');
const errorHandler = require('./middlewares/errorHandler');


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(camelCaseReq);
app.use(omitReq);
app.use(snakeCaseRes());
app.use(errorHandler);

mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));



app.use(bodyParser.json({limit: '200mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true,  parameterLimit: 100000,
}));

app.use(cookieParser());
// app.use(session({
//   secret: "9d5067a5a36f2bd6f5e93008865536c7",
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
// }))
app.use('/api/users', require('./routes/users'));
app.use('/api/chatroom', require("./routes/chatroom"));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/message', require('./routes/message'));
app.use('/api/audio', require('./routes/audio'));
app.use('/api/getText', require('./routes/getText'));
app.use('/api/sso', require('./routes/merge'));
app.use('/api/wer', require('./routes/WER'));
app.use('/api/validate', require('./routes/validate'));
app.use('/api/transcript', require('./routes/transcript'));
app.use('/api/validate-room',require('./routes/validateRoom'));
// app.use('/api/topic',require('./routes/topic'));
// app.use('/api/domain',require('./routes/domain'));
require('./routes')(app);


const port = process.env.PORT || 4000

const server = app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});

const sockets = require('./socket')
sockets.init(server)


