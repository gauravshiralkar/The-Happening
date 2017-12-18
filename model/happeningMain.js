var ejs = require("ejs");
var yelp = require('./index').createClient({
	  consumer_key: '-kwjSmzwcifwF_JubdPi1A',
	  consumer_secret: '8-MDfCerhnB25mbf42ubnnEe3Nk',
	  token: 'R2gML41fl2o_AnXIhftKiIUMiopUVEzh',
	  token_secret: 'En1-vxsT0zNKyJWwFyXuUVvxJE8',
	  ssl: true
	});

function getHappeningPage(req,res){
	ejs.renderFile('./views/happeningSearch.ejs',
			function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function getHomePage(req,res){
	ejs.renderFile('./views/home.ejs',
			function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function getDevelopersPage(req,res){
	ejs.renderFile('./views/developers.ejs',
			function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function getPoweredByPage(req,res){
	ejs.renderFile('./views/poweredBy.ejs',
			function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function listHappeningPlaces(req, res){

	console.log(req.param('categories'));
	console.log(req.param('place'));
	if(!req.body.hasOwnProperty('categories') ||!req.body.hasOwnProperty('place')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}

	yelp.search({term: req.param('categories'), location: req.param('place'), sort:"2"}, function(err, data) {
		  //console.log(err);
		  //console.log(data);
		  if(err){
			  return res.send('No records found for the given Place');
			}else{
				ejs.renderFile('./views/categoryWiseHappeningList.ejs',
						{happeningData:data.businesses, categories:req.param('categories'), place:req.param('place')},
						function(err, result) {
							if (!err) {
								res.end(result);
							}
							else {
								res.send('An error occurred');
								console.log(err);
							}
						});
			}
		  
		});
}

function showBusinessDetailPage(req,res){
	console.log('Inside show Business Detail Page');
	
	
	var bizId = req.params.id;
	//console.log(bizId);
	
	yelp.business(req.params.id, function(err, data) {
		//console.log(err);
		//console.log(data);
		if(err){
			throw err;
		}else{
			ejs.renderFile('./views/businessDetailPage.ejs',
					{businessData:data},
					function(err, result) {
						if (!err) {
							res.end(result);
						}
						else {
							res.send('An error occurred');
							console.log(err);
						}
					});
		}

	});
}


function showGraphicalAnalytics(req,res){
	console.log('Inside show Graphical Analytics');
}


function displayReviews(req,res){
	console.log('Inside display Reviews');
}


function getChartPage(req,res){
	yelp.search({term: req.params.c, location: req.params.p, sort:"2"}, function(err, data) {
		var dta="";
		var lbl="";
		var rt="";
	if(err){
				throw err;
			}else{
						
				ejs.renderFile('./views/chartPage.ejs',
						{happeningData:data.businesses, lbl:lbl, dta:dta, rt: rt},
						function(err, result) {
							if (!err) {
								res.end(result);
							}
							else {
								res.send('An error occurred');
								console.log(err);
							}
						});
			}
		  
		});
}

function getChartDoughnut(req,res){
	yelp.search({term: req.params.c, location: req.params.p, sort:"2"}, function(err, data) {
		var dta="";
		var lbl="";
		var rt="";
	if(err){
				throw err;
			}else{
						
				ejs.renderFile('./views/chartReview.ejs',
						{happeningData:data.businesses, lbl:lbl, dta:dta, rt: rt},
						function(err, result) {
							if (!err) {
								res.end(result);
							}
							else {
								res.send('An error occurred');
								console.log(err);
							}
						});
			}
		  
		});
}

exports.getHappeningPage = getHappeningPage;
exports.listHappeningPlaces = listHappeningPlaces;
exports.showBusinessDetailPage = showBusinessDetailPage;
exports.showGraphicalAnalytics = showGraphicalAnalytics;
exports.displayReviews = displayReviews;
exports.getHomePage = getHomePage;
exports.getDevelopersPage = getDevelopersPage;
exports.getPoweredByPage = getPoweredByPage;
exports.getChartPage = getChartPage;
exports.getChartDoughnut = getChartDoughnut;