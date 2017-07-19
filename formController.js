function formController () {
	var Form = require('./mongodb.js');
	
	// Creating New Form
	this.createForm = function (req, res, next) {
		var place = req.params.place;
		var country = req.params.country;
		var state = req.params.state;
		var activity = req.params.activity;
		
		Form.create({place:place,country:country,state:state,activity:activity}, function(err, result) {
			if (err) {
				console.log(err);
				return res.send({'error':err});	
			}
			else {
        return res.send({'result':result,'status':'successfully saved'});
      }
		});
	};
 
  // Fetching Details of Student
  this.getForm = function (req, res, next) {
 
    Form.find({}, function(err, result) {
      if (err) {
        console.log(err);
        return res.send({'error':err}); 
      }
      else {
        return res.send({'Form Details':result});
      }
    });
  };
 
return this;
 
};
 
module.exports = new formController();