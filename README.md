# CristOLiens



Gitter Chat Forum TypeScript definitions
Circle CI Coverage Staus NPM version CDNJS

Onsen UI - Cross-Platform Hybrid App and PWA Framework
Onsen UI is an open source framework that makes it easy to create native-feeling Progressive Web Apps (PWAs) and hybrid apps.

The core library is written in pure Javascript (on top of Web Components) and is framework agnostic, which means you can use it with your favorite framework and its tools. We provide some extra binding packages to make it easy to use Onsen UI's API with many popular frameworks:


React	
Angular 2+

Vue

AngularJS 1.x
Some other frameworks are supported by community packages (not tested or implemented by the core team): Aurelia, EmberJS.

Both flat (iOS) and Material (Android) designs are included. The components are optionally auto-styled based on the platform, which makes it possible to support both iOS and Android with the same source code.

Getting started
We have several resources to help you get started creating hybrid apps and PWAs with Onsen UI:

The official docs: We provide guides and references for all of the components and bindings, as well as how to publish your app. These are our Getting Started guides:
Core guide (no framework)
Vue guide
React guide
Angular 2+ guide
AngularJS 1.x guide
jQuery guide
Creating an Onsen UI hybrid app using Cordova
Progressive Web Apps (PWAs) with Onsen UI
Components overview: a list of included CSS components in both flat and Material Design. Note that these components are just pure and performant CSS without JavaScript behavior. Some extra details (such as dragging or ripple effect) are added by Onsen UI custom elements.
Playground: an interactive Onsen UI tutorial where you can learn how to use Onsen UI and play around with the components.
Blog: there are lots of great tutorials and guides published in our official Onsen UI blog and we are adding new content regularly.
Support: if you are having trouble using some component the best place to get help is the Onsen UI Forum or the community-run Discord Chat. We are also available to answer short questions on Twitter at @Onsen_UI.
Get Onsen UI
Download the latest released version
We have a distribution repository with changelog. Onsen UI is also available in npm, bower and jspm. Example:

npm install onsenui
This downloads Onsen UI main library and AngularJS bindings. For the other bindings, you can install react-onsenui, vue-onsenui or ngx-onsenui.

Download or request from a CDN
You can also take the necessary files from a CDN. Some of the options are unpkg, jsDelivr and cdnjs.

Get the latest development build
Optionally, you can download the latest development build here. Be careful, usually everything there is already tested but it might be unstable sometimes.

Examples with source code
There are lots of sample applications written using Onsen UI. Here are some examples with source code and tutorials to give you an idea of what kind of apps you can create.

  

Onsen UI ecosystem
Because sometimes a UI framework may not be enough to make hybrid app development easy, Onsen UI comes with a complete ecosystem of well integrated tools. Meet Monaca.



Developed by the Onsen UI team, Monaca is a toolkit that makes hybrid mobile app development with PhoneGap / Cordova simple and easy: Onsen UI Cordova templates, debugging suite, push notifications, remote build, back-end solutions, encryption, version control, continuous integration and more. Furthermore, it provides multiple development environments with everything already configured and ready to go:

Cloud IDE - Command Line Interface - Localkit GUI

Example with CLI:

$ [sudo] npm -g install monaca
$ monaca create helloworld # And choose the starter template
$ monaca preview # Preview on the browser
$ monaca debug # Preview on a real device
$ monaca remote-build # Production build on the cloud
See the Onsen UI Getting Started Page for more information.

Browser Support
Onsen UI is tested to work with the following browsers and mobile OS.

Android 4.4.4+
iOS 9+
Chrome
Safari
Contribution
We welcome your contribution, no matter how big or small! Please have a look at the contribution guide for details about project structure, development environment, test suite, code style, etc. All the version updates are mentioned in the changelog.
