const fs = require('fs')

class contenedor{

    constructor(archivo){
        this.archivo = archivo;

    }
    async save(objeto){
        const data = await fs.promises.readFile(`${this.archivo}/producto.json`, "utf8");
        const producto = JSON.parse(data);
        const id = producto.length +1;
        objeto.id = id;
        producto.push(objeto);
        console.log(objeto.id);
        const productoString = JSON.stringify(producto);
        await fs.promises.writeFile(`${this.archivo}/producto.json`, productoString);
        

    }
    async getById(id){
        const data = await fs.promises.readFile(`${this.archivo}/producto.json`, 'utf8');
        const productos = JSON.parse(data);
        const producto = productos.find((producto) => producto.id === id);
        if (producto) {
            return producto;
        }else{
            return null;
        }

    }
    async getAll(){
        const data = await fs.promises.readFile(`${this.archivo}/producto.json`, 'utf8');
        return JSON.parse(data);
    }
    async deleteById(id){
        const data = await fs.promises.readFile(`${this.archivo}/producto.json`, 'utf8');
        const productos = JSON.parse(data);
        const producto = productos.find((producto) => producto.id === id);
        let index = productos.indexOf(producto);
        productos.splice(index, 1);
        const productoString = JSON.stringify(productos);
        await fs.promises.writeFile(`${this.archivo}/producto.json`, productoString);

    }
    async deleteAll(){
        const productos = [];
        const productoString = JSON.stringify(productos);
        await fs.promises.writeFile(`${this.archivo}/producto.json`, productoString);
    }
}

    module.exports =contenedor;