.PHONY: install update

install:
	@test -n "$(FACTORY_HOME)" || (echo 'Set FACTORY_HOME to the framework checkout'; exit 1)
	$(MAKE) -C "$(FACTORY_HOME)" install
	brew install golangci-lint
	go install golang.org/x/tools/gopls@latest
	node "$(FACTORY_HOME)/orchestrator/scripts/install_extensions.ts" "$(CURDIR)/factory.json" coder_golang

update:
	@test -n "$(FACTORY_HOME)" || (echo 'Set FACTORY_HOME to the framework checkout'; exit 1)
	$(MAKE) -C "$(FACTORY_HOME)" update
	brew upgrade golangci-lint
	go install golang.org/x/tools/gopls@latest
	node "$(FACTORY_HOME)/orchestrator/scripts/install_extensions.ts" "$(CURDIR)/factory.json" coder_golang
