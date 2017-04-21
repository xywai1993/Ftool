/**
 * Created by 学不进 on 2015/12/23 0023.
 */

// 生产环境
fis.match('Ftool.js',{
	optimizer: fis.plugin('uglify-js',{
		mangle: {
			except: 'exports, module, require, define'
		},
		compress : {
			drop_console: true
		}
	}),
	parser: fis.plugin('babel-5.x', {
		blacklist: ['regenerator'],
		stage: 3
	}),
	release:'Ftool.min.js',
	deploy: fis.plugin('local-deliver', {
		to:'min'
	})
});

