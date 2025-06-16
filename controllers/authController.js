const User = require("../../models/User");
// const bcrypt = require('bcrypt'); ❌
const bcrypt = require("bcryptjs"); // ✅

class AuthController {
  // Hiển thị form đăng ký
  registerForm(req, res) {
    res.render("auth/register");
  }

  // Xử lý đăng ký
  // Xử lý đăng ký
  async register(req, res) {
    const { username, password } = req.body;
    try {
      const hashed = await bcrypt.hash(password, 10); // Thêm dòng này
      const user = new User({ username, password: hashed, role: 'customer' }); // Lưu mật khẩu đã mã hóa
      await user.save();
      res.redirect('/auth/login');
    } catch (err) {
      console.error(err);
      res.send('Lỗi đăng ký: ' + err.message);
    }
  }

  // Hiển thị form đăng ký (admin)
  adminRegisterForm(req, res) {
    res.render("auth/admin-register"); // cần tạo view này
  }
  // Xử lý đăng ký admin
  async adminRegister(req, res) {
    const { username, password } = req.body;
    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashed, role: "admin" });
      await user.save();
      res.redirect("/auth/login");
    } catch (err) {
      res.send("Lỗi đăng ký admin: " + err.message);
    }
  }

  // Hiển thị form đăng nhập
  loginForm(req, res) {
    res.render("auth/login");
  }

  // Xử lý đăng nhập
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('auth/login', { error: 'Sai tên đăng nhập hoặc mật khẩu' });
    }
    const isMatch = await bcrypt.compare(password, user.password); // So sánh mật khẩu đã mã hóa
    if (!isMatch) {
      return res.render('auth/login', { error: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    req.session.user = {
      _id: user._id,
      username: user.username,
      role: user.role
    };

    res.redirect('/');
  }

  // Đăng xuất
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  }
}

module.exports = new AuthController();
