# angular-GitHub Search apps

## Getting Started

To get you started you can simply clone the this repository and install the dependencies:

### Prerequisites 

You need git to clone the this repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test this. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone Angular-John-BS-GithubSearch 

Clone the Angular-John-BS-GithubSearch repository using [git]:

```
git clone https://github.com/johnmichel03/Angular-John-BS-GithubSearch
cd Angular-John-BS-GithubSearch
```

If you just want to start a new project without the this commit history then you can do:

```bash
git clone --depth=1 https://github.com/johnmichel03/Angular-John-BS-GithubSearch <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies 

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
this changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application 

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.

currently the application point to source app folder ie ./app.

### Production Build 

'''
run the npm command 'gulp'
'''

Modify the package.json file point to build folder ie ./dist/app

example : 
```
 "start": "http-server -a localhost -p 8000 -c-1 ./dist/app" 
 ```

### NOTE 

The test project did not completed and just the test configurations are in place. I will add the unit test and e2e testing later.

