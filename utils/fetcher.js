const fetcher = url =>
    fetch(url).then(r => {
        return r.json();
    });

export default fetcher;