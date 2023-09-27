const Overlay = require("../model/Overlay");

const create = async (data, user) => {
  const url = data.url;
  const color = data.color;
  const left = data.left;
  const top = data.top;
  const content = data.content;
  try {
    const newOverlay = new Overlay({
      url: url,
      color: color,
      left: left,
      top: top,
      content: content,
      owner: user,
    });

    await newOverlay.save();
    return {
      success: true,
      status: 201,
      message: "Overlay created",
    };
  } catch (error) {
    throw {
      success: false,
      status: 505,
      message: error.message ? error.message : error,
      data: {},
    };
  }
};

const getByUrl = async (data) => {
  try {
    const overlay = await Overlay.find({ url: data });
    if (!overlay) {
      throw {
        success: false,
        message: "No overlay found",
        data: {},
        status: 401,
      };
    }
    return {
      success: true,
      status: 201,
      message: "Overlay fetched successfully",
      data: overlay,
    };
  } catch (error) {
    throw {
      success: false,
      status: 505,
      message: error.message ? error.message : error,
      data: {},
    };
  }
};

const updateOverlays = async (data, id) => {
  const color = data.color;
  const left = data.left;
  const top = data.top;
  const content = data.content;
  const overlay = await Overlay.findById(id);
  console.log("overlay", overlay);
  try {
    const newOverlay = await Overlay.findByIdAndUpdate(
      id,
      {
        content: content ? content : overlay.content,
        url: overlay.url,
        color: color ? color : overlay.color,
        left: left ? left : overlay.left,
        top: top ? top : overlay.top,
      },
      { new: true }
    );
    return {
      success: true,
      status: 200,
      message: "Overlay updated",
      data: newOverlay,
    };
  } catch (error) {
    throw {
      success: false,
      status: 502,
      message: error.message ? error.message : error,
      data: {},
    };
  }
};

const deleteOverlays = async (id) => {
  try {
    const overlay = await Overlay.findByIdAndDelete({ id });
    if (!overlay) {
      throw {
        success: false,
        message: "No overlay found",
        status: 403,
        data: {},
      };
    }
    return {
      success: true,
      status: 200,
      message: "Overlay deleted ",
    };
  } catch (error) {
    throw {
      success: false,
      status: 505,
      message: error.message ? error.message : error,
      data: {},
    };
  }
};

module.exports = {
  create,
  getByUrl,
  updateOverlays,
  deleteOverlays,
};
