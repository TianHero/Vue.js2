const express = require('express')
const config = require('./config/index')

let port = process.env.PORT || config.build.port

const app = express();

const router = express.Router()