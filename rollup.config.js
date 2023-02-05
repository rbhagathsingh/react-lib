import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from '@rollup/plugin-typescript';
import ts from 'typescript';
import terser from "@rollup/plugin-terser"
import external from "rollup-plugin-peer-deps-external"
import dts from "rollup-plugin-dts"
import scss from 'rollup-plugin-sass';
import fs from 'fs';
import CleanCSS from 'clean-css';
import json from "@rollup/plugin-json";
import copy from 'rollup-plugin-copy';

// import postcss from "rollup-plugin-postcss"
// import autoprefixer from "autoprefixer"
// import typescript from 'rollup-plugin-typescript2';

const packageJson = require("./package.json")
const cssFilesNames = {
	'style': 'style.css'
};


function buildPackage(url, fileName) {
	return {
		onwarn(warning, warn) {
			if (warning.code === 'THIS_IS_UNDEFINED') return;
			warn(warning);
		},
		input: url,
		external: [...Object.keys(packageJson.peerDependencies || {})],
		output: [
			{
				file: `./dist/${fileName}/cjs/index.js`,
				format: "cjs",
				sourcemap: true,
				name: "react-lib",
			},
			{
				file: `./dist/${fileName}/esm/index.js`,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			external(),
			json(),
			resolve({ preferBuiltins: false, modulesOnly: true }),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				typescript: ts,
				exclude: [
					'**/*.spec.ts',
					'**/*.test.ts',
					'**/*.stories.ts',
					'**/*.spec.tsx',
					'**/*.test.tsx',
					'**/*.stories.tsx',
					'node_modules',
					'bower_components',
					'jspm_packages',
					'src/stories/*',
					'dist',
				],
				compilerOptions: {
					sourceMap: true,
					declaration: true,
				}
			}),
			terser({ compress: true }),
		]
	}
}

export default [
	{
		onwarn(warning, warn) {
			if (warning.code === 'THIS_IS_UNDEFINED') return;
			warn(warning);
		},
		input: "src/index.ts",
		external: [...Object.keys(packageJson.peerDependencies || {})],
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
				name: "reat-lib",
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			external(),
			json(),
			resolve({ preferBuiltins: false, modulesOnly: true }),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				typescript: ts,
				exclude: [
					'**/*.spec.ts',
					'**/*.test.ts',
					'**/*.stories.ts',
					'**/*.spec.tsx',
					'**/*.test.tsx',
					'**/*.stories.tsx',
					'node_modules',
					'bower_components',
					'jspm_packages',
					'src/stories/*',
					'dist',
				],
				compilerOptions: {
					sourceMap: true,
					declaration: true,
				}
			}),
			scss({
				output: (styles, styleNodes) => {
					fs.mkdirSync('./dist/css', { recursive: true });
					styleNodes.forEach((ele, ind) => {
						let tInd = ele.id.lastIndexOf('\\');
						let fileName = ele.id.slice(tInd + 1);
						let dotInd = fileName.lastIndexOf('.');
						let cssFileName = fileName.slice(0, dotInd).trim();
						const minifyCss = new CleanCSS().minify(ele.content);
						if (cssFilesNames[cssFileName]) {
							fs.writeFileSync('./dist/css/' + cssFilesNames[cssFileName], ele.content);
							fs.writeFileSync('./dist/css/' + cssFilesNames[cssFileName].split('.css')[0] + '.min.css', minifyCss.styles);
						}
					});
				},
				sass: require('sass')
			}),
			copy({

				targets: [
					{ src: 'LICENSE', dest: 'dist' },
					{ src: 'README.md', dest: 'dist' },
					{
						src: 'package.json',
						dest: 'dist',
						transform: (content) => {
							const { scripts, devDependencies, husky, release, engines, ...keep } = JSON.parse(
								content.toString()
							);
							return JSON.stringify(keep, null, 2);
						},
					},
					{ src: 'src/assets/images/**/*', dest: 'dist/images' },
					{ src: 'src/styles/*', dest: 'dist/styles' },
				],
			}),
			terser({ compress: true }),
		]
	},
	// buildPackage('./src/components/index.ts', 'componetns'),
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		external: [/\.(css|scss)$/],
		plugins: [dts()],
	}
]
