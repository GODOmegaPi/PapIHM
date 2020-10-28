const fs = require('fs-extra');
const Project = require('../models/projectModel');
const { handleError, ErrorHandler } = require('../helpers/error');
const getProject = (req, res) => {
  Project.find(req.query).skip(req.offset).limit(req.limit)
    .sort(req.sort_by_direction + req.sort_by_field)
    .populate(req.populate)
    .exec((findErr, projects) => {
      if (findErr) throw new ErrorHandler(400, findErr.message);
      return res.json({ data: projects, error: false });
    });
};

const getById = (req, res) => {
  Project.findById(req.params.id, (findErr, project) => {
    if (findErr) return handleError(new ErrorHandler(400, findErr.message), res);
    return res.json({ data: project, error: false });
  });
};


const createProject = (req, res) => {
  req.body.imagePath = req.file.filename;
  req.body.owner = req.requester;
  const newProject = new Project(req.body);
  newProject.save((err) => {
    if (err) return handleError(new ErrorHandler(400, err), res);
    fs.renameSync(req.file.path, `${process.env.UPLOAD_PATH}/project/${newProject._id}/${newProject.imagePath}`, (err2) => {
      if (err2) throw new ErrorHandler(500, err2);
    });
    return res.json({ data: newProject, error: false, message: 'Successfully saved' });
  });
};


const updateProject = (req, res) => {
  Project.findById(req.params.id, (findErr, project) => {
    if (!project) return handleError(new ErrorHandler(404, 'Project not found'), res);
    if (findErr) return handleError(new ErrorHandler(400, findErr.message), res);
    if (project.owner.toString() !== req.requester) return handleError(new ErrorHandler(403, 'You are not authorized to access this resource'), res);
    if (req.body.owner) return handleError(new ErrorHandler(400, 'You cannot change the project reference'), res);

    if (req.file) {
      fs.unlinkSync(`${process.env.UPLOAD_PATH}/project/${project._id}/${project.imagePath}`);
      req.body.imagePath = req.file.filename;
    }
    Object.assign(project, req.body);
    project.save((saveErr) => {
      if (saveErr) return handleError(new ErrorHandler(400, saveErr), res);
      if (req.file) {
        fs.renameSync(req.file.path, `${process.env.UPLOAD_PATH}/project/${project._id}/${project.imagePath}`, (err2) => {
          if (err2) return handleError(new ErrorHandler(500, 'Error in mv'), res);
        });
      }
      return res.json({ data: project, error: false, message: 'Successfully saved' });
    });
  });
};


const deleteProject = (req, res) => {
  Project.findById(req.params.id, ((findErr, project) => {
    if (!project) return handleError(new ErrorHandler(404, 'Project not found'), res);
    if (findErr) return handleError(new ErrorHandler(400, findErr.message), res);

    if (project.owner.toString() !== req.requester) return handleError(new ErrorHandler(403, 'You are not authorized to access this resource'), res);
    project.remove((removeErr, removedDevlog) => {
      if (removeErr) return handleError(new ErrorHandler(400, removeErr.message), res);
      return res.json({ data: removedDevlog, error: false, message: 'Successfully deleted' });
    });
  }));
};

const searchProject = (req, res) => {
  Project.find({ $text: { $search: req.body.data } }).skip(req.offset).limit(req.limit)
    .sort(req.sort_by_direction + req.sort_by_field)
    .populate(req.populate)
    .exec((findErr, projects) => {
      if (findErr) throw new ErrorHandler(400, findErr.message);
      return res.json({ data: projects, error: false });
    });
};

module.exports = {
  createProject,
  getProject,
  getById,
  deleteProject,
  updateProject,
  searchProject,
};
