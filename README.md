# CF WebUI

Single-page-application for Cloud Foundry created with AngularJS and Bootstrap.

## Installation

1. Clone the project: `git clone https://github.com/icclab/cf-webui`
2. Change directory to cf-webUI: `cd cf-webUI`
3. Change the endpoints to your desired Cloud Foundry instance in `/app/app.constant.js`.
4. Change the `manifest.yml` to your desired options. E.g.:  
~~~
---applications:  
	- name: cf-webui  
	memory: 128M  
	host: console  
	domain: cfapps.io
	random-route: true  
~~~
5. Push this application to Cloud Foundry with cf Command Line Interface (CLI): `cf push`.
6. Enjoy the CF WebUI!