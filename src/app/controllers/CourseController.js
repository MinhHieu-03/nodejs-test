const Course = require("../../models/Course");
const slugify = require("slugify");

class CourseController {
  index(req, res, next) {
    Course.find({})
      .lean()
      .then((courses) =>
        res.render("home", { courses, user: req.session.user })
      )
      .catch(next);
  }

  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        if (!course) return res.status(404).send("Không tìm thấy khóa học");
        res.render("courses/show", { course });
      })
      .catch(next); // ❗ tốt hơn: dùng next để Express xử lý lỗi
  }

  create(req, res, next) {
    res.render("courses/create");
  }

  store(req, res, next) {
    const courseData = req.body;
    // Kiểm tra dữ liệu đầu vào
    if (!courseData.name || !courseData.description || !courseData.videoID ) {
      return res
        .status(400)
        .send("Thiếu thông tin khóa học (name, description, videoID)");
    }
    // Nếu chưa nhập image, tự tạo từ videoid
    if (!courseData.image && courseData.videoid) {
      courseData.image = `https://img.youtube.com/vi/${courseData.videoid}/sddefault.jpg`;
    }
    // Tạo slug từ tên
    courseData.slug = slugify(courseData.name, { lower: true });
    // Tạo và lưu khóa học
    const course = new Course(courseData);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((err) => {
        console.error("Lỗi khi lưu khóa học:", err);
        res
          .status(500)
          .send(
            "Không thể lưu khóa học. Có thể slug bị trùng hoặc thiếu dữ liệu."
          );
      });
  }

  async edit(req, res, next) {
    try {
      const course = await Course.findOne({ slug: req.params.slug }).lean();
      if (!course) return res.status(404).send('Không tìm thấy khóa học');
      res.render("courses/edit", { course }); // Truyền course vào view
    } catch (err) {
      next(err);
    }
  }
  update(req, res, next) {
    const courseData = req.body;
    // Kiểm tra dữ liệu đầu vào
    if (!courseData.name || !courseData.description || !courseData.image) {
      return res
        .status(400)
        .send("Thiếu thông tin khóa học (name, description, image)");
    }
    // Tạo slug từ tên
    courseData.slug = slugify(courseData.name, { lower: true });
    // Cập nhật khóa học
    Course.updateOne({ slug: req.params.slug }, courseData)
      .then(() => res.redirect("/"))
      .catch((err) => {
        console.error("Lỗi khi cập nhật khóa học:", err);
        res
          .status(500)
          .send(
            "Không thể cập nhật khóa học. Có thể slug bị trùng hoặc thiếu dữ liệu."
          );
      });
  }

  delete(req, res, next) {
    Course.deleteOne({ slug: req.params.slug})
      .then(() => res.redirect("/"))
      .catch((err) => {
        console.error("Lỗi khi xóa khóa học:", err);
      })
  }
  search(req, res) {
    res.render("search");
  }
}

module.exports = new CourseController();
