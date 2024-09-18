import Mtrx from 'mtrx';
import create from 'mtrx/src/create.js';

function split(matrix) {
    const n = matrix.length;
    const half = Math.floor(n / 2);
    const A = create((i, j) => matrix[i][j])(half);
    const B = create((i, j) => matrix[i][j + half])(half);
    const C = create((i, j) => matrix[i + half][j])(half);
    const D = create((i, j) => matrix[i + half][j + half])(half);
    return [A, B, C, D];
}

function join(A, B, C, D) {
    const n = A.length;
    const result = create(() => 0)(n * 2);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result[i][j] = A[i][j];
            result[i][j + n] = B[i][j];
            result[i + n][j] = C[i][j];
            result[i + n][j + n] = D[i][j];
        }
    }
    return result;
}

function padMatrix(matrix, size) {
    const paddedMatrix = create(() => 0)(size);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            paddedMatrix[i][j] = matrix[i][j];
        }
    }
    return paddedMatrix;
}

export const fast_mul = (matrixA, matrixB) => {
    if (matrixA[0].length !== matrixB.length) {
        throw TypeError(matrix + ' can\'t right multiply ' + another)
    }
    const n = Math.max(matrixA.length, matrixA[0].length, matrixB.length, matrixB[0].length);
    const size = Math.pow(2, Math.ceil(Math.log2(n))); 

    const paddedA = padMatrix(matrixA, size);
    const paddedB = padMatrix(matrixB, size);

    const result = fast_mul_calc(paddedA, paddedB);

    return result.slice(0, matrixA.length).map(row => row.slice(0, matrixB[0].length));
}


const fast_mul_calc = (matrixA, matrixB) => {
    const n = matrixA.length;
    if (n === 1) {
        return [[matrixA[0][0] * matrixB[0][0]]];
    }

    const [A, B, C, D] = split(matrixA);
    const [E, F, G, H] = split(matrixB);
    const P1 = fast_mul(A, Mtrx.sub(F, H));
    const P2 = fast_mul(Mtrx.add(A, B), H);
    const P3 = fast_mul(Mtrx.add(C, D), E); 
    const P4 = fast_mul(D, Mtrx.sub(G, E)); 
    const P5 = fast_mul(Mtrx.add(A, D), Mtrx.add(E, H));
    const P6 = fast_mul(Mtrx.sub(B, D), Mtrx.add(G, H));
    const P7 = fast_mul(Mtrx.sub(A, C), Mtrx.add(E, F));

    const topLeft = Mtrx.add(Mtrx.sub(Mtrx.add(P5, P4), P2), P6);
    const topRight = Mtrx.add(P1, P2); 
    const bottomLeft = Mtrx.add(P3, P4); 
    const bottomRight = Mtrx.sub(Mtrx.sub(Mtrx.add(P1, P5), P3), P7);

    return join(topLeft, topRight, bottomLeft, bottomRight);
}

export default fast_mul