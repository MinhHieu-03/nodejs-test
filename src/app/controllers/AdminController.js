const moment = require('moment');
const Course = require('../../models/Course');

class AdminController {
  async dashboard(req, res, next) {
    try {
      const courses = await Course.find({}).lean();

      // Lấy 6 tháng gần nhất
      const months = [];
      for (let i = 5; i >= 0; i--) {
        months.push(moment().subtract(i, 'months').format('YYYY-MM'));
      }

      courses.forEach(course => {
        course.monthlyViews = months.map(month => {
          const record = course.viewHistory?.find(item => moment(item.date).format('YYYY-MM') === month);
          return record ? record.count : 0;
        });
      });

      res.render('admin/dashboard', {
        courses,
        months: JSON.stringify(months),
        coursesJson: JSON.stringify(courses)
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();