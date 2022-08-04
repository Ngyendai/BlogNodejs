const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseControllers {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(course =>
        res.render("courses/show", { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  // [GET] /courses/:create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] /courses/:store
  store(req, res, next) {
    const formData = req.body;
    //formData.images = `https://cdn.fullstack.edu.vn/f8-learning/courses/${req.body.videoId}`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect(`/me/stored/courses`))
      .catch(error => {});
  }

  // [GET] /courses/:edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course =>
        res.render("courses/edit", { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  // [POST] /courses//:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // [DELETE] /courses//:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [PATCH] /courses//:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [PATCH] /courses//:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [POST] /khoa-hoc/handle-form-actions
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalied!" });
    }
  }
}

module.exports = new CourseControllers();
