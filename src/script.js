let wishlist = [];

document.addEventListener("DOMContentLoaded", () => {
  const tombol = document.getElementById("tambahBtn");
  tombol.addEventListener("click", tambahWishlist);

  const dataTersimpan = localStorage.getItem("wishlist");
  if (dataTersimpan) {
    wishlist = JSON.parse(dataTersimpan);
  }

  tampilkanWishlist();
});

function simpanKeLocalStorage() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function tambahWishlist() {
  const input = document.getElementById('inputWishlist');
  const itemNama = input.value.trim();

  if (itemNama === '') {
    alert('Masukkan sesuatu dulu!');
    return;
  }

  wishlist.push({ nama: itemNama, tercapai: false });
  input.value = '';
  simpanKeLocalStorage();
  tampilkanWishlist();
}

function editWishlist(index) {
  const namaBaru = prompt("Edit nama wishlist:", wishlist[index].nama);
  if (namaBaru !== null && namaBaru.trim() !== '') {
    wishlist[index].nama = namaBaru.trim();
    simpanKeLocalStorage();
    tampilkanWishlist();
  }
}

function toggleTercapai(index) {
  wishlist[index].tercapai = !wishlist[index].tercapai;
  simpanKeLocalStorage();
  tampilkanWishlist();
}

function hapusWishlist(index) {
  const yakin = confirm(`Yakin ingin menghapus "${wishlist[index].nama}"?`);
  if (yakin) {
    wishlist.splice(index, 1);
    simpanKeLocalStorage();
    tampilkanWishlist();
  }
}

function tampilkanWishlist() {
  const daftar = document.getElementById('daftarWishlist');
  daftar.innerHTML = '';

  wishlist.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-2 rounded transition';

    const label = document.createElement('span');
    label.textContent = item.nama;
    label.className = item.tercapai
      ? 'line-through text-green-400 font-medium'
      : 'font-medium text-white';

    const tombol = document.createElement('div');
    tombol.className = 'flex gap-2 flex-wrap';

    const btnTercapai = document.createElement('button');
    btnTercapai.textContent = item.tercapai ? '✅ Sudah Tercapai' : '❌ Belum Tercapai';
    btnTercapai.className = item.tercapai
      ? 'text-sm px-2 py-1 bg-green-200 text-green-800 rounded hover:bg-green-300'
      : 'text-sm px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-500';
    btnTercapai.onclick = () => toggleTercapai(index);

    const btnEdit = document.createElement('button');
    btnEdit.textContent = '✏️ Edit';
    btnEdit.className = 'text-sm px-2 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300';
    btnEdit.onclick = () => editWishlist(index);

    const btnHapus = document.createElement('button');
    btnHapus.textContent = '🗑️ Hapus';
    btnHapus.className = 'text-sm px-2 py-1 bg-red-200 text-red-800 rounded hover:bg-red-300';
    btnHapus.onclick = () => hapusWishlist(index);

    tombol.appendChild(btnTercapai);
    tombol.appendChild(btnEdit);
    tombol.appendChild(btnHapus);

    li.appendChild(label);
    li.appendChild(tombol);
    daftar.appendChild(li);
  });

  const namaList = wishlist.map(w => w.nama);
  const [pertama, ...sisanya] = namaList;
  document.getElementById('hasilDestructuring').textContent =
    `Pertama: ${pertama || '-'}, Sisanya: ${sisanya.join(', ') || '-'}`;

  const total = [...wishlist].length;
  document.getElementById('totalWishlist').textContent = `${total} item (total wishlist)`;
}