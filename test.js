// let variabel = 5

// for (let i = 0; i < variabel; i++) {
//     let row = "";
//     for (let j = 0; j < i; j++) {
//         // console.log(j);

//         row += "*";    
//     }
//     console.log(row);
// }

// linear search
// function linearSearch(arr, target) {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] === target) {
//             console.log(i);

//             return i; // Mengembalikan indeks jika elemen ditemukan
//         }
//     }   
//     return -1; // Mengembalikan -1 jika elemen tidak ditemukan
// }

// // Contoh penggunaan
// const arr = [3, 7, 1, 9, 4, 5];
// const target = 9;
// const result = linearSearch(arr, target);

// if (result !== -1) {
//     console.log(`Elemen ditemukan pada indeks ${result}`);
// } else {
//     console.log("Elemen tidak ditemukan dalam daftar");
// }


// let n = 15;
// for (let i = 0; i < n; i++) {
//     if (i % 3 === 0 && i % 5 === 0) {
//         console.log("FizzBuzz");
//     }
//     else if (i % 3 === 0) {
//         console.log("Buzz");
//     } else if (i % 5 === 0) {
//         console.log("Fizz");
//     }
//     else {
//         console.log(i);
//     }


// }

// let height = 5; // Tinggi segitiga

// for (let i = 0; i < height; i++) { // Loop untuk setiap baris
//     let row = "";
//     for (let j = 0; j <= i; j++) { // Loop untuk setiap bintang dalam baris
//         row += "*";
//     }
//     console.log(row); // Cetak baris
// }


// let height = 3; // Tinggi segitiga

// for (let i = height; i > 0; i--) { // Loop untuk setiap baris, mulai dari tinggi hingga 1
//     let row = "";
//     // Tambahkan spasi untuk indentasi
//     for (let k = 0; k < height - i; k++) {
//         row += " ";
//     }
//     // Tambahkan bintang sesuai jumlah baris
//     for (let j = 0; j < i; j++) {
//         row += "*";
//     }
//     console.log(row); // Cetak baris
// }





//segitiga terbalik
// let height = 2;

// for (let i = height; i > 0; i--) { 
//     let row = "";
//     for (let j = 0; j < i; j++) {
//         row += "*";
//     }
//     console.log(row); 
// }


// function buatSegitigaBintang(tinggi) {
//     for (let i = 1; i <= tinggi; i++) {
//         let baris = '';
//         for (let j = 1; j <= tinggi - i; j++) {
//             baris += ' ';

//         }

//         for (let k = 1; k <= 2 * i - 1; k++) {
//             baris += '*';
//         }

//         console.log(baris);
//     }
// }

// buatSegitigaBintang(2);

function balikString(kata) {
    let balik = kata.split("")

    let dibaliks = balik.reverse()

    let digabung = dibaliks.join("")
    return digabung
}


console.log(balikString("DIMAS ANJAY MABAR"));



