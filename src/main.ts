import { Notice, Plugin } from "obsidian";
import {
	DEFAULT_SETTINGS,
	CleanerSettings,
	CleanerSettingTab,
} from "./settings";

export default class Cleaner extends Plugin {
	settings: CleanerSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon("dice", "Clean", (evt: MouseEvent) => {
			new Notice("Cleaner initiated!");
		});

		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Cleaner active");

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new CleanerSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<CleanerSettings>
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
