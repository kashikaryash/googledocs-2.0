"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_validator_1 = require("../validators/user.validator");
var user_controller_1 = require("../controllers/user/user.controller");
var auth_1 = require("../middleware/auth");
var router = (0, express_1.Router)();
router.post("/", user_validator_1.userValidator.register, user_controller_1.userController.register);
router.put("/verify-email/:token", user_controller_1.userController.verifyEmail);
router.get("/:id", auth_1.authenticate, user_controller_1.userController.getUser);
router.post("/reset-password", user_validator_1.userValidator.resetPassword, user_controller_1.userController.resetPassword);
router.put("/password/:token", user_validator_1.userValidator.confirmResetPassword, user_controller_1.userController.confirmResetPassword);
exports.default = router;
