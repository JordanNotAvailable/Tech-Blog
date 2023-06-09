const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET all users blogs and comments
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ['id', 'title', 'created_at','content'],
      order: [['created_at', 'DESC']],
      // The comment model will attach a username to comment
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'blog_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET user blog and comment by id
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'blog_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create( {
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log(req.body)
    const [updatedBlog] = await Blog.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).end();
  } catch (err) {
    res.status(502).json(err);
  }
});

// DELETE a blog by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;