THRESHOLD=90

test:
	@node node_modules/.bin/lab -p -v
test-json:
	@node node_modules/.bin/lab -p -r json -o results.json
test-cov:
	@node node_modules/.bin/lab -t ${THRESHOLD} -v -p
test-cov-mock:
	@MOCK=true node node_modules/.bin/lab -t ${THRESHOLD} -v -p
test-cov-html:
	@node node_modules/.bin/lab -r html -p -o coverage.html

install:
	@npm install

clean:
	@rm -rf node_modules

reinstall: clean install

.PHONY: test test-json test-cov test-cov-mock test-cov-html
