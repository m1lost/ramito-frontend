import React from 'react';

export default function Home() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2>Welcome to RAMITO Mitra Toko</h2>

        <p>
          Selamat datang di <strong>RAMITO (Mitra Toko)</strong>, platform
          digital yang membantu pengelolaan operasional toko menjadi lebih
          mudah, cepat, dan efisien.
        </p>

        <p>
          Dengan RAMITO, Anda dapat mengelola produk, kategori, metode
          pembayaran, pesanan pelanggan, serta pengguna dalam satu dashboard
          yang terintegrasi. Sistem ini dirancang untuk memberikan pengalaman
          pengelolaan toko yang modern, sederhana, dan terpercaya.
        </p>

        <h4 className="mt-4">What You Can Do</h4>
        <div className="row">
          <div className="col-md-6">
            <ul>
              <li>Manage products and inventory</li>
              <li>Organize product categories</li>
              <li>Configure payment methods</li>
            </ul>
          </div>

          <div className="col-md-6">
            <ul>
              <li>Process customer orders</li>
              <li>Track transactions efficiently</li>
              <li>Manage users and access roles securely</li>
            </ul>
          </div>
        </div>

        <h4 className="mt-4">Our Goal</h4>
        <p>
          RAMITO hadir untuk membantu mitra toko bertransformasi secara digital
          dengan tools yang praktis, efisien, dan mudah digunakan, sehingga Anda
          dapat lebih fokus pada pelayanan pelanggan dan pertumbuhan bisnis.
        </p>
      </div>
    </div>
  );
}
