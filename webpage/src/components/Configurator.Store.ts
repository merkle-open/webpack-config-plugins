import { observable, computed } from 'mobx';
import { ConfigLoaderTypeOptions, getConfigurations } from '../lib/config-generator';

export class ConfiguratorStore implements ConfigLoaderTypeOptions {
	@observable useJs: boolean = false;
	@observable useTs: boolean = false;
	@observable useScss: boolean = false;
	@observable useCss: boolean = false;
	@observable useFonts: boolean = false;
	@observable useImages: boolean = false;
	@observable useHtml: boolean = false;
	@observable useClean: boolean = false;
	@observable useDevServer: boolean = false;
	@observable useCli: boolean = false;

	constructor(initialState: Partial<ConfigLoaderTypeOptions>) {
		Object.assign(this, initialState);
	}

	@computed
	get generatedUserConfigurations() {
		return getConfigurations(this);
	}
}
