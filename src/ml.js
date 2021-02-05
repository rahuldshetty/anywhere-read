import * as tf from '@tensorflow/tfjs';

const token_map = {"$": 0, " ": 1, "a": 2, "b": 3, "c": 4, "d": 5, "e": 6, "f": 7, "g": 8, "h": 9, "i": 10, "j": 11, "k": 12, "l": 13, "m": 14, "n": 15, "o": 16, "p": 17, "q": 18, "r": 19, "s": 20, "t": 21, "u": 22, "v": 23, "w": 24, "x": 25, "y": 26, "z": 27}
const label_map = {"0": "Cooking", "1": "Entertainment", "2": "Tech", "3": "Business", "4": "Lifestyle", "5": "Literature", "6": "Fiction"}
const MAX_LEN = 50;
const shape = [1, 50];

export function fetch_class(model, text){
    text = text.toLowerCase()
    text = text.substr(0, MAX_LEN);
    let arr = []
    for(var i=0;i<text.length;i++){
        if(text.charAt(i).match("[a-z ]"))
        {
            arr.push(token_map[text.charAt(i)]);
        }
    }
    for(var i=arr.length;i<50;i++)
        arr.push(0)

    tf.engine().startScope()
    let tensor_pred = model.predict(tf.tensor2d(arr, shape)).argMax(1).dataSync();
    tf.engine().endScope()
    return label_map[tensor_pred];
}