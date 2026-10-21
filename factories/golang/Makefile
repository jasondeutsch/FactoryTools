.PHONY: install update

install:
	@test -n "$(FACTORY_HOME)" || (echo 'Set FACTORY_HOME to the framework checkout'; exit 1)
	$(MAKE) -C "$(FACTORY_HOME)" install
	brew install golangci-lint
	go install golang.org/x/tools/gopls@latest
	@command -v gopls >/dev/null || { bin=$$(go env GOBIN); test -n "$$bin" || bin=$$(go env GOPATH)/bin; echo "gopls is installed in $$bin but is not on PATH. Add that directory to PATH in the shell that starts Factory."; exit 1; }
	node "$(FACTORY_HOME)/orchestrator/scripts/install_extensions.ts" "$(CURDIR)/factory.json" coder_golang

update:
	@test -n "$(FACTORY_HOME)" || (echo 'Set FACTORY_HOME to the framework checkout'; exit 1)
	$(MAKE) -C "$(FACTORY_HOME)" update
	brew upgrade golangci-lint
	go install golang.org/x/tools/gopls@latest
	@command -v gopls >/dev/null || { bin=$$(go env GOBIN); test -n "$$bin" || bin=$$(go env GOPATH)/bin; echo "gopls is installed in $$bin but is not on PATH. Add that directory to PATH in the shell that starts Factory."; exit 1; }
	node "$(FACTORY_HOME)/orchestrator/scripts/install_extensions.ts" "$(CURDIR)/factory.json" coder_golang
