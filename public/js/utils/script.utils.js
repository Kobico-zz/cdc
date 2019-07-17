export class ScriptLoader {
    static URL(url) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.addEventListener('load', () => resolve(script), false);
            script.addEventListener('error', () => reject(script), false);
            document.body.appendChild(script);
        });
    }
    static URLs(urls) {
        return Promise.all(urls.map(ScriptLoader.URL));
    }
}
