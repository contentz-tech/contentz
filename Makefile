publish:
	yarn lerna version $(bump)
	cd packages/utils && npm publish --access public ; cd -
	cd packages/write && npm publish --access public ; cd -
	cd packages/social && npm publish --access public ; cd -
	cd packages/init && npm publish --access public ; cd -
	cd packages/core && npm publish --access public ; cd -

