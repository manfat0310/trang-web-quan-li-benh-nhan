// 1. MẢNG DỮ LIỆU BAN ĐẦU
let danhSach = [
    {
        ma: "BA-1001",
        cccd: "001201012345",
        ten: "Nguyễn Văn An",
        ngaySinh: "1995-04-12",
        que: "Hà Nội",
        sdt: "0988111222",
        benh: "Viêm họng hạt cấp tính",
        thuoc: [
            { maT: "TH01", tenT: "Paracetamol 500mg", sl: "10", dung: "Uống sau ăn" },
            { maT: "TH02", tenT: "Amoxicillin 500mg", sl: "14", dung: "Ngày 2 viên" }
        ]
    }
];

let thuocHienTai = [];

document.getElementById("search-patient").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        let tuKhoa = this.value.trim().toLowerCase();

        let timThay = null;
        for (let i = 0; i < danhSach.length; i++) {
            if (danhSach[i].ma.toLowerCase() === tuKhoa || danhSach[i].cccd === tuKhoa) {
                timThay = danhSach[i];
                break;
            }
        }

        if (timThay) {
            document.getElementById("p-name").value = timThay.ten;
            document.getElementById("p-dob").value = timThay.ngaySinh;
            document.getElementById("p-hometown").value = timThay.que;
            document.getElementById("p-cccd").value = timThay.cccd;
            document.getElementById("p-phone").value = timThay.sdt;
            document.getElementById("p-code").value = timThay.ma;
            document.getElementById("p-condition").value = timThay.benh;
            thuocHienTai = timThay.thuoc;
            veBangThuoc();
            this.value = "";
        } else {
            alert("Không tìm thấy hồ sơ!");
        }
    }
});

function veBangThuoc() {
    let tbody = document.getElementById("danhSachThuoc");
    tbody.innerHTML = ""; 

    for (let i = 0; i < thuocHienTai.length; i++) {
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${thuocHienTai[i].maT}</td>
                <td>${thuocHienTai[i].tenT}</td>
                <td>${thuocHienTai[i].sl}</td>
                <td>${thuocHienTai[i].dung}</td>
                <td><button type="button" class="btn-delete" onclick="xoaThuoc(${i})">✕</button></td>
            </tr>
        `;
    }
}


function themThuoc() {
    let maT = document.getElementById("maThuoc").value.trim();
    let tenT = document.getElementById("tenThuoc").value.trim();
    let sl = document.getElementById("soLuong").value.trim();
    let dung = document.getElementById("cachDung").value.trim();

    if (!maT || !tenT || !sl || !dung) {
        alert("Vui lòng điền đủ thông tin!");
        return;
    }


    thuocHienTai.push({ maT, tenT, sl, dung });
    veBangThuoc();


    document.getElementById("maThuoc").value = "";
    document.getElementById("tenThuoc").value = "";
    document.getElementById("soLuong").value = "";
    document.getElementById("cachDung").value = "";
}


function xoaThuoc(index) {
    thuocHienTai.splice(index, 1);
    veBangThuoc();
}