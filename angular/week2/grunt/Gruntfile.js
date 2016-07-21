'use strict';

module.exports = function (grunt) {
	//require('time-grunt')(grunt); // Time how long tasks take. > Optimize build times
	
	require('jit-grunt')(grunt, { // Automatically load plugins from the task names
	  useminPrepare: 'grunt-usemin' // a plugin that can not be resolved in the automatic mapping
	});
	grunt.initConfig({ // an object passed into the method to configure tasks & the project
		pkg: grunt.file.readJSON('package.json'), // refer to package.json

		// Configurations for the JSHint task.
	  	jshint: { // a plugin for grunt JS check grunt-contrib-jshint
		    options: {
		      jshintrc: '.jshintrc', // specify the check's attibute of the JSHint
		      reporter: require('jshint-stylish') // Stylish reporter for the plugin
			},
	    	all: {
	      		src: [
	        	'Gruntfile.js',
	        	'app/scripts/{,*/}*.js'
	      		]
	    	}
  		},

  		// Configurations for the copy task.
		copy: {
			dist: {
			cwd: 'app',
			src: [ '**','!styles/**/*.css','!scripts/**/*.js' ],
			dest: 'dist',
			expand: true
			},
			fonts: {
				files: [
				  {
				    //for bootstrap fonts
				    expand: true,
				    dot: true,
				    cwd: 'bower_components/bootstrap/dist',
				    src: ['fonts/*.*'],
				    dest: 'dist'
				  }, {
				    //for font-awesome
				    expand: true,
				    dot: true,
				    cwd: 'bower_components/font-awesome',
				    src: ['fonts/*.*'],
				    dest: 'dist'
				  }
				]
			}
		},

		// Configurations for the clean task
		clean: {
		  build: {
		    src: [ 'dist/']
		  }
		},

		useminPrepare: {
		  html: 'app/menu.html',
		  options: {
		    dest: 'dist'
		  }
		},

		// Concat
		concat: {
		  options: {
		    separator: ';'
		  },

		  // dist configuration is provided by useminPrepare
		  dist: {}
		},

		// Uglify
		uglify: {
		  // dist configuration is provided by useminPrepare
		  dist: {}
		},

		cssmin: {
		  dist: {}
		},

		// Filerev
		filerev: {
		  options: {
		    encoding: 'utf8',
		    algorithm: 'md5',
		    length: 20
		},

		release: {
		    // filerev:release hashes(md5) all assets (images, js and css )
		    // in dist directory
		    files: [{
		      src: [
		        'dist/scripts/*.js',
		        'dist/styles/*.css',
		      ]
		    }]
		  }
		},

		// Usemin
		// Replaces all assets with their revved version in html and css files.
		// options.assetDirs contains the directories for finding the assets
		// according to their relative paths
		usemin: {
		  html: ['dist/*.html'],
		  css: ['dist/styles/*.css'],
		  options: {
		    assetsDirs: ['dist', 'dist/styles']
		  }
		},

		watch: {
		  copy: {
		    files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
		    tasks: [ 'build' ]
		  },

		  scripts: {
		    files: ['app/scripts/app.js'],
		    tasks:[ 'build']
		  },

		  styles: {
		    files: ['app/styles/mystyles.css'],
		    tasks:['build']
		  },

		  livereload: {
		    options: {
		      livereload: '<%= connect.options.livereload %>'
		    },

		    files: [
		      'app/{,*/}*.html',
		      '.tmp/styles/{,*/}*.css',
		      'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
		    ]
		  }
		},

		connect: {
		  options: {
		    port: 9000,
		    // Change this to '0.0.0.0' to access the server from outside.
		    hostname: 'localhost',
		    livereload: 35729
		  },

			dist: {
				options: {
				  open: true,
				  base:{
				    path: 'dist',
				    options: {
				      index: 'menu.html',
				      maxAge: 300000
				    }
				  }
				}
			}
		},

	});

	grunt.registerTask('build', [ // Alias Task for one or more tasks contained in the list
	  //'clean',
	  'jshint',
	  //'useminPrepare',
	  //'concat',
	  //'cssmin',
	  //'uglify',
	  //'copy',
	  //'filerev',
	  //'usemin'
	]); // Register a task as 'build'

	grunt.registerTask('serve',['build','connect:dist','watch']); // nested tasks
	grunt.registerTask('default',['build']); // 'grunt' for default; 'grunt taskname' for the specified task atr the command prompt
 };
