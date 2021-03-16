const matrix = {
    mapping_matrix: function mapping_matrix(origin_matrix, copying_matrixes, copying_pos_infos) {
        //copying_pos_infos : Sets of [Left, Top] Points of Copying Array
        Array.from(copying_pos_infos).forEach(function (e, i) {
            let target_arr = copying_matrixes[i];
            let [COPY_POSX, COPY_POSY] = copying_pos_infos[i];
            target_arr.forEach(function (arr_row, idx_h) {
                arr_row.forEach(function (arr_col, idx_w) {
                    origin_matrix[idx_h + COPY_POSY][idx_w + COPY_POSX] = arr_col;
                })
            })
        });
        return origin_matrix;
    },

    // think Python default function "range()".
    range: function range(initial, end, interpolation = 1) {
        let ret_arr = [];
        let reversebias = 1;
        if (end === undefined) for (let i = 0; i < inital; i++) ret_arr.push(i);
        else {
            if (interpolation == 0) interpolation = 1;
            if ((initial > end && interpolation > 0) || (initial < end && interpolation < 0)) {
                reversebias = -1;
                [initial, end] = [initial, end].reverse(); // Same as swap funcion.
            }
            if (interpolation > 0)
                for (let i = initial; i < end; i = i + interpolation)
                    ret_arr.push(i);
            else
                for (let i = initial; i > end; i = i + interpolation)
                    ret_arr.push(i);
            if (reversebias < 0) ret_arr.reverse();
        }
        return ret_arr;
    },

    // copied function from https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    transpose: function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    },
    fill: function fill(origin_matrix, fill_value , fill_repropagation = true){
        if(Array.isArray(origin_matrix)){
            return Array.from(origin_matrix).map(e=> fill_repropagation && Array.isArray(e) ? fill(e,fill_value, fill_repropagation):fill_value);
        }
    }
}

export {matrix};