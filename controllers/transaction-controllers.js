const { Transaction, User, Voucher } = require("../models");

module.exports = {
  getAllTransaction: async (req, res) => {
    try {
      const data = await Transaction.findAll({});

      if (data.length <= 0) {
        return res.status(200).json({
          message: "Tidak ada data transaksi",
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
  getTransactionById: async (req, res) => {
    try {
      const id = req.params.id;

      let dataById = await Transaction?.findByPk(id, {
        where: {
          id: id,
        },
        include: [
          {
            model: Voucher,
            as: "vouchers",
            through: {
              attributes: [],
            },
          },
        ],
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
  addTransaction: async (req, res) => {
    try {
      const data = req.body;

      const isUser = await User.findOne({
        where: { id: data.userId },
      });
      if (isUser === null) {
        return res.status(403).json({
          message: "tidak ada data user di db, silahkan buat dlu!",
        });
      }

      //check if there are vouchers in db ?
      let dataVouchers = [];
      if (data?.vouchers?.length !== 0) {
        for (const item of data?.vouchers) {
          const isVoucher = await Voucher.findOne({
            where: {
              id: item,
            },
          });

          if (isVoucher === null) {
            return res.status(403).json({
              message: "tidak ada data voucher" + " " + item,
            });
          }

          dataVouchers.push(isVoucher);
        }
      }

      let totalCostInPoint = 0;
      const getPointsFromVoucher = dataVouchers
        ?.map((item) => parseInt(item.costInPoints.replace(/,/g, "")))
        .reduce((acc, curr) => acc + curr, 0)
        .toLocaleString();

      if (data?.vouchers?.length === 1) {
        totalCostInPoint = (
          data?.quantity *
          dataVouchers?.map((item) =>
            parseInt(item.costInPoints.replace(/,/g, ""))
          )
        ).toLocaleString();
      } else {
        totalCostInPoint = getPointsFromVoucher;
      }

      //Check if the user has enough points to redeem the voucher

      const newData = await Transaction.create(data);
      newData.totalCost = totalCostInPoint;
      await newData.save();
      if (parseInt(isUser?.points) === 0) {
        newData.status = "failed";
        await newData.save();
      } else {
        const reducePoints = parseInt(totalCostInPoint.replace(/,/g, ""));
        const userPoints = parseInt(isUser.points.replace(/,/g, ""));
        const calculate = (userPoints - reducePoints).toLocaleString();

        //update data user
        await User.update(
          { points: calculate },
          { where: { id: data?.userId } }
        );

        newData.status = "success";
        await newData.save();
      }

      //save voucher to pivot table
      await newData.addVouchers(dataVouchers);

      return res.status(201).json({
        message: "Data berhasil ditambahkan",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  editTransactionById: async (req, res) => {
    try {
      const body = req.body;
      const id = req.params.id;

      const data = await Transaction.findByPk(id);
      if (!data) {
        return res.status(404).json({
          message: "data not found",
        });
      }

      const dataTransactionUpdate = await data.update(body);

      return res.status(200).json({
        message: "Data berhasil diubah",
        data: dataTransactionUpdate,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  deletedTransactionById: async (req, res) => {
    try {
      const id = req.params.id;

      const data = await Transaction.findByPk(id);

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
  deletedAllTransaction: async (req, res) => {
    try {
      await Transaction.destroy({
        where: {},
      });

      return res.status(200).json({
        message: "semua berhasil dihapus",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
};
