//i cant get any packages to work, so this will have to do.



require("http").createServer((req, res) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
    if (req.url.match(/^(\/|\/*\?.*)$/)) {
        console.log("/")
        res.setHeader("Content-Type", "text/html")
        require("fs").createReadStream(__dirname + "/index.html").pipe(res)
    } else {
        if (require("fs").existsSync(__dirname + req.url)) {
            if (req.url.endsWith(".js")) {
                res.setHeader("Content-Type", "application/javascript")
            } else if (req.url.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css")
            } else if (req.url.endsWith(".html")) {
                res.setHeader("Content-Type", "text/html")
            }
            require("fs").createReadStream(__dirname + req.url).pipe(res)
        } else {
            res.statusCode = 404
            res.end("Not Found")
        }
    }
}).listen(3000)