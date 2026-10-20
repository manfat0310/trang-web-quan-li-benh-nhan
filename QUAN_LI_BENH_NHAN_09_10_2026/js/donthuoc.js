var thuocIdTiepTheo = 0;

function themThuoc() {
    const tenThuoc = document.getElementById("tenThuoc").value.trim();
    const soLuong = Number(document.getElementById("soLuong").value);
    const giaThuoc = Number(document.getElementById("giaThuoc").value);
    const cachDung = document.getElementById("cachDung").value.trim();

    if (!tenThuoc || !Number.isInteger(soLuong) || soLuong <= 0 ||
        document.getElementById("giaThuoc").value === "" || !Number.isFinite(giaThuoc) ||
        giaThuoc < 0 || !cachDung) {
        alert("Vui lòng nhập đầy đủ thông tin thuốc, số lượng lớn hơn 0 và đơn giá không âm!");
        return;
    }

    const tbody = document.getElementById("danhSachThuoc");
    const id = String(++thuocIdTiepTheo);
    const row = document.createElement("tr");
    row.dataset.billingId = id;

    [null, tenThuoc, soLuong, new Intl.NumberFormat("vi-VN").format(giaThuoc) + "đ", cachDung].forEach(function (value) {
        const cell = document.createElement("td");
        if (value === null) {
            cell.className = "stt";
        } else {
            cell.textContent = value;
        }
        row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "✕";
    deleteButton.addEventListener("click", function () {
        xoaThuoc(deleteButton);
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    tbody.appendChild(row);

    themDichVuThuoc(id, tenThuoc, soLuong, giaThuoc);

    ["tenThuoc", "soLuong", "giaThuoc", "cachDung"].forEach(function (inputId) {
        document.getElementById(inputId).value = "";
    });

    capNhatSTT();
}

function xoaThuoc(button) {
    const row = button.closest("tr");
    const billingId = row.dataset.billingId;
    row.remove();
    capNhatSTT();
    xoaDichVuThuoc(billingId);
}

function xoaThuocTheoId(id) {
    const row = Array.from(document.querySelectorAll("#danhSachThuoc tr"))
        .find(function (item) { return item.dataset.billingId === id; });
    if (row) {
        row.remove();
        capNhatSTT();
    }
}

function capNhatSTT() {
    document.querySelectorAll("#danhSachThuoc tr").forEach(function (row, index) {
        row.querySelector(".stt").textContent = index + 1;
    });
}
