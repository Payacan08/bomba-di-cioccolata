class Venta{
    constructor(nombre,apellido,direccion){
        this.cliente = new Cliente(nombre,apellido,direccion);
        this.producto = [];
        this.entrega;
        //this.id = [];
    }
    
    setProducto(nombre,cantidad){
        let prod = new Productos();
        switch (nombre) {
            case "ind":
                prod.individual(cantidad);
                this.producto.push(prod);
                break;
            case "dob":
                prod.doble(cantidad)
                this.producto.push(prod);
                break;
            case "pack":
                prod.pack4(cantidad)
                this.producto.push(prod);
                break;
            case "packtaza":
                prod.pack4Taza(cantidad)
                this.producto.push(prod);
                break;    
        }
    }

    setRetiro(){
        this.entrega="Retiro";
    }
    
    setDelivery(){
        this.entrega="Delivery";
    }

    getTotal(){
        let total=0;
        for (let i = 0; i < this.producto.length; i++) {
            total += this.producto[i].precio*this.producto[i].cantidad;            
        }
        return total;
    }

    getLastProducto(){
        var i = this.producto.length;
        var element = this.producto[i-1];
        let mensaje=`<td><button class="btn btn-color1 btn-sm active text-color2" id="del${i-1}">X</button></td><td>${element.nombre}</td><td>${element.precio}</td><td>${element.cantidad}</td><td>${element.precio*element.cantidad}</td>`;
        return mensaje;
    }

    getLastProductoID(){
        var i = this.producto.length-1;
        this.id.push(`b${i}`);
        return i;
    }

}

class Cliente{
    constructor(nombre,apellido,direccion){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
    }
}

class Productos{
    constructor(){
        this.nombre;
        this.precio;
        this.cantidad;
    }

    individual(cantidad){
        this.nombre = "Individual";
        this.precio = 1500;
        this.cantidad = cantidad;
    }

    doble(cantidad){
        this.nombre = "Doble";
        this.precio = 2500;
        this.cantidad = cantidad;
    }

    pack4(cantidad){
        this.nombre = "Pack de 4";
        this.precio = 5000;
        this.cantidad = cantidad;
    }

    pack4Taza(cantidad){
        this.nombre = "Pack de 4 mas taza";
        this.precio = 6500;
        this.cantidad = cantidad; 
    }

}

function delProducto(i) {   
    usuario.id[i] = document.getElementById(`del${i}`);
    usuario.id[i].innerHTML = "hola";
    usuario.id[i].addEventListener("click",()=>{
        listaFila[i].remove();
    });    
}

function addProducto(){
    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;
    let total = document.getElementById("total");
    usuario.setProducto(producto,cantidad);
    let addProd = document.createElement("tr");
    addProd.innerHTML = usuario.getLastProducto();
    tBody.appendChild(addProd);
    total.innerHTML = `${usuario.getTotal()}`;
    //delProducto(usuario.getLastProductoID());
}

let usuario= new Venta("cliente","cliente","direccion");
let botonAgregar = document.getElementById("agregar");
let tBody = document.getElementById("tBody");
const listaFila = tBody.getElementsByTagName("tr"); 
botonAgregar.addEventListener("click",addProducto);
