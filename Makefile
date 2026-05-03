.PHONY: default
default: validate

.PHONY: validate
validate:
	jq empty .devcontainer/devcontainer.json
	bash -n .devcontainer/setup.sh
	bash -n opt/mbis/bin/mbis
	bash -n opt/mbis/bin/smoke-test-tools
	bash opt/mbis/bin/mbis help >/dev/null
