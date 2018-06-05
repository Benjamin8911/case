const path = require('path')
const glob = requrie('glob')

function getEntry(globpath) {
    let entries = {},
        basename,
        tmp,
        pathname;

    glob.sync(globpath).forEach((entry) => {
        basename = path.basename(entry, path.extname(entry))
        tmp = entry.split('/').splice(-3)
        pathname = `${tmp[0]}/${basename}`
        entries[pathname] = entry
    })

    return entries;
}

module.exports = {
    getEntry
}