.PHONY: upgrade-all-deps upgrade-api-deps upgrade-ui-deps

upgrade-all-deps: upgrade-api-deps upgrade-ui-deps

upgrade-api-deps:
	@printf "Upgrading API deps..."
	- docker-compose run pycont-api sh -c " \
		pip install --no-cache-dir -r build/requirements.base.txt > /dev/null 2> /dev/null \
	    ; pip freeze 2> /dev/null | grep -v -e '^-e'" > api/build/requirements.constraint.txt
	@echo [OK]

upgrade-ui-deps:
	@printf "Upgrading UI deps..."
	docker-compose run -uroot pycont-ui sh -c "npm install -g npm-check-updates; ncu -u"
	@echo [OK]
	
