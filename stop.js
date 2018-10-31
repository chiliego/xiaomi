const miio = require('miio');

miio.device({ address: '192.168.178.55', token: '6c6976646f5834795565514161383342' })
  .then(device =>{
	  console.log('Connected to', device)
	 device.call('app_stop', [])
  		.then(console.log)
  		.catch(console.error);
	 //device.destroy();
        })
  .catch(err => console.log(err));
