const { utils: {fromBuildIdentifier} } = require('@electron-forge/core')

module.exports = {
	packagerConfig: {  },
	electronRebuildConfig: {},
	makers: [ 
		{
			"name": "@electron-forge/maker-squirrel",
			"config": {
				"certificateFile": "./cert.pfx",
				"certificatePassword": "this-is-a-secret"
			}
		}
	],
	publishers: [ 
		{
			name: '@electron-forge/publisher-github',
			config: {
				repository: {
					owner: 'SanjeetBalamurugan',
					name: 'winget-package-viewer'
				},
				prerelease: false
			}
		}
	],
	plugins: [  ],
	hooks: {  },
	buildIdentifier: 'prod',
	packagerConfig: {
		appBundleId: fromBuildIdentifier({ beta: 'com.beta.winget-package-viewer', prod: 'com.winget-package-viewer' })
	}
}
