const cmd_opt = {
    rootPath: "./assets/"
}

const fileSet = new Set();

function require(filename)
{
    const url = require.resolve(filename);
    console.log(url);
    console.log(fileSet);
    if(fileSet.has(url))
    {
        console.log("The file has been loaded.");
    }
    else
    {
        fileSet.add(url);
        const xhr = new XMLHttpRequest();
        xhr.open("get", url, false);
        xhr.send();
        let code;
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            code = xhr.responseText;
        }

        const runnableCode =`(
            function define (require, exports, module)
            {
                ${code}
            })
        `;

        const def = eval(runnableCode);
        const module = {
            exports: {}
        }
        def(require, module.exports, module);
        return module.exports;
    }

}


require.resolve = function(filename)
{
    if(!filename.endsWith(".js")){
        filename = filename + ".js";
    }
    return cmd_opt.rootPath + filename;
}
