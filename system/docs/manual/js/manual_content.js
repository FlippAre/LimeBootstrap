var manualcontent = [{"name":"About","index":1,"md":"The LIME-bootstrap is made to make it easier, better and faster working with Actionpads in LIME pro. The framework relies heavily on Knockout.js and Twitter Bootstrap but with custom styling and a simple, yet powerful script called lbs.js. The framework contains several built in functions and third \r\nparty libraries, but is also expandable through custom apps. \r\n\r\n\r\nLIME-bootstrap is only meant to be used inside LIME Pro, but for debugging reasons all functionality (except the data connections) should work in any browser. In LIME Pro the supporter browser versions are:\r\n\r\n*\tInternet Explorer 9\r\n*\tInternet Explorer 10\r\n*\tInternet Explorer 11\r\n\r\nOlder versions of IE _may_ work, but the ActionPads will surely not look so great. \r\n"},{"name":"Must Read","index":2,"md":"The framework is \"convention over configuration\", meaning there should be one and only one way to do things. If you find yourself writing lots of code to do something, or god forbid, needing to modify ANY file in the systems folder, you\u0027re propably doing it wrong. Take a deep breath and ask for assistance.\r\n\r\nIf you want to use the framework I solemnly swear to the following conditions:\r\n\r\n1. The systems folder should never, ever be modified. I can achieve cool and smart functions without ever touching it. \r\n2. lbs.html should neither be modified, exept from toggeling debug on and off  \r\n3. I must unlearn what you have learned! The framework offers a completely different methology of working with ActionPads, I will embrase it. \r\n4. I won\u0027t ever copy and paste code from old actionpads. A rabbit will die if I even think of coping VBScript...\r\n5. I wan\u0027t to contribute to a better framework, any improvements, errors or bugfixes will be commited to this git repository. \r\n6. I will follow the design guidlines:\r\n\t1. The design should be flat, free from gradients and focused on content.\r\n\t2. The actionpad is very narrow (~250px), use the height and not the width of the actionpad.\r\n\t3. Font should be dark blue on the deafult blue background. In any other case, white should be used. It white cannot be used, use a darker variant of the background color i.e dark green on green background\r\n\t4. Font awesome is used for all icons exept for the header icons, here we use Icon Experience\u0027s new M-icon set.\r\n\t5. Stick to default colors, don\u0027t \"brand\" the solution with customers logo and colors.\r\n7. I will use `lbs.common.executeVBA()` to run any LIME function and `lbs.limeDataConnection` to access any LIME object when building apps\r\n8. I won\u0027t include any scripts and styles in my views.  "},{"name":"Upgrade","index":3,"md":"# Upgrade instructions\r\nThese are  the changes that you will have to do to upgrade to a specifik version\r\n\r\n### 0.4\r\n*\tSkins are now supported! Actionpads must be reloaded to apply the skin change.\r\n\r\n### 0.3\r\n*\tUpdated to font awesome 4.0. All icon bindings must be changed to handel the new \"fa-\" naming convention\r\n*\tUpdated to Twitter Bootstrap 3.0\r\n*\t.nav-header should be change to .menu-header\r\n*\t.menu property \"hidden\" should be changed to \"collapsed\"\r\n\r\n### 0.2\r\n*\tReplace header tag `\u003cdiv class=\"header-fa-container helpdesk\"\u003e` with `\u003cdiv class=\"header-icon\"\u003e\u003c/div\u003e`. The image to show will sort itself out.\r\n*\tPlace any images you may need in the root folder \"resources\" or a subdirectory of it\r\n*\tInvoke old-school apps with the binding \"appInvoke\"\r\n*\tRemove div with id #header-info and add class .info-links to the list of info links in the header\r\n*\tRemove div with id #content-container\r\n"},{"name":"Basic Usage","index":4,"md":"###How does it work?\r\nThe new actionpads are inspired of how a single page applcation work. Views (basically html-templates) and data(usually JSON) are loaded via AJAX (an asyncrounous javacript call) by the the web application. The template is then rendered by applying the data and the result is shown to the user.\r\n\r\nIn LIME-bootstraps case lbs.html is the main application and all actionpads are pointed to lbs.html. lbs.html contians all included css, js amd meta tags. The actionpads (for example company.html) are now just views, containing no includes or javacript.\r\nlbs.html will detemine which view to load either by a supplied query string (the thing after the questionmark), `../lbs.html?ap=company` or if nothing is supplied, by trying to load a view with the same name as the class of the LIME inspector.\r\n\r\nThe active inspectors record is then loaded as data and converted to JSON.    \r\n\r\n###The console\r\nThe framework has been blessed with a virtual console, to use for debugging. It is activated through changing `debug=\"true\"` in lbs.html. The console will automagically appeare if an error is logged. You can easily use the console when building apps, read more abot this in the app readme.\r\n\r\n##HTML Elements\r\nLIME bootstrap supports all Twitter bootstrap elements but has also a few special elements. Please see the [Twitter bootstrap](http://getbootstrap.com/components/) documentation for additional info\r\n\r\n### Structure of an actionpad view\r\nAn Actionpad built with LIME-bootstrap has the following structure:\r\n\r\n```html\r\n    \u003c!-- Header section, The colorfull thing at the top  --\u003e\r\n        \u003cdiv class=\"header-container red\"\u003e \u003c!-- Specify the color of the header. Please see color section for available colors  --\u003e\r\n            \u003cdiv class=\"header-fa-container helpdesk\"\u003e \u003c!-- Specify the icon of the header. Please see icon section for available special icons  --\u003e\r\n  \r\n            \u003c/div\u003e\r\n            \u003cdiv id=\"header-info\"\u003e \r\n                \u003ch2 data-bind=\"text: helpdesk.helpdeskno.text\"\u003e\u003c/h2\u003e\r\n\t\t\t\t\t\u003cul\u003e\r\n\t\t\t\t\t\t\u003cli data-bind=\"text:helpdesk.person.text, limeLink:helpdesk.person, icon=\u0027fa-user\u0027\"\u003e\u003c/li\u003e\t\t\t\t\t\t\r\n  \t\t\t\t\t  \t...\r\n                    \u003c/ul\u003e \r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\t\t\r\n\t\t\r\n    \u003c!-- /Header section  --\u003e\r\n    \u003c!-- Body section  --\u003e\r\n    \u003cdiv class=\"content-container\"\u003e\r\n      \t\t\r\n\t\t\t\u003c!-- Menus and apps goes here!  --\u003e\r\n\t\t \r\n    \u003c/div\u003e\r\n\t\u003c!-- /Body section  --\u003e\r\n\r\n```\r\n\r\n\r\n###The header section colors\r\nThe header section is the colorful header of each actionpad. The following colors are provided:\r\n\r\n*\tred\r\n*\tgreen\r\n*\tblue\r\n*\tyellow\r\n*\torange\r\n*\tdarkgrey\r\n*\twhite\r\n*\tpurple\r\n\r\nUsage: \r\n\r\n```html\r\n\u003cdiv class=\"header-container [insert color here]\"\u003e\r\n```\r\n###The menu\r\n\r\nA menu can be created by the following HTML: \r\n\r\n```html\r\n \u003cul class=\"menu\"\u003e\r\n        \u003cli class=\"nav-header\"data-bind=\" text:localize.Actionpad_Business.command\"\u003e\u003c/li\u003e \r\n        \u003cli class=\"divider\"\u003e\u003c/li\u003e\r\n\t...\r\n\u003c/ul\u003e\r\n```\r\n\r\nA menu has two properties, __Expandable__ and __Hidden__. The are added in the `\u003cul\u003e`  class:\r\n`\u003cul class=\"menu expandable hidden\"\u003e`\t\r\n\r\n__Expandable:__ The menu can be collapsed by clicking the header   \r\n__Collapsed:__ The menu is collapsed when the actionpad is loaded. Stupid to use without using Expandable...\r\n\r\n###Dropdown button\r\n\r\nA dropdown button can contain many options, while taking up very little space. \r\n\r\n```html\r\n \u003cdiv class=\"btn-group\"\u003e\r\n    \t\u003ca class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" data-bind=\" text:localize.Actionpad_Todo.headermoveforward, icon: \u0027fa-caret-down\u0027\"\u003e\u003c/a\u003e\r\n    \t\u003cul class=\"dropdown-menu\"\u003e\r\n    \t\t\u003cli data-bind=\"vba:\u0027ActionPad_todo.Postpone, d, 1\u0027, text:localize.Actionpad_Todo.mf1d\"\u003e\u003c/li\u003e\r\n    \t    \u003cli class=\"divider\"\u003e\u003c/li\u003e\r\n            \u003cli data-bind=\"vba:\u0027ActionPad_todo.Postpone, ww, 1\u0027, text:localize.Actionpad_Todo.mf1w\"\u003e\u003c/li\u003e\r\n    \t\t\u003cli data-bind=\"vba:\u0027ActionPad_todo.Postpone, ww, 2\u0027, text:localize.Actionpad_Todo.mf2w\"\u003e\u003c/li\u003e\r\n            \u003cli class=\"divider\"\u003e\u003c/li\u003e\r\n            \u003cli data-bind=\"vba:\u0027ActionPad_todo.Postpone, m, 1\u0027, text:localize.Actionpad_Todo.mf1m\"\u003e\u003c/li\u003e\r\n    \t\t\u003cli data-bind=\"vba:\u0027ActionPad_todo.Postpone, m, 6\u0027, text:localize.Actionpad_Todo.mf6m\"\u003e\u003c/li\u003e\r\n    \t\t\u003cli class=\"divider\"\u003e\u003c/li\u003e\r\n            \u003cli data-bind=\"vba:\u0027ActionPad_todo.Postpone, yyyy, 1\u0027, text:localize.Actionpad_Todo.mf1y\"\u003e\u003c/li\u003e\r\n    \t\u003c/ul\u003e\r\n    \u003c/div\u003e\r\n```\r\n\r\n##Functions\r\nAll Twitter bootstrap functions are included, please see the [Twitter bootstrap documentation](http://getbootstrap.com/2.3.2/javascript.html) \r\nAs we relay heavily on knockout their `data-bind:\"\"` syntax is used through out the framework. The `data-bind:\"\"` syntax is a used as a property on an html element. In a `data-bind` you add `bindings`, actions or triggers, to perform actions. All Knockout bindings are available, but also a few custom bindings to make your life easier. \r\nRead more about bindings and Knockout [here](http://knockoutjs.com/documentation/introduction.html) and try the tutorial [here](http://learn.knockoutjs.com)\r\n\r\nA basic example of use of a knockout binding:\r\n```html\r\n\u003cli data-bind=\"text:company.name\"\u003e\u003c/li\u003e `\r\n```\r\n\r\nList of custom handlers:\r\n*\t__call:__ - _Tries to call the provided phone number_\r\n*\t__email:__ - _Tries to email the provided address_\r\n*\t__icon:__ - _Prepends the supplied font awesome icon to the html element_\r\n*\t__limeLink:__ - _Creates an LIME link from a provided relationship field, for example person.company_\r\n*\t__openURL:__ - _Opens the supplied URL in a external browser_\r\n*\t__showOnMap:__ - _Opens Google Maps with the supplied data as a search query_\r\n*\t__vba:__ - _Provide an string of an VBA function with it\u0027s parameters separated by commas_\r\n*\t__vbaVisible:__ - _Extends knockouts \u0027visible:\u0027 by executing the supplied Boolean VBA function_\r\n\r\n### Translation: Handling multiple languages\r\nAll available translations from the Localization table are automatically available in the actionpad context. The same language as the logged in user uses is automatically used. The translations are cached in a dictionary to increase speed, but requires you to run `ThisApplication.Setup` to rebuild the dictionary if you add translations or make changes. \r\n\r\n```html\r\n\u003cli data-bind=\"text:localize.ActionPad_Todo.addTodo\"\u003e\u003c/li\u003e\r\n```\r\nTechnical note\r\nThe translations are added to the global view model and thus available in your apps.\r\n\r\n###Fetching data from fields in LIME Pro\r\nAll fields from the ActiveInspector are automagically available for you to use in your view. The syntax is `[Record class name].[field database name].[property]`.\r\n\r\nThe available properties are (in order of relevance):\r\n*\t__.text__ \r\n*\t__.value__\r\n*\t__.key__  - __available for set and list fields_\r\n*\t__.class__ - _available for relation fields_ \r\n\r\n```html\r\n\u003c!-- Company Actionpad showing the name of the company--\u003e\r\n\u003cli data-bind=\"text:company.name.text\"\u003e\u003c/li\u003e\r\n\u003c!-- Person Actionpad using the id of the company relation as a parameter to a VBA-function. Note the Javascript syntax in the Knockout bindning  --\u003e\r\n\u003cli data-bind=\"vba:\u0027SomeFunction,\u0027 + person.company.value\"\u003e\u003c/li\u003e \r\n\u003c!-- Business Actionpad showing the optionKey from a set-list --\u003e\r\n\u003cli data-bind=\"text:business.businesstatus.key\"\u003e\u003c/li\u003e \r\n```\r\n\r\n####Loading additional data\r\nIt is common to use data from more than the ActiveInspector and the following syntax will NOT work `\u003cli data-bind=\"text:person.company.phone.text\"\u003e\u003c/li\u003e`\r\n\r\nInstead you can load additional data by using a knockout virtual element:\r\n\r\n\r\n```html\r\n\u003c!-- ko dataSources: [\r\n\t{type:\u0027record\u0027, source: \u0027ActionPadTools.GetPersonContactData\u0027 },\r\n\t{type:\u0027record\u0027, source:\u0027ActionPadTools.GetCompanyContactData\u0027}] \r\n--\u003e\u003c!-- /ko --\u003e\r\n```\r\n\r\nPut the virtual element in the absolute beginning of your view. The dataSource binding takes an element with properties \"type\" and \"source\".\r\n__type__: Specifies the datatype, can be \"record\", \"records\" or \"xml\"\r\n__source__: The vba function witch supplies the data. Must be a public function. \r\n\r\nThe loaded data can then be access by: \r\n\r\n```html\r\n\u003c!-- Loading person and company info on a helpdesk actionpad--\u003e\r\n\u003cli data-bind=\"text:helpdesk.company.text\"\u003e\u003c/li\u003e\t\t\t\t\t\r\n\u003cli data-bind=\"text:person.phone.text\"\u003e\u003c/li\u003e\r\n\u003cli data-bind=\"text:person.mobilephone.text\"\u003e\u003c/li\u003e\t\t\t\t\t\t\r\n\u003cli data-bind=\"text:company.phone.text\"\u003e\u003c/li\u003e\t\r\n```\r\n\r\n###Hiding or showing elements\r\n\r\nIt is common that some elements only should be visible for certain users or when specific conditions apply. The Data-visibility is used as follows:\r\n\r\n```html\r\n\u003cli data-bind=\"vbaVisible:\u0027ActionPad_Helpdesk.HideLinks, take\u0027\"\u003e\u003c/li\u003e\r\n```\r\n\r\nYou can also use knockouts built in handler `visible:` to hide or show elements, any valid Javascript will be evaluated. Example:\r\n\r\n```html\r\n\u003c!-- Shows an bootstrap alert if the todo is late. Moment.js is used to parse and handle dates.--\u003e\r\n\u003cdiv class=\"alert alert-error\" data-bind=\"\r\n   visible: todo.endtime.value !== null \u0026\u0026 (moment(todo.endtime.value) \u003c moment() \u0026\u0026 todo.done.value != 1),\r\n   text: \u0027The task is \u0027 + (todo.endtime.value != null ? moment(todo.endtime.value).fromNow(true) : \u0027\u0027 )+ \u0027 late!\u0027,\r\n   icon:\u0027fa-bell\u0027\" \u003e\r\n\u003c/div\u003e\r\n```\r\n\r\n\r\nA VBA function is called, handling the logic whether the element should be visible or not, returning an boolean.   \r\n__true:__ Element is visible   \r\n__false:__ Element hidden\r\nIn complex cases the VBA-function can take input parameters to reduce the number of VBA functions required. \r\n\r\n###Executing VBA-functions and specific actions\r\n`vba:` is used to trigger VBA-functions and specific actions on click. To call a VBA function simply use:\r\n\r\n```html\r\n\u003cli data-bind=\"vba:\u0027ActionPad_Helpdesk.Take\u0027\"\u003e\u003c/li\u003e\r\n ```\r\n \r\nInput parameters are provided by simply separating them by commas.\r\n\r\n```html\r\n\u003cli data-bind=\"vba:\u0027ActionPad_Helpdesk.Park, 1, t_park_1_hour\u0027\"\u003e\u003c/li\u003e\r\n ```\r\n\r\n You can also use any available data in the actionpad as an input to the function through concatenating a string  \r\n\r\n```html\r\n\u003cli data-bind=\"vba:\u0027ActionPad_Helpdesk.DoSomethingWithTheRecord,\u0027 + helpdesk.idhelpdesk.value\"\u003e\u003c/li\u003e\r\n ```\r\n \r\n ###The built in handlers and how to use them\r\n\r\n \r\n*\t__showOnMap:__ - Searches Google Maps for the provided address.\r\n \r\n \t```html\r\n \t\u003cli data-bind=\"text:company.postalcity.text, showOnMap: company.fullpostaladdress.text, icon: \u0027fa-map-marker\u0027\"\u003e\u003c/li\u003e\r\n\t```\r\n\t\r\n*\t__call:__ - Ads an tel: link to the HTML wich triggers an built in softphone software.\r\n\t\r\n\t```html\r\n\t\u003cli data-bind=\"text: company.phone.text, call: company.phone.text, icon: \u0027fa-phone\u0027\"\u003e\u003c/li\u003e\r\n\t```\r\n\t\r\n*\t__openURL:__ - Opens the suplied URL in an external browser\r\n\t\r\n\t```html\r\n\t \u003cli data-bind=\"text:company.www.text, openURL: company.www.text, icon: \u0027fa-globe\u0027\"\u003e\u003c/li\u003e\r\n\t```\r\n*\t__limeLink__ - Tries to create an LIME link to the object provided, please note that the root node of the object is used and not a specific property.\r\n\t\r\n\t```html\r\n\t\u003cli data-bind=\"text:todo.company.text, limeLink:todo.company, icon:\u0027fa-flag\u0027\"\u003e\u003c/li\u003e\r\n\t```\r\n*\t__email__ - Creates an email. TODO: Should use LIMES built in email factory\r\n\t\r\n\t```html\r\n\t\u003cli data-bind=\"text:person.email.text, email:person.email.text, icon:\u0027fa-mail\u0027\"\u003e\u003c/li\u003e\r\n\t```\r\n"},{"name":"Building Apps","index":5,"md":"#Basics\r\nApps are small standalone tools, used for customer customisations. They are loaded dynamically and added only through a single line of HTML in the Actionpad. The business logic and dataconnection is allways performed by the VBA. This functionallity should be inside a single module. \r\n\r\nThe general idea of an app is to implement:\r\n\r\n1. A function or procedure to deliver data. VBA or SQL, can deliver data as xml, record or records.\r\n2. A view - An html template with the structure of your app.\r\n3. A view-model - the viewmodel holds a rednering and frontend logic\r\n\r\nAn app is initilaized as:\r\n1. The app is loaded and the config of the app is parsed\r\n2. Data is loaded from LIME Pro, from your supplied function\r\n3. The data is converted to a view-model (In this case the view model is just a JSON represenation of the data)\r\n4. Additional resources are loaded to the app\r\n5. The view-model is supplied to the app and cam be modified\r\n6. The app view is loaded from app.html.\r\n7. The view and view-model is rendered and injected to the actionpad \r\n\r\nInitiation of an app is executed by the `lbs.apploader.js` module and triggered by an `data-app:`-attribute.\r\n\r\nThe data can be provided as XML, record or records and limebootstrap will then supply the app with an View-model based on the data, free for you to work with. In the view model you will also find all translations and avilable data from the current actionpad viewmodel.   \r\n\r\n```html\r\n\u003cdiv data-app=\"name:\u0027checklist\u0027,config:{canBeUnchecked:true,allowRemove:true, canAddTask:true}} \" \u003e\u003c/div\u003e\r\n```\r\n\r\n##The javascript app structure\r\n\t\r\n```javascript\r\nlbs.apploader.register(\u0027template\u0027, function () { //Insert name of app here\r\n    var self = this;\r\n\r\n    //config\r\n    this.config = {\r\n        dataSources: [ //Either provide your data source here, or let the user of your app supplie it\r\n\r\n        ],\r\n        resources: { //Add any extra resources that should be loadad. The paths are realtive your app folder, exept libs which are loaded from system/js/\r\n            scripts: [],\r\n            styles: [\u0027app.css\u0027],\r\n            libs: [\u0027json2xml.js\u0027]\r\n        }\r\n    },\r\n\r\n    //initialize\r\n    this.initialize = function (node, viewModel) {\r\n\r\n        //Use this method to setup you app. \r\n        //\r\n        //The data you requested along with activeInspector are delivered in the variable viewModel.\r\n        //You may make any modifications you please to it or replace is with a entirely new one before returning it.\r\n        //The returned viewmodel will be used to build your app.\r\n\r\n\r\n        return viewModel;\r\n    }\r\n\r\n```\r\n\r\n##Object definitions\r\n\r\n#### DataSouce\r\n `{type: \u0027\u0027, source: \u0027\u0027, alias:\u0027\u0027}`\r\n\r\n#### LimeVersion\r\n|Parameter|Type|Comment|\r\n|---|---|---|\r\n|comparable|int||\r\n|full|string||\r\n|major|int||\r\n|minor|int||\r\n|build|int||\r\n\r\n\r\n##Library attributes\r\n|Parameter|Type|Comment|\r\n|---|---|---|\r\n|lbs.debug|int|if debug modes has been triggered|\r\n|lbs.limeVersion|LimeVersion||\r\n|lbs.limeDataConnection|object|reference to window.external|\r\n|lbs.hasLimeConnection|boolean|has reference to lime?|\r\n|lbs.activeClass|string||\r\n|lbs.activeDatabase|string||\r\n|lbs.activeServer|string||\r\n|lbs.common.iconTemplate|string|template for icon html|\r\n\r\n\r\n##Library helper functions \r\n\r\n#### lbs.heper.loadDataSorces()\r\nLoads multiple datasources into a JSON objekt\r\n##### Syntax\r\n`lbs.heper.loadDataSorces(viewModel, DataSources, [override])`\r\n##### Parameters\r\n|Parameters|Type|Comment|\r\n|---|---|---|\r\n|viewModel|array|object to assign values to|\r\n|DataSources|Array|sources|\r\n|Override|boolean|if duplicate values should be overriden or thrown away|\r\n\r\n#### lbs.heper.loadDataSorce()\r\nLoads a datasources into a JSON objekt\r\n##### Syntax\r\n`lbs.heper.loadDataSorce(viewModel, DataSource, [override])`\r\n##### Parameters\r\n|Parameters|Type|Comment|\r\n|---|---|---|\r\n|viewModel|array|object to assign values to|\r\n|DataSource|DataSouce|source|\r\n|Override|boolean|if duplicate values should be overriden or thrown away|\r\n\r\n####lbs.common.getErrorText()\r\nReturnes a funny error adjective :)\r\n#####Syntax\r\n`lbs.common.getErrorText()`\r\n##### Return\r\nstring\r\n\r\n####lbs.common.escapeHtml()\r\nEscape html\r\n##### Syntax\r\n`lbs.common.escapeHtml(html)`\r\n##### Parameters\r\n|Parameters|Type|\r\n|---|---|\r\n|html|string|\r\n##### Return\r\nstring\r\n\r\n####lbs.common.createLimeLink()\r\nCreate limelink\r\n##### Syntax\r\n`lbs.common.createLimeLink(class,id)`\r\n##### Parameters\r\n|Parameters|Type|\r\n|---|---|\r\n|class|string|\r\n|id|int|\r\n##### Return\r\nstring\r\n\r\n####lbs.common.getURLParameter()\r\nExtract URL parameter from GET variable\r\n##### Syntax\r\n`lbs.common.getURLParameter(name)`\r\n##### Parameters\r\n|Parameters|Type|\r\n|---|---|\r\n|name|string|\r\n##### Return\r\nstring\r\n\r\n####lbs.common.executeVba()\r\nExecute VBA code, same as old VBA.run()\r\n##### Syntax\r\n`lbs.common.executeVba(proc,params)`\r\n##### Parameters\r\n|Parameters|Type|\r\n|---|---|\r\n|proc|string|\r\n|params|string|\r\n##### Return\r\nstring\r\n\r\n####lbs.common.nl2br\r\nreplace nl chars with html rowbreaks\r\n##### Syntax\r\n`lbs.common.nl2br(data)`\r\n##### Parameters\r\n|Parameters|Type\r\n|---|---|\r\n|data|string|\r\n##### Return\r\nstring\r\n\r\n####string.format()\r\nImplementation of c# String.Format()\r\n##### Syntax\r\n`string.format(format,var1,[var2])`\r\n##### Parameters\r\n|---|---|\r\n|format|string|\r\n|var|replacement varibles|\r\n##### Return\r\nstring\r\n\r\n####lbs.log.debug\r\nLog message at debug level\r\n##### Syntax\r\n`lbs.log.debug(msg)`\r\n##### Parameters\r\n|Parameters|Type|\r\n|---|---|\r\n|msg|message|\r\n\r\n####lbs.log.debug\r\nLog message at info level\r\n##### Syntax\r\n`lbs.log.info(msg)`\r\n##### Parameters\r\n|Parameters|Type|\r\n|---|---|\r\n|msg|message|\r\n\r\n####lbs.log.warn\r\nLog message at warn level\r\n##### Syntax\r\n`lbs.log.warn(msg, [e])`\r\n##### Parameters\r\n|Parameters|Type|\r\n|---|---|\r\n|msg|message|\r\n|e|Execption (optional)|\r\n\r\n####lbs.log.error\r\nLog message at error level\r\n##### Syntax\r\n`lbs.log.error(msg, [e])`\r\n##### Parameters\r\n|Parameters|Type|\r\n|---|---|---|\r\n|msg|message|\r\n|e|Execption (optional)|"},{"name":"Technical Platform","index":6,"md":"##Technical\r\n\r\n### Included javascript frameworks\r\nThe bundled library contains:\r\n\r\n*\t[jQuery](http://jquery.com)\r\n*\t[Underscore.js](http://underscorejs.org)\r\n*\t[Moment.js](http://momentjs.com)\r\n*\t[Knockout.js](http://knockoutjs.com/)\r\n*\t[Bootstrap.js](http://getbootstrap.com)\r\n\r\n###Icons\r\n[Font awesome](http://fortawesome.github.io/Font-Awesome/) is include. Please see the font awesome documentation.\r\n\r\n###Structure of the framework\r\n\r\nThe framework has the following file structure\r\n\r\n*\t__apps__ - _small selfdependent html apps that can be dynamically loaded into the Actionpads_\r\n\t*\t...\r\n*\t__System__ - _READ ONLY! This is the base of the framework and should never be modified_\r\n\t*\t__bin__ - _launch Google Chrome in Allow Cross Origin mode_\r\n\t*\t__css__\r\n\t\t*\tlime.css - _styling for the framework. Overrides several Twitter Bootstrap stylings_\r\n\r\n\t\t*\tfont-awesome.css\r\n\t\t*\tbootstrap.css\r\n\t*\t__font__ - _Font files for Font awesome_\r\n\t\t*\t... \r\n\t*\t__img__ - _images used in the framework which aren\u0027t from Font Awesom_\r\n\t\t*\t...\r\n\t*\t__js__ - _all javacript used in the framework_\r\n\t\t*\tlbs.js - _Frameworks main javascript_\r\n\t\t*\t... Third party frameworks ...\r\n\t*\t__view__ - _Views used by the system, for example the debug view_\r\n*\tapplication.html\r\n\t\t\r\n\r\n### The core: lbs.js and it\u0027s modules\r\nlbs.js is the main file of the framework is mainly in charge of setup and delegating tasks. It uses the following modules to accually do stuff:\r\n*\t__lbs.apploader.js__ - Handels the loading of the apps and their initiation \r\n*\t__lbs.bindings.js__ - The custom knockout bindnings are defined here\r\n*\t__lbs.loader.js__  - Handels loading of scripts, views and styles. \r\n*\t__lbs.log.js__ - Handels logging to the custom console. \r\n\r\n\r\n"}]