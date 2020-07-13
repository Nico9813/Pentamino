import * as Piezas from './PiezasActuales'

const TablaNiveles = [
    [Piezas.PiezaNaranja, Piezas.PiezaMarron, Piezas.PiezaVerdeT, Piezas.PiezaRosa, Piezas.PiezaVerde, Piezas.PiezaCeleste, Piezas.PiezaCelesteL, Piezas.PiezaVioleta],
    [Piezas.PiezaVioleta, Piezas.PiezaRosa, Piezas.PiezaAmarilla, Piezas.PiezaNaranja, Piezas.PiezaCelesteL, Piezas.PiezaMarron, Piezas.PiezaVerdeT, Piezas.PiezaVerde],
    [Piezas.PiezaNaranja, Piezas.PiezaCelesteL, Piezas.PiezaRosa, Piezas.PiezaMarron, Piezas.PiezaVioleta, Piezas.PiezaAmarilla, Piezas.PiezaCeleste, Piezas.PiezaGris],
    [Piezas.PiezaMarron, Piezas.PiezaRosa, Piezas.PiezaAmarilla, Piezas.PiezaVioleta, Piezas.PiezaCelesteL, Piezas.PiezaGris, Piezas.PiezaVerde, Piezas.PiezaVerdeT],
    [Piezas.PiezaNaranja, Piezas.PiezaVioleta, Piezas.PiezaCelesteL, Piezas.PiezaCeleste, Piezas.PiezaAmarilla, Piezas.PiezaVerdeT, Piezas.PiezaMarron, Piezas.PiezaVerde],
    [Piezas.PiezaRosa, Piezas.PiezaAmarilla, Piezas.PiezaGris, Piezas.PiezaMarron, Piezas.PiezaVerdeT, Piezas.PiezaVioleta, Piezas.PiezaNaranja, Piezas.PiezaVerde],
    [Piezas.PiezaNaranja, Piezas.PiezaCelesteL, Piezas.PiezaRosa, Piezas.PiezaCeleste, Piezas.PiezaMarron, Piezas.PiezaVerde,Piezas.PiezaVioleta, Piezas.PiezaGris]
]

var NivelesActuales = []

let piezasIniciales;

for(let i = 0; i<TablaNiveles.length;i++){
    for(let j = 3; j<TablaNiveles[0].length + 1;j++){
        piezasIniciales = []
        for(let k=0; k<j;k++){
            piezasIniciales.push(TablaNiveles[i][k])
        }
        NivelesActuales.push({
            numero: 1 + NivelesActuales.length,
            altura: j,
            piezasIniciales: piezasIniciales,
            completado: false,
            resolucion: {
                colocaciones: [],
            }
        })
    }  
}

export {NivelesActuales};

