

var application_root = __dirname,
express = require("express"),
path = require("path"),
ejs = require("ejs");
var port = process.env.PORT || 4242;
var app = express();
var request = require("request");
var main = require("./model/happeningMain");

app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({secret:"This is secret"}));
	app.use(app.router);
	app.use(express.static(path.join(application_root, "public")));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/home', function (req, res) {
	main.getHomePage(req,res);
});
	
app.get('/developers', function (req, res) {
	main.getDevelopersPage(req,res);
});

app.get('/poweredBy', function (req, res) {
	main.getPoweredByPage(req,res);
});

app.get('/happening', function (req, res) {
	main.getHappeningPage(req,res);
});


app.post('/happeningList', function (req, res) {
	main.listHappeningPlaces(req,res);
});

app.get('/showBusinessDetailPage/:id', function (req, res) {
	main.showBusinessDetailPage(req,res);
});

app.post('/showGraphicalAnalytics', function (req, res) {
	main.showGraphicalAnalytics(req,res);
});

app.post('/displayReviews', function (req, res) {
	main.displayReviews(req,res);
});

app.post('/chart/:c/:p', function (req, res) {
	//console.log(req.params.c);
	//console.log(req.params.p);
	main.getChartPage(req,res);
});
app.get('/chart', function (req, res) {
	main.getChartPage(req,res);
});

app.post('/chartDoughnut/:c/:p', function (req, res) {
	//console.log(req.params.c);
	//console.log(req.params.p);
	main.getChartDoughnut(req,res);
});

app.listen(port);
console.log('Listening to port '+port);

