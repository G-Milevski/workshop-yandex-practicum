import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const MAP_LOAD = {
    svg: {
        
    }
}

export async function resolve(specifier, context, next) {
	const nextResult = await next(specifier, context);

	if (!specifier.endsWith('.jpg')) return nextResult;

	return {
		format: 'jpg',
		shortCircuit: true,
		url: nextResult.url,
	};
}

export async function load(url, context, next) {
	if (context.format !== 'jpg') return next(url, context);

	//const rawSource = '' + await fs.readFile(fileURLToPath(url));

	return {
		format: 'module',
		shortCircuit: true,
		source: `export default "${url}"`,
	};
}