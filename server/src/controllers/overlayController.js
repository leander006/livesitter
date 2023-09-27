const asyncHandler = require("express-async-handler");
const overlayService = require("../service/overlayService");

const create = asyncHandler(async (req, res) => {
  try {
    const data = await overlayService.create(req.body, req.user);
    return res
      .status(data.status)
      .json({ sucess: data.success, message: data.message });
  } catch (error) {
    return res
      .status(error.status)
      .json({ message: error.message, success: error.success });
  }
});

const get = asyncHandler(async (req, res) => {
  try {
    const data = await overlayService.getByUrl(req.query.url);
    return res
      .status(data.status)
      .json({ sucess: data.success, message: data.message, data: data.data });
  } catch (error) {
    return res
      .status(error.status)
      .json({ message: error.message, success: error.success });
  }
});

const update = asyncHandler(async (req, res) => {
  try {
    const data = await overlayService.updateOverlays(req.body, req.params.id);
    return res
      .status(data.status)
      .json({ sucess: data.success, message: data.message });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status)
      .json({ message: error.message, success: error.success });
  }
});

const deleteOverlay = asyncHandler(async (req, res) => {
  try {
    const data = await overlayService.deleteOverlays(req.params.id);
    return res
      .status(data.status)
      .json({ sucess: data.success, message: data.message });
  } catch (error) {
    return res
      .status(error.status)
      .json({ message: error.message, success: error.success });
  }
});

module.exports = {
  create,
  get,
  update,
  deleteOverlay,
};
