export default class Matriz{
    dimensiones;
    matriz;
    dimensiones_reales;

    constructor(n,m){
        this.dimensiones = {
            n: n,
            m: m
        }
        this.dimensiones_reales = {
            n: n,
            m: m
        }
        this.matriz = this.crear_matriz(this.dimensiones.n, this.dimensiones.m);
    }

    crear_matriz(n , m){
        let matriz_nueva = new Array(n);

        for (var i = 0; i < n; i++) {
            matriz_nueva[i] = new Array(m);
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                matriz_nueva[i][j] = 0;
            }
        }

        return matriz_nueva;
    }

    obtener_posicion_valida_mas_cercana(x,y){
        
    }

    estaCompleta(){
        respuesta = true;

        for (let i = 0; i < this.dimensiones.n; i++) {
            for (let j = 0; j < this.dimensiones.m; j++) {
                respuesta = respuesta && (this.matriz[i][j] != 0);
            }
        }

        return respuesta;
    }

    instanciar_inhabilitados(n,m){

        this.dimensiones_reales = {
            n: n,
            m: m
        }

        for (let i = 0; i < this.dimensiones.n; i++) {
            for (let j = 0; j < this.dimensiones.m; j++) {
                this.matriz[i][j] = (i<n || j<m) ? -1 : this.matriz[i][j];
            }
        }
    }

    instanciar(matriz_inicial){
        for (let i = 0; i < this.dimensiones.n; i++) {
            for (let j = 0; j < this.dimensiones.m; j++) {
                this.matriz[i][j] = matriz_inicial[i][j];
            }
        }
    }

    remplazar_valor(valor_buscado, nuevo_valor) {
        for (let i = 0; i < this.dimensiones.n; i++) {
            for (let j = 0; j < this.dimensiones.m; j++) {
                this.matriz[i][j] = this.matriz[i][j] == valor_buscado ? nuevo_valor : this.matriz[i][j];
            }
        }
    }

    mostrar(){
        var formateada = new String();
        formateada += "matriz actual: \n";

        for (let i = 0; i < this.dimensiones.n; i++) {
            for (let j = 0; j < this.dimensiones.m; j++) {
                formateada += this.matriz[i][j];
            }
            formateada+='\n';
        }

        console.log(formateada);
    }

    modificar(x, y, valor){
        if(x < this.dimensiones && y < this.dimensiones)
            this.matriz[x][y] = valor;
    }

    rotar_90_derecha(cantidad_de_rotaciones){

        let matriz_rotada = this.crear_matriz(this.dimensiones.n);

        for (let rotacion = 0; rotacion < cantidad_de_rotaciones; rotacion++) {
            for(let i = 0; i < this.dimensiones.n; i++){
                for (let j = 0; j < this.dimensiones.m; j++) {
                    matriz_rotada[this.dimensiones.n - j - 1][i] = this.matriz[i][j];
                }
            }
        }

        this.matriz = matriz_rotada;

        return matriz_rotada;
    }

    espejar() {
        let matriz_espejada = new Matriz(this.dimensiones.n, this.dimensiones.m);

        matriz_espejada.instanciar(this.matriz);
        
        for (let i = 0; i < this.dimensiones.n; i++) {
            for (let j = 0; j < this.dimensiones.m; j++) {
                matriz_espejada.matriz[i][this.dimensiones.m - 1 - j] = this.matriz[i][j]
            }
        }

        this.matriz = matriz_espejada.matriz;

        return matriz_espejada.matriz;
    }

    puede_combinar(matriz_nueva, x, y, y_matriz, x_matriz){
        let respuesta = true;

        let i_inicial = Math.max(x - x_matriz, 0);
        let i_final = Math.min(i_inicial + matriz_nueva.dimensiones.n, this.dimensiones.n);
        let i_inicial_nueva = 0 - Math.min(x - x_matriz, 0);
        let i_final_nueva = Math.min(matriz_nueva.dimensiones.n, this.dimensiones.n - i_inicial);

        let j_inicial = Math.max(y - y_matriz, 0);
        let j_final = Math.min(j_inicial + matriz_nueva.dimensiones.m, this.dimensiones.m);
        let j_inicial_nueva = 0 - Math.min(y - y_matriz, 0);
        let j_final_nueva = Math.min(matriz_nueva.dimensiones.m, this.dimensiones.m - j_inicial);

        //console.log("recorrido tablero: x:[" + i_inicial + ", " + i_final + '] y:[' + j_inicial + ", " + j_final + "]")
        //console.log("recorrido pieza: x:[" + i_inicial_nueva + ", " + i_final_nueva + '] y:[' + j_inicial_nueva + ", " + j_final_nueva + "]")

        let i_actual_nueva = i_inicial_nueva;
        let j_actual_nueva = j_inicial_nueva;

        let vacia = true;

        for (let i = i_inicial; i < i_final && i_actual_nueva < i_final_nueva; i++) {
            j_actual_nueva = j_inicial_nueva;
            for (let j = j_inicial; j < j_final && j_actual_nueva < j_final_nueva; j++) {
                respuesta = respuesta && ((matriz_nueva.matriz[i_actual_nueva][j_actual_nueva] != 0) ? this.matriz[i][j] == 0 : true)
                vacia = vacia && (matriz_nueva.matriz[i_actual_nueva][j_actual_nueva] == 0)
                j_actual_nueva++;
            }
            i_actual_nueva++;
        }

        return respuesta && !vacia;
    }

    superponer(matriz_nueva, x, y, y_matriz, x_matriz){
        let i_inicial = Math.max(x - x_matriz, 0);
        let i_final = Math.min(i_inicial + matriz_nueva.dimensiones.n, this.dimensiones.n);
        let i_inicial_nueva = 0 - Math.min(x - x_matriz, 0);
        let i_final_nueva = Math.min(matriz_nueva.dimensiones.n, this.dimensiones.n - i_inicial);

        let j_inicial = Math.max(y - y_matriz, 0);
        let j_final = Math.min(j_inicial + matriz_nueva.dimensiones.m, this.dimensiones.m);
        let j_inicial_nueva = 0 - Math.min(y - y_matriz, 0);
        let j_final_nueva = Math.min(matriz_nueva.dimensiones.m, this.dimensiones.m - j_inicial);

        //console.log("recorrido tablero: x:[" + i_inicial + ", " + i_final + '] y:[' + j_inicial + ", " + j_final + "]")
        //console.log("recorrido pieza: x:[" + i_inicial_nueva + ", " + i_final_nueva + '] y:[' + j_inicial_nueva + ", " + j_final_nueva + "]")

        let i_actual_nueva = i_inicial_nueva;
        let j_actual_nueva = j_inicial_nueva;

        for (let i = i_inicial; i < i_final && i_actual_nueva < i_final_nueva; i++) {
            j_actual_nueva = j_inicial_nueva;
            for (let j = j_inicial; j < j_final && j_actual_nueva < j_final_nueva; j++) {
                this.matriz[i][j] = (this.matriz[i][j] != 0) ? this.matriz[i][j] : matriz_nueva.matriz[i_actual_nueva][j_actual_nueva];
                j_actual_nueva++;
            }
            i_actual_nueva++;
        }
    }
}