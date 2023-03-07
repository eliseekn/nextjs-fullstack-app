import fs from "fs"
import path from "path"

//https://javascript.info/task/truncate
export const truncate = (str: string, length: number) => {
    return (str.length > length) ? str.slice(0, length - 1) + '...' : str;
}

//https://stackoverflow.com/a/36441982
export const base64ToFile = (data: string, fileName: string) => {
    return fs.writeFile(path.relative(process.cwd(), `public/upload/${fileName}`), data.split(",")[1], {encoding: 'base64'}, (err) => console.log(err))
}
