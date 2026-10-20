.PHONY: install update

install update:
	@test -n "$(FACTORY_HOME)" || (echo 'Set FACTORY_HOME to the framework checkout'; exit 1)
	$(MAKE) -C "$(FACTORY_HOME)" $@
