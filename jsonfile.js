const { readFile, writeFile } = require('fs');

const { promisify } = require('util');

const readFileJSON = promisify(readFile);
const writeFileJSON = promisify(writeFile);

class JSONFile {
    constructor(fileName){
        this.fileName = fileName;
    }

    async _readFile(){
        if (!this.fileName){
            throw new Error("Nao foi informado o nome do arquivos JSON.");
            return "";
        }

        try {
            const data = await readFileJSON(this.fileName);
            return JSON.parse(data.toString());
        } catch (error) {
            throw new Error(error);
            return "";
        }
    }

    async _writeFile(records){
        if (!this.fileName){
            throw new Error("Nao foi informado o nome do arquivos JSON.");
            return "";
        }

        try {
            const stringJSON = JSON.stringify(records);
            const data = await writeFileJSON(this.fileName, stringJSON);
            return true;
        } catch (error) {
            throw new Error(error);
            return false;
        }
        
    }

    async selectItem(id){
        const items = await this._readFile();
       
        const selectedItems = items.filter(item => id ? parseInt(id) === parseInt(item.id) : true);

        return selectedItems;
    }
    
    async insertItem(item){
        const items = await this._readFile();
        
        let newItem = {
            id: Date.now(),
            ...item
        }
        items.push(newItem);

        const ok = await this._writeFile(items);

        return ok ? newItem : null;
    }
    
    async updateItem(id, item){
        const items = await this._readFile();
        
        const indexItem = items.findIndex(item => item.id == id);
        
        if (indexItem === -1){
            throw new Error(`Item ${id} not found`);
            return false;
        }

        const altItem = {
            ...items[indexItem],
            ...item
        }

        items.splice(indexItem, 1, altItem);

        const ok = await this._writeFile(items);

        return ok ? altItem : null;
    }

    async deleteItem(id){
        const items = await this._readFile();
        
        const indexItem = items.findIndex(item => item.id == id);

        if (indexItem === -1){
            throw new Error(`Item ${id} not found`);
        }

        const itemRemoved = Object.assign(items[indexItem]);

        items.splice(indexItem, 1);

        const ok = await this._writeFile(items);

        return ok ? itemRemoved : null;
    }
    
}

module.exports = {
    JSONFile
};