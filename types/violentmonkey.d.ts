import type {
	createElement,
	Fragment,
	getTextValues,
	h,
	hm,
	m,
	observe,
} from 'npm:@violentmonkey/dom@latest';
import type { register } from 'npm:@violentmonkey/shortcut@latest';

declare global {
	var unsafeWindow: typeof window;

	var VM: {
		createElement: typeof createElement;
		Fragment: typeof Fragment;
		getTextValues: typeof getTextValues;
		h: typeof h;
		hm: typeof hm;
		m: typeof m;
		observe: typeof observe;
		register: typeof register;
	};

	var GM_info: {
		uuid: string;
		platform: {
			arch: string;
			browserName: string;
			browserVersion: string;
			os: string;
		};
		script: {
			name: string;
			namespace: string;
			description: string;
			version: string;
			excludes: string[];
			includes: string[];
			matches: string[];
			resources: string[];
			runAt: '' | 'document-end' | 'document-start' | 'document-idle';
			unwrap: boolean;
		};
		scriptHandler: 'Violentmonkey';
		version: string;
		scriptMetaStr: string;
		scriptWillUpdate: boolean;
		injectInto: 'page' | 'content' | 'auto';
	};

	function GM_getValue<T = any>(key: string, defaultValue?: T): T;

	function GM_setValue(key: string, value: any): void;

	function GM_deleteValue(key: string): void;

	function GM_listValues(): string[];

	function GM_addValueChangeListener(
		name: string,
		callback: (name: string, oldValue: any, newValue: any, remote: boolean) => void,
	): void;

	function GM_removeValueChangeListener(listenerId: string): void;

	function GM_getResourceText(name: string): string;

	function GM_getResourceURL(name: string, isBlobUrl?: boolean): string;

	// declare function GM_addElement(tagName: string, attributes: object): HTMLElement;
	function GM_addElement<K extends keyof HTMLElementTagNameMap>(
		tagName: K,
		attributes: Partial<HTMLElementTagNameMap[K]>,
	): HTMLElementTagNameMap[K];
	function GM_addElement<K extends keyof HTMLElementTagNameMap>(
		parentNode: HTMLElement,
		tagName: K,
		attributes: Partial<HTMLElementTagNameMap[K]>,
	): HTMLElementTagNameMap[K];

	function GM_addStyle(css: string): HTMLStyleElement;

	type GM_callback = (this: Window) => void;

	interface GM_tab {
		onclose?: GM_callback;
		closed?: boolean;
		close?: () => void;
	}

	function GM_openInTab(url: string, openInBackground?: boolean): GM_tab;
	function GM_openInTab(
		url: string,
		options?: {
			active?: boolean;
			container?: number;
			insert?: boolean;
			pinned?: boolean;
		},
	): GM_tab;

	function GM_registerMenuCommand(
		caption: string,
		onClick: (event: MouseEvent & KeyboardEvent) => void,
	): void;

	function GM_unregisterMenuCommand(caption: string): void;

	function GM_notification(options: {
		text: string;
		title?: string;
		image?: string;
		onclick?: GM_callback;
		ondone?: GM_callback;
	}): { remove: Promise<void> };

	function GM_notification(
		text: string,
		title?: string,
		image?: string,
		onclick?: GM_callback,
	): { remove: Promise<void> };

	type GM_clipboardDataType =
		| 'text/plain'
		| 'text/uri-list'
		| 'text/csv'
		| 'text/css'
		| 'text/html'
		| 'application/xhtml+xml'
		| 'image/png'
		| 'image/jpg, image/jpeg'
		| 'image/gif'
		| 'image/svg+xml'
		| 'application/xml, text/xml'
		| 'application/javascript'
		| 'application/json'
		| 'application/octet-stream';

	function GM_setClipboard(data: string, type?: GM_clipboardDataType): void;

	type GM_httpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTION' | 'HEAD';

	interface GM_httpResponseType {
		text: string;
		json: object;
		blob: Blob;
		arraybuffer: ArrayBuffer;
		document: unknown;
	}

	interface GM_progressEvent<K extends keyof GM_httpResponseType, C = unknown> {
		context?: C;
		finalUrl: string;
		readyState: 0 | 1 | 2 | 3 | 4;
		response: GM_httpResponseType[K] | null;
		responseHeaders: string;
		status: number;
		statusText: string;
	}

	interface GM_httpRequestOptions<K extends keyof GM_httpResponseType, C = unknown> {
		headers?: Record<string, string>;
		timeout?: number;
		onerror?: (this: Window, event: GM_progressEvent<K, C>) => void;
		onprogress?: (
			this: Window,
			event: {
				lengthComputable: boolean;
				loaded: number;
				total: number;
			} & GM_progressEvent<K>,
		) => void;
		ontimeout?: (this: Window, event: GM_progressEvent<K, C>) => void;
	}

	interface GM_httpResponse {
		abort: () => void;
	}

	function GM_xmlhttpRequest<K extends keyof GM_httpResponseType, C = unknown>(
		details: {
			url: string;
			method?: GM_httpMethod;
			user?: string;
			password?: string;
			overrideMimetype?: string;
			responseType?: K;
			data?: string | FormData | Blob;
			binary?: boolean;
			context?: C;
			anonymous?: boolean;
			synchronous?: boolean;
			onabort?: (this: Window, event: GM_progressEvent<K, C>) => void;
			onload?: (this: Window, event: GM_progressEvent<K, C>) => void;
			onloadend?: (this: Window, event: GM_progressEvent<K, C>) => void;
			onloadstart?: (this: Window, event: GM_progressEvent<K, C>) => void;
			onreadystatechange?: (this: Window, event: GM_progressEvent<K, C>) => void;
		} & GM_httpRequestOptions<K, C>,
	): GM_httpResponse;

	function GM_download(url: string, name?: string): GM_httpResponse;
	function GM_download(
		options: {
			url: string;
			name?: string;
			onload?: GM_callback;
		} & GM_httpRequestOptions<'arraybuffer'>,
	): GM_httpResponse;
}
