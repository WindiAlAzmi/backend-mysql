const { Brand } = require("../models");

module.exports = {
  getAllBrand: async (req, res) => {
    try {
      const data = await Brand.findAll();

      if (data?.length <= 0) {
        return res.status(200).json({
          message: "Tidak ada data brand",
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
  getBrandById: async (req, res) => {
    try {
      const id = req.params.id;

      let dataById = await Brand.findByPk(id);
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
  addBrand: async (req, res) => {
    try {
      const data = req.body;
      const brandData = await Brand.create(data);

      return res.status(201).json({
        message: "Data berhasil ditambahkan",
        data: brandData,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  editBrandById: async (req, res) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const data = await Brand.findByPk(id);
      if (!data) {
        return res.status(404).json({
          message: "data not found",
        });
      }

      const dataBrandUpdate = await data.update(body);

      return res.status(200).json({
        message: "Data berhasil diubah",
        data: dataBrandUpdate,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  deletedBrandById: async (req, res) => {
    try {
      const id = req.params.id;

      const data = await Brand.findByPk(id);

      if (!data) {
        return res.status(404).json({
          message: "data not found",
        });
      }

      await data.destroy();
      return res.status(200).json({
        message: "success delete data",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  deletedAllBrand: async (req, res) => {
    try {
      await Brand.destroy({
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
