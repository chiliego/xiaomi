const miio = require('miio');
const stdin = process.openStdin();

miio.device({ address: '192.168.178.55', token: '6c6976646f5834795565514161383342' })
  .then(device =>{
	  console.log('Connected to', device)
	stdin.addListener("data", function(d) {
    		// note:  d is an object, and when converted to a string it will
    		// end with a linefeed.  so we (rather crudely) account for that  
    		// with toString() and then trim()

		device.activateZoneClean(JSON.parse(d))
  		      .then(console.log)
  		      .catch(console.error);
  		});
        })
  .catch(err => console.log(err));
