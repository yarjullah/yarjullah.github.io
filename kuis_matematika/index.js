<!--  -->
//Waktu yang ditempuh
var waktu       = 60;
var waktu_habis = 0;
var mulai       = 0;

function hitung_mundur() {
  if (waktu > 0) {
    document.math.waktunya.value = waktu;
    waktu--;
    var gameTimer=  setTimeout("hitung_mundur()", 1000)
    //mengurangi variabel 'waktu' tiap 1 detik (1000ms)
  }
  else if (waktu==0){
    document.math.waktunya.value = "0";
    waktu_habis = 1;
    alert('Waktu Habis!');
    if (jawaban_user[indeks] == undefined) {
      jawaban_user[indeks] = 'Kosong';
    }
    document.math.angka1.value   = '';
    document.math.operator.value = '';
    document.math.angka2.value   = '';
    document.math.answer.value   = '';
    evaluasi();
  }
}

function startgame() {
  document.math.answer.select();
  if (mulai != 0) {
    alert('\t\t\tKamu sudah mulai \nKlik "Permainan Baru" untuk mengulang permainan');
  }
  else{mulai=1; hitung_mundur(); buatSoal();}
}

function acakAngka(min, max) {
  var num = Math.round(Math.random() * (max - min)) + min;
  return num;
}

var operator, indeks = 0, temp, op_soal, angka1, angka2;
var soal = [], yang_benar = [], jawaban_user = [];

function operatorPilihan() {

}

function buatSoal(){
  if (dipilih==1){operator=acakAngka(1,4);}
  else if (dipilih==2) {operator=1;}
  else if (dipilih==3) {operator=2;}
  else if (dipilih==4) {operator=3;}
  else if (dipilih==5) {operator=4;}
  else {operator=acakAngka(1,4);}

  if (operator=="1"){
    document.math.operator.value  = "+";
    angka1 = acakAngka(0,50);
    angka2 = acakAngka(0,50);
    document.math.angka1.value = angka1;
    document.math.angka2.value = angka2;
    yang_benar[indeks] =  angka1 + angka2;
    simpan();
  }
  if (operator == '2') {
    document.math.operator.value = "-";
    angka2 = acakAngka(0,50);
    angka1 = acakAngka(angka2,50);
    document.math.angka1.value = angka1;
    document.math.angka2.value = angka2;
    yang_benar[indeks] = angka1 - angka2;
    simpan();
  }
  if (operator=="3"){
    document.math.operator.value  = "×";
    angka1 = acakAngka(0,10);
    angka2 = acakAngka(0,10);
    document.math.angka1.value  = angka1;
    document.math.angka2.value = angka2;
    yang_benar[indeks] = angka1 * angka2;
    simpan();
  }
  if (operator=="4"){
    document.math.operator.value="/";
    angka2 = acakAngka(1,10);
    angka1 = angka2 * acakAngka(0,10);
    document.math.angka1.value = angka1;
    document.math.angka2.value = angka2;
    yang_benar[indeks] = angka1 /  angka2;
    simpan();
  }
}

function simpan(){
  switch (operator){
    case 1: op_soal = " + ";       break;
    case 2: op_soal = " - ";       break;
    case 3: op_soal = " &times; "; break;
    case 4: op_soal = " / ";       break;
  }
  soal[indeks] = angka1 + op_soal + angka2 + " = ";
  temp = yang_benar[indeks];
  indeks++;
}

var poin_benar  = eval(document.math.points.value);
var poin_salah  = eval(document.math.wrongs.value);

function answerit(){
  if (mulai==0){
    alert('Klik Tombol \'Mulai\' untuk mulai menjawab!');}
  else{
    if (waktu_habis!=0){
      alert('Waktu Habis, Silahkan Memulai Permainan Baru');}
    else{
      var jawaban = eval(document.math.answer.value);
      if (jawaban == null){
        alert('Jawaban Belum diisi');
        document.math.answer.select();}
      else{
        if (jawaban == temp){
          // alert('Benar');
          poin_benar++;
          document.math.points.value=poin_benar;
        }
        else{
          poin_salah++;
          document.math.wrongs.value = poin_salah;
          // alert(jawaban + " salah!\n\n"+ "Yang benar adalah "+ temp)
        }
        document.math.answer.select();
        jawaban_user[indeks] = document.math.answer.value;
        document.math.answer.value = "";
        buatSoal();
      }
    }
  }
}

var terklik = 0;
var x = 1;

function evaluasi(){
  if (mulai==0 && waktu_habis==0) {alert('Permainan Belum Dimulai')}
  else if (mulai==1 && waktu_habis==0) {alert('Permainan Sedang Berlangsung')}
  else if (mulai==1 && waktu_habis==1){
    document.getElementById("papan_skor").style.display = "";
    if(terklik==0){
      //Menampilkan tabel papan_skor
      for (var i = 0; i < soal.length; i++) {
        var table = document.getElementById("papan_skor");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = (i+1)+".";
        cell2.innerHTML = soal[i] + " " + yang_benar[i];
        cell3.innerHTML = jawaban_user[i+1];
        if (yang_benar[i] == jawaban_user [i+1]){ cell3.style.color = 'lime'}
        else {cell3.style.color = 'red'}
      }
    }
    terklik = 1; //untuk mencegah tabelnya bertambah lagi di bawahnya
    self.location.href = '#eval';
  }
};

function ulang(){
  location.reload(false);
  mulai = 0;
  poin_benar = 0; poin_salah = 0;
  document.math.points.value = poin_benar;
  document.math.wrongs.value = poin_salah;
}

var p1 = document.getElementById('pilih1');
var p2 = document.getElementById('pilih2');
var p3 = document.getElementById('pilih3');
var p4 = document.getElementById('pilih4');
var p5 = document.getElementById('pilih5');

var selectedOption, dipilih;

function memilih() {
  terpilih = document.querySelector('input[type=radio]:checked');
  dipilih = terpilih.value;

  if (dipilih==1) {
    p1.style.backgroundColor = "#55ACEE";
    p2.style.backgroundColor = "transparent";
    p3.style.backgroundColor = "transparent";
    p4.style.backgroundColor = "transparent";
    p5.style.backgroundColor = "transparent";
	} else if (dipilih==2) {
    p1.style.backgroundColor = "transparent";
    p2.style.backgroundColor = "#55ACEE";
    p3.style.backgroundColor = "transparent";
    p4.style.backgroundColor = "transparent";
    p5.style.backgroundColor = "transparent";
	} else if (dipilih==3) {
    p1.style.backgroundColor = "transparent";
    p2.style.backgroundColor = "transparent";
    p3.style.backgroundColor = "#55ACEE";
    p4.style.backgroundColor = "transparent";
    p5.style.backgroundColor = "transparent";
	} else if (dipilih==4) {
    p1.style.backgroundColor = "transparent";
    p2.style.backgroundColor = "transparent";
    p3.style.backgroundColor = "transparent";
    p4.style.backgroundColor = "#55ACEE";
    p5.style.backgroundColor = "transparent";
	} else {
    p1.style.backgroundColor = "transparent";
    p2.style.backgroundColor = "transparent";
    p3.style.backgroundColor = "transparent";
    p4.style.backgroundColor = "transparent";
    p5.style.backgroundColor = "#55ACEE";
	}

}
