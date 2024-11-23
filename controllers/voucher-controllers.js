const { Voucher, Brand } = require("../models");

module.exports = {
  getAllVoucher: async (req, res) => {
    try {
      const data = await Voucher.findAll({
        include: {
          model: Brand,
          as: "dataBrand",
        },
      });

      if (data?.length <= 0) {
        return res.status(200).json({
          message: "Tidak ada data Voucher",
        });
      }

      return res.status(200).json({
        message: "Data berhasil ditemukan",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  getAllVoucherByBrand: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Voucher.findAll({
        where: {
          brandId: id,
        },
      });

      if (data?.length <= 0) {
        return res.status(200).json({
          message: "Tidak ada data Voucher dari brand itu",
        });
      }

      return res.status(200).json({
        message: "Data berhasil ditemukan",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  getVoucherById: async (req, res) => {
    try {
      const id = req.params.id;

      let dataById = await Voucher.findByPk(id, {
        include: {
          model: Brand,
          as: "dataBrand",
        },
      });
      if (!dataById) {
        return res.status(404).json({
          message: "data not found",
        });
      }

      return res.status(200).json({
        message: "data berhasil ditemukkan",
        data: dataById,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  addVoucher: async (req, res) => {
    try {
      const data = req.body;

      const brand = await Brand.findByPk(data?.brandId);

      if (!brand) {
        return res.status(404).json({
          message: `Brand dgn id ${data?.brandId} tidak ada`,
        });
      }

      const newData = await Voucher.create(data);
      return res.status(201).json({
        message: "Data berhasil ditambahkan",
        data: newData,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  editVoucherById: async (req, res) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const data = await Voucher.findByPk(id);
      if (!data) {
        return res.status(404).json({
          message: "data not found",
        });
      }

      const dataVoucherUpdate = await data.update(body);

      return res.status(200).json({
        message: "Data berhasil diubah",
        data: dataVoucherUpdate,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  deletedVoucherById: async (req, res) => {
    try {
      const id = req.params.id;

      const data = await Voucher.findByPk(id);

      if (!data) {
        return res.status(404).json({
          message: "data not found",
        });
      }

      await data.destroy();
      return res.status(200).json({
        message: "Data berhasil dihapus",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  deletedAllVoucher: async (req, res) => {
    try {
      await Voucher.destroy({
        where: {},
      });

      return res.status(200).json({
        message: "Semua data berhasil dihapus",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
};
