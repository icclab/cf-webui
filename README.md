# CF WebUI

[CF WebUI](https://icclab.github.io/cf-webui) is a modern single-page web-frontend for Cloud Foundry based on AngularJS and Bootstrap.

[Cloud Foundry](http://cloudfoundry.org) is the OpenSource Platform as a Service (PaaS) Framework on which many PaaS offerings are based (e.g. Pivotal Web Services, HP Helion, IBM BlueMix, Swisscom Application Cloud, etc.). It allows the developers to provide, manage and scale their application in the cloud very easily and quickly. For end-users Cloud Foundry provides a REST based API and a command line interface (CLI) client. No official free and open source web front-end is currently available.

## Getting started

1. Clone the project: `git clone https://github.com/icclab/cf-webui`
2. Change directory to cf-webUI: `cd cf-webUI`
3. Change the `manifest.yml` to your desired endpoints and options. E.g.:  
~~~
---applications:  
	- name: cf-webui  
	memory: 128M  
	host: console-cf-webui-${random-word}  
    path: ./build
    env: 
      UAA_ENDPOINT: https://uaa.run.pivotal.io
      API_ENDPOINT: https://api.run.pivotal.io
~~~
4. Install npm packages: `npm install`
5. Build the application using Grunt: `grunt build`
6. Push this application to Cloud Foundry using the cf Command Line Interface (CLI): `cf push`.
7. Enjoy the CF WebUI!

## Disclaimer

The current version is an early release (alpha). It is not yet production-ready. Use it at your own risk. Some features are still to come and it may contain major bugs.

## Community & Support

Please report bugs and request features using [GitHub Issues](https://github.com/icclab/cf-webui/issues). For additional information, you can contact the maintainer directly.

Community discussions about CF-WebUI happen in the CF-WebUI-discuss mailing list. Once you [subscribe to the list](https://mailman.engineering.zhaw.ch/mailman/listinfo/icclab-cf-webui), you can send mail to the list address: icclab-cf-webui@dornbirn.zhaw.ch. The mailing list archives are also [available on the web](https://mailman.engineering.zhaw.ch/pipermail/icclab-cf-webui/).

Please follow the [ICCLab blog](http://blog.zhaw.ch/icclab/tag/cf-webui/) for updates.

## License

CF-WebUI is licensed under the Apache License version 2.0. See the [LICENSE](./LICENSE) file.

