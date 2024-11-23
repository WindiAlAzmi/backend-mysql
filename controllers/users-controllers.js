const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUsers: async (req, res) => {
    const data = await User?.findAll();
    if (data?.length <= 0) {
      return res.status(200).json({
        message: "tidak ada data user",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "data user ditemukan",
      data,
    });
  },
  getIdUser: async (req, res) => {
    const id = req.params.id;

    let dataById = await User?.findByPk(id);
    if (!dataById) {
      return res.status(404).json({
        message: "data not found",
      });
    }

    return res.status(200).json({
      message: "data ditemukan",
      data: dataById,
    });
  },
  createUser: async (req, res) => {
    try {
      const data = req.body;

      const dataAll = await User.findAll();
      let isUserThere = null;
      if (dataAll?.length > 0) {
        isUserThere = await User.findOne({
          where: { email: data.email },
        });
      }

      if (isUserThere !== null && isUserThere !== undefined) {
        return res.status(400).json({ message: "email sudah terdaftar" });
      }

      if (data?.password && data?.password?.length > 6) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
      }

      const userData = await User?.create(data);

      return res.status(201).json({
        message: "data user berhasil ditambahkan",
        data: userData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan saat membuat user",
        error: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const data = await User?.findByPk(id);
    if (!data) {
      return res.status(404).json({
        message: "data not found",
      });
    }

    const dataUserUpdate = await data.update(body);
    return res.status(200).json({
      message: "success update data user",
      data: dataUserUpdate,
    });
  },
  deleteUser: async (req, res) => {
    const id = req.params.id;
    const data = await User?.findByPk(id);
    if (!data) {
      return res.status(404).json({
        message: "data not found",
      });
    }

    await data.destroy();
    return res.status(200).json({
      message: "success delete data",
    });
  },
  deleteAllData: async (req, res) => {
    await User.destroy({
      where: {},
    });

    return res.status(200).json({
      message: "success delete all data",
    });
  },
};
