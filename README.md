App42PaaS-Node-Redis-Sample
===========================

Sample Node App with Redis for App42 PaaS Platform


## Getting Start with App42

1. Setup infrastructure for required environment
2. Create service
3. Deploy a Node application

### Setup infrastructure for required environment

    $ app42 setupInfra   
    
### Create service

    $ app42 createService
    
DB Configure(application_root_dir/app.js) 

    client = redis.createClient(<VM PORT>,"VM IP",{no_ready_check: true});

    client.auth("<PASSWORD>", function() {
      console.log('Redis client connected');
    });
    
### Deploy a Node application

    $ app42 deploy

#### Get application details:

    $ app42 appInfo --app AppName    
    
Visit your application:


