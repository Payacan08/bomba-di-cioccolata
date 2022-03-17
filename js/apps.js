//API
const URLGET = "https://mindicador.cl/api"

//Clases 
class Cliente{
    constructor(){
        this.nombre;
        this.apellido;
        this.celular;
        this.entrega;
        this.direccion;
    }

    save(){
        this.nombre = $("#nombre").val();
        this.apellido = $("#apellido").val();
        this.celular = $("#numero").val();
        if ($("#radioDely1").prop("checked")) {
            this.entrega = "retiro";
        }else if($("#radioDely2").prop("checked")){
            this.entrega = "delivery";
        }
        this.direccion = $("#direccion").val();
    }

    addJSON(JSON){
        this.nombre = JSON.nombre;
        this.apellido = JSON.apellido; 
        this.celular = JSON.celular; 
        this.entrega = JSON.entrega; 
        this.direccion = JSON.direccion; 
    }

    setHtml(){
        $("#nombre").attr("value",`${this.nombre}`);
        $("#apellido").attr("value",`${this.apellido}`);
        $("#numero").attr("value",`${this.celular}`);
        if (this.entrega == "retiro") {
            $("#radioDely1").attr("checked","checked");
            $("#divDireccion").hide();
        } else if(this.entrega == "delivery") {
            $("#radioDely2").attr("checked","checked");
            $("#divDireccion").show();
        }
        $("#direccion").attr("value",`${this.direccion}`);
    }
}

class Carro{
    constructor(){
        this.carro = [];
    }

    addProducto(i){
        addProducto : {
            for (const prod of this.carro) {
                if (prod.nombre === this.add(i).nombre){
                    prod.cantidad += 1;   
                    break addProducto;
                    }
                }
            this.carro.push(this.add(i));
        }    
    }   

    add(i){
        switch (i) {
            case 1:
                return {id:1,nombre:"Individual",precio:1500,cantidad:1};
                break;
            case 2:
                return {id:2,nombre:"Doble",precio:2500,cantidad:1};
                break;
            case 3:
                return {id:3,nombre:"Pack de 4",precio:5000,cantidad:1};
                break;
            case 4:
                return {id:4,nombre:"Pack de 4 mas taza",precio:6500,cantidad:1};
                break;
        }       
    }

    addJSON(JSON){
        this.carro = JSON;
        
    }

    delProducto(i){
        addProducto : {
            for (const prod of this.carro) {                
                if (prod.nombre === this.add(i).nombre){
                    prod.cantidad -= 1;
                    if (prod.cantidad == 0){
                        this.carro.splice(this.carro.indexOf(prod),1);
                    }   
                    break addProducto;
                    }
                }
        }   
    }

    setHtml(entrega,moneda){
        let mens = ``;
        var dely = 2000;
        for (const prod of this.carro){
            mens += `<tr><td><button type="button" class="btn btn-color3" id="delBtn${prod.id}">-</button></td>
                        <td>${prod.nombre}</td>
                        <td>${Math.round((prod.precio/moneda)*100)/100}</td>
                        <td>${prod.cantidad}</td>
                        <td>${Math.round(((prod.precio*prod.cantidad)/moneda)*100)/100}</td></tr>`
        }
        if (entrega == "delivery"){
            mens+=` <tr><td></td>
                    <td>Delivery</td>
                    <td>${Math.round((dely/moneda)*100)/100}</td>
                    <td></td>
                    <td>${Math.round((dely/moneda)*100)/100}</td></tr>`
        }    
        return mens;
    }

    getTotal(entrega,moneda){
        let total = 0;
        for (const prod of this.carro){
            total += prod.precio*prod.cantidad;
        }
        if (entrega == "delivery"){
            total+= 2000;
        }
        total = Math.round(((total/moneda)*100))/100
        return total;
    }
}


//Guardar en LocalStorage y Actualizar informacion en pantalla
function actualizar() {
    localStorage.setItem('carro', JSON.stringify(carro.carro));
    localStorage.setItem('cliente',JSON.stringify(cliente));
    localStorage.setItem('moneda',`${$("#moneda").val()}`)
    $("#tBody").empty().append(carro.setHtml(cliente.entrega,moneda));
    $("#total").empty().append(carro.getTotal(cliente.entrega,moneda));
    eventDel();
}

//Event Delete
function eventDel() {
    $("#delBtn1").click(()=>{
        carro.delProducto(1);
        actualizar();
    });
    $("#delBtn2").click(()=>{
        carro.delProducto(2);
        actualizar();
    });
    $("#delBtn3").click(()=>{
        carro.delProducto(3);
        actualizar();
    });
    $("#delBtn4").click(()=>{
        carro.delProducto(4);
        actualizar();               
    });
}

//Event Add
$(document).ready(function () {
    $("#ind").click(function () {
        carro.addProducto(1);
        actualizar();    
    });
    $("#dob").click(function () {
        carro.addProducto(2);
        actualizar();
    });
    $("#pack").click(function () {
        carro.addProducto(3);
        actualizar();
    });
    $("#pack4").click(function () {
        carro.addProducto(4);
        actualizar();
    });
    $("#save").click(function(){
        cliente.save();
        actualizar();
    })
    $("#radioDely1").click(function(){
        $("#divDireccion").fadeOut("slow");
    })
    $("#radioDely2").click(function(){
        $("#divDireccion").fadeIn("slow");
    })
    $("#moneda").change(function(){
        $.get(URLGET,function(resp,estado){
            if (estado === "success"){
                let datos=resp;
                moneda = 1;
                if ($("#moneda").val()==="dolar") {
                    moneda = datos.dolar.valor;
                } else if($("#moneda").val()==="euro"){
                    moneda = datos.euro.valor;
                }
            }
            actualizar();
        })
    })
});

//inicializar
let cliente = new Cliente();
let carro = new Carro();
let moneda = 1;

if(localStorage.getItem("carro")!=null){
    let local = localStorage.getItem("carro");
    carro.addJSON(JSON.parse(local));
    if(localStorage.getItem("cliente")!=null){
        let localCliente = localStorage.getItem("cliente");
        cliente.addJSON(JSON.parse(localCliente));
        cliente.setHtml();
    }
    actualizar();
}else{
    if(localStorage.getItem("cliente")!=null){
        let localCliente = localStorage.getItem("cliente");
        cliente.addJSON(JSON.parse(localCliente));
        cliente.setHtml();
    }
};

