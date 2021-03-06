'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rename = require("gulp-rename");
var _ = require('lodash');

module.exports = generators.Base.extend({

  initializing : function () {
    
  },
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.green('SharePoint 2013 Client Web Part') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of this webpart?',
      default: this.appname
    },
    {
      type: 'input',
      name: 'title',
      message: 'Web part title?',
      default: _.startCase(this.appname) + ' Web Part'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Web part description?',
      default: _.startCase(this.appname) + ' description'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;

      this.props.wpname = _.upperFirst(_.camelCase(this.props.name));
    }.bind(this));
  },
  copyTemplates: function () {
    var _this = this;
    this.registerTransformStream(rename(function (path) {
        path.dirname = path.dirname.replace('-name-', _this.props.wpname);
        path.basename = path.basename.replace('-name-', _this.props.wpname).replace('_','');
        return path;
    }));
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      _this.props
    );
  },
  install: function () {
    //this.installDependencies();
  }
});
