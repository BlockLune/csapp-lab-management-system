// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'CSAPP Labs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: '概览',
					autogenerate: { directory: 'brief' },
				},
				{
					label: '数据实验 Data Lab',
					autogenerate: { directory: 'labs/data-lab' },
				},
			],
		}),
	],
});
