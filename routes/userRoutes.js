const multer = require("multer");
const {
    register,
    login,
    passwordReset,
} = require("../controllers/userController");
const {userMiddleWare} = require("../middleware/auth");

const userRouter = require("express").Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({storage});

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/reset-password", passwordReset);

module.exports = userRouter;
